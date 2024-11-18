import React, { useState, useEffect, useRef, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  X,
  Loader2,
  Download,
  Share2,
  Heart,
  FileText,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import backendURL from "../config";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

// Thumbnail component for better performance
const PageThumbnail = React.memo(({ pageUrl, pageNum, onClick, isActive }) => (
  <div
    onClick={onClick}
    className={`relative cursor-pointer transition-all duration-200 ${
      isActive ? "ring-2 ring-blue-500" : "hover:ring-2 hover:ring-gray-400"
    }`}
  >
    <img
      src={pageUrl}
      alt={`Page ${pageNum}`}
      className="w-full h-full object-contain rounded-lg shadow-md"
      loading="lazy"
    />
    <span className="absolute bottom-2 right-2 bg-black/60 text-white/90 text-xs px-2 py-1 rounded-full">
      {pageNum}
    </span>
  </div>
));

const MagazineFlipbook = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [edition, setEdition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [loadedPages, setLoadedPages] = useState({});
  const [isFlipping, setIsFlipping] = useState(false);
  const [scale, setScale] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef(null);
  const bookRef = useRef(null);
  const [liked, setLiked] = useState(false);

  // Optimized page loading with chunking
  const loadPdf = async (pdfPath) => {
    try {
      const pdf = await pdfjs.getDocument(`${backendURL}${pdfPath}`).promise;
      setNumPages(pdf.numPages);

      // Load pages in chunks for better performance
      const chunkSize = 4;
      const chunks = Math.ceil(pdf.numPages / chunkSize);

      for (let chunk = 0; chunk < chunks; chunk++) {
        const startPage = chunk * chunkSize + 1;
        const endPage = Math.min((chunk + 1) * chunkSize, pdf.numPages);

        // Load chunk of pages concurrently
        const pagePromises = [];
        for (let i = startPage; i <= endPage; i++) {
          pagePromises.push(renderPage(pdf, i));
        }

        const renderedPages = await Promise.all(pagePromises);
        const newPages = {};
        renderedPages.forEach((pageData, index) => {
          const pageNum = startPage + index;
          newPages[pageNum] = pageData;
        });

        setLoadedPages((prev) => ({ ...prev, ...newPages }));
        setLoadingProgress((endPage / pdf.numPages) * 100);
      }
    } catch (err) {
      setError("Failed to load PDF");
    }
  };

  const loadRemainingPages = async (pdf, startFrom) => {
    const cache = { ...loadedPages };

    for (let i = startFrom + 1; i <= pdf.numPages; i++) {
      cache[i] = await renderPage(pdf, i);
      setLoadedPages({ ...cache });
      setLoadingProgress((i / pdf.numPages) * 100);
    }
  };

  const renderPage = async (pdf, pageNum) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    // Create an offscreen canvas for better performance
    const canvas = new OffscreenCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");

    await page.render({ canvasContext: ctx, viewport }).promise;

    // Convert to blob for better memory management
    const blob = await canvas.convertToBlob();
    return URL.createObjectURL(blob);
  };

  // Grid view component
  const ThumbnailGrid = useMemo(() => {
    if (!showThumbnails) return null;

    return (
      <div className="fixed inset-0 bg-black/90 z-50 overflow-auto">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl">All Pages</h2>
            <button
              onClick={() => setShowThumbnails(false)}
              className="p-2 text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Object.entries(loadedPages).map(([pageNum, pageUrl]) => (
              <PageThumbnail
                key={pageNum}
                pageNum={pageNum}
                pageUrl={pageUrl}
                isActive={
                  Math.floor((parseInt(pageNum) - 1) / 2) === currentSpread
                }
                onClick={() => {
                  setCurrentSpread(Math.floor((parseInt(pageNum) - 1) / 2));
                  setShowThumbnails(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }, [showThumbnails, loadedPages, currentSpread]);

  // Enhanced page flipping animation
  const getPageStyle = (pageNum) => {
    const isRightPage = pageNum % 2 === 0;
    const isCurrentSpread = Math.floor((pageNum - 1) / 2) === currentSpread;
    const isNextSpread = Math.floor((pageNum - 1) / 2) === currentSpread + 1;
    const isPrevSpread = Math.floor((pageNum - 1) / 2) === currentSpread - 1;

    let transform = "";
    let zIndex = getPageZIndex(pageNum);

    if (isFlipping) {
      const flipProgress = isRightPage ? 1 : -1;
      if (isCurrentSpread || isNextSpread) {
        transform = `
          rotateY(${getFlipRotation(pageNum)}deg)
          translateZ(${isCurrentSpread ? 20 : 0}px)
        `;
        zIndex = 1000;
      }
    }

    return {
      position: "absolute",
      width: "50%",
      height: "100%",
      top: 0,
      left: isRightPage ? "50%" : 0,
      transformOrigin: isRightPage ? "left center" : "right center",
      transition: isFlipping
        ? "transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000)"
        : "none",
      transform,
      zIndex,
      backfaceVisibility: "hidden",
      backgroundColor: "white",
      boxShadow: isFlipping
        ? "0 0 20px rgba(0,0,0,0.2)"
        : "0 0 10px rgba(0,0,0,0.1)",
    };
  };

  const getFlipRotation = (pageNum) => {
    const isRightPage = pageNum % 2 === 0;
    const isCurrentSpread = Math.floor((pageNum - 1) / 2) === currentSpread;
    const progress = isFlipping ? (isRightPage ? 180 : -180) : 0;

    if (isCurrentSpread) {
      return isRightPage ? progress : 0;
    }
    return isRightPage ? 0 : progress;
  };

  const getPageZIndex = (pageNum) => {
    const spreadIndex = Math.floor((pageNum - 1) / 2);
    const baseZIndex = 100 - Math.abs(spreadIndex - currentSpread);
    return isFlipping && Math.abs(spreadIndex - currentSpread) <= 1
      ? 1000 + baseZIndex
      : baseZIndex;
  };

  // Enhanced flip animation
  const flip = async (direction) => {
    if (isFlipping) return;

    const nextSpread =
      direction === "next"
        ? Math.min(currentSpread + 1, Math.floor((numPages - 1) / 2))
        : Math.max(currentSpread - 1, 0);

    if (nextSpread === currentSpread) return;

    // Add page curl shadow during flip
    const addPageCurlShadow = (pageElement) => {
      const shadow = document.createElement("div");
      shadow.style.cssText = `
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: linear-gradient(
          to right,
          rgba(0,0,0,0.2) 0%,
          rgba(0,0,0,0) 100%
        );
        opacity: 0;
        transition: opacity 0.8s;
      `;
      pageElement.appendChild(shadow);
      requestAnimationFrame(() => (shadow.style.opacity = "1"));
    };

    setIsFlipping(true);

    // Add temporary shadows for realistic effect
    const currentPages = document.querySelectorAll(".book-page");
    currentPages.forEach(addPageCurlShadow);

    setTimeout(() => {
      setCurrentSpread(nextSpread);
      setIsFlipping(false);

      // Remove temporary shadows
      currentPages.forEach((page) => {
        const shadow = page.querySelector("div");
        if (shadow) shadow.remove();
      });
    }, 800);
  };

  // ... [Previous flip and page style functions remain the same]

  useEffect(() => {
    const fetchEdition = async () => {
      try {
        const response = await fetch(
          `${backendURL}/api/getDigitalEditionBySlug/${slug}`
        );
        if (!response.ok) throw new Error("Failed to fetch digital edition");
        const data = await response.json();
        if (!data.image2?.length) throw new Error("No PDF files found");
        setEdition(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (slug) fetchEdition();

    // Cleanup function to prevent memory leaks
    return () => {
      Object.values(loadedPages).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [slug]);

  // Reset state when PDF changes
  useEffect(() => {
    setCurrentSpread(0);
    setLoadedPages({});
    setNumPages(null);
    setLoadingProgress(0);
    if (edition?.image2?.[currentPdfIndex]) {
      loadPdf(edition.image2[currentPdfIndex]);
    }
  }, [currentPdfIndex, edition]);

  // Share handler
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: edition?.title,
          text: `Check out ${edition?.title}`,
          url: window.location.href,
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  // Download handler
  const handleDownload = async () => {
    if (edition?.pdfUrl) {
      try {
        const response = await fetch(edition.pdfUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${edition.title}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (err) {
        console.error("Error downloading PDF:", err);
      }
    }
  };

  // Like handler
  const handleLike = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/editions/${slug}/like`, {
        method: "POST",
        credentials: "include",
      });
      setLiked(!liked);
    } catch (err) {
      console.error("Error liking edition:", err);
    }
  };

  return (
    <div className="sm:container mx-auto px-4 py-3">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-[75%]">
          <div className="relative w-full h-screen overflow-hidden">
            {/* Main content area */}
            <div className="absolute inset-x-0 top-16 bottom-16">
              <div
                ref={containerRef}
                className="relative h-full flex items-center justify-center p-2"
                style={{ transform: `scale(${scale})` }}
              >
                <div
                  ref={bookRef}
                  className="relative w-full max-w-5xl h-[calc(100vh-8rem)] perspective-2000"
                >
                  {/* Book container with enhanced 3D effect */}
                  <div className="relative w-full h-full bg-white rounded-lg shadow-2xl preserve-3d">
                    {/* Pages with enhanced animations */}
                    {Object.entries(loadedPages).map(([pageNum, pageUrl]) => (
                      <div
                        key={pageNum}
                        style={getPageStyle(parseInt(pageNum))}
                        className="book-page absolute rounded-lg overflow-hidden shadow-lg"
                      >
                        <img
                          src={pageUrl}
                          alt={`Page ${pageNum}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation buttons */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                    <button
                      onClick={() => flip("prev")}
                      disabled={currentSpread === 0 || isFlipping}
                      className="p-3 rounded-full bg-black/40 text-white/90 hover:bg-black/60 disabled:opacity-30
                        transition-all hover:scale-110 disabled:hover:scale-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => flip("next")}
                      disabled={
                        currentSpread >= Math.floor((numPages - 1) / 2) ||
                        isFlipping
                      }
                      className="p-3 rounded-full bg-black/40 text-white/90 hover:bg-black/60 disabled:opacity-30
                        transition-all hover:scale-110 disabled:hover:scale-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {ThumbnailGrid}

            {/* Bottom controls */}
            <div className="absolute bottom-[-0.5rem] left-0 right-0 h-16 bg-gray-800  rounded-b-3xl backdrop-blur-sm z-10 ">
              <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                  <span className="text-white/90 text-xs">
                    PDF {currentPdfIndex + 1}/{edition?.image2?.length} | Page{" "}
                    {currentSpread * 2 + 1}-
                    {Math.min(currentSpread * 2 + 2, numPages)}/{numPages}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
                      className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-white/90 text-xs min-w-[3ch] text-center">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={() => setScale((s) => Math.min(s + 0.1, 2))}
                      className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 text-white hover:bg-gray-700 rounded"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-2 text-white hover:bg-gray-700 rounded"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleLike}
                    className={`p-2 hover:bg-gray-700 rounded ${
                      liked ? "text-red-500" : "text-white"
                    }`}
                    title="Like"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={liked ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={() => setShowThumbnails(!showThumbnails)}
                    className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => containerRef.current?.requestFullscreen()}
                    className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            {/* Loading overlay with progress */}
            {loadingProgress < 100 && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                  <div className="w-64 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                  <p className="text-white/90">
                    Loading pages... {Math.round(loadingProgress)}%
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced styles for 3D effects and animations */}
            <style jsx>{`
              .perspective-2000 {
                perspective: 2500px;
              }
              .preserve-3d {
                transform-style: preserve-3d;
                transition: transform 0.3s ease;
              }
              .book-page {
                transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1),
                  box-shadow 0.8s ease;
              }
              .book-page:hover {
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
              }
            `}</style>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MagazineFlipbook;
