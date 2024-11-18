import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Alert as MuiAlert,
} from "@mui/material";
import { Twitter, Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
import SocialMediaFollow from "../components/socialMediaFollow2";
import backendURL from "../config";

const handleShare = (platform) => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(fetchedData.title);
  let shareUrl;

  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
      break;
    case "whatsapp":
      shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, "_blank");
};

const VideoPlayer = React.memo(({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full"
        controls
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

const SingleVideoPage = () => {
  const { slug } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);

  const fetchVideoData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendURL}/api/getVideosBySlug/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch video data");
      const data = await res.json();
      setVideoData(data);
      setSelectedCat(data?.category);
    } catch (error) {
      console.error("Error fetching video data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchVideoData();
    console.log(videoData?.videoClip);
  }, [fetchVideoData]);

  const handleShare = useCallback(() => {
    // Implement share functionality
    console.log("Sharing video:", videoData?.title);
  }, [videoData?.title]);

  const VideoContent = useMemo(() => {
    if (!videoData) return null;

    return (
      <div className="w-full md:w-3/4 p-6">
        <VideoPlayer src={`${backendURL}${videoData?.videoClip}`} />
        <Card variant="outlined" className="mt-6 p-1">
          <div className="flex gap-4 mx-3">
            <span className="font-semibold bg-gray-300 p-1 rounded-md px-3">
              {videoData.category}
            </span>
            <span className="text-base mt-1">{videoData.title}</span>
          </div>
          <CardContent>
            {/* <p>{videoData.description}</p> */}
            <p>helloo</p>
          </CardContent>
          <CardActions>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 2 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Share this:
              </Typography>
              <IconButton
                onClick={() => handleShare("twitter")}
                size="small"
                sx={{ mr: 1 }}
              >
                <Twitter fontSize="small" sx={{ color: "#1DA1F2" }} />
              </IconButton>
              <IconButton
                onClick={() => handleShare("facebook")}
                size="small"
                sx={{ mr: 1 }}
              >
                <Facebook fontSize="small" sx={{ color: "#4267B2" }} />
              </IconButton>
              <IconButton
                onClick={() => handleShare("linkedin")}
                size="small"
                sx={{ mr: 1 }}
              >
                <LinkedIn fontSize="small" sx={{ color: "#0077b5" }} />
              </IconButton>
              <IconButton onClick={() => handleShare("whatsapp")} size="small">
                <WhatsApp fontSize="small" sx={{ color: "#25D366" }} />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 3 }} />
          </CardActions>
        </Card>
        {/* RelatedCardCarousel */}
        <h2 className="mt-20 uppercase text-3xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-red-900 bg-clip-text text-transparent headFont">
          other {selectedCat}
        </h2>
        <RelatedCardCarousel
          selectedCat={selectedCat}
          backendURL={backendURL}
          currentSlug={slug}
        />
      </div>
    );
  }, [videoData, handleShare]);

  const RelatedContent = useMemo(
    () => (
      <div className="w-full md:w-1/4 bg-gray-100 p-6">
        <div className="mx-auto">
          <SocialMediaFollow />
        </div>
        <img
          src="https://c7.alamy.com/comp/2FM595J/2020s-uk-olay-magazine-advert-2FM595J.jpg"
          alt=""
          className="hidden lg:flex mt-10"
        />
      </div>
    ),
    []
  );
  const LoadingSpinner = useMemo(
    () => (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <CircularProgress size={40} className="text-btColour" />
      </div>
    ),
    []
  );

  if (isLoading) {
    return LoadingSpinner;
  }

  if (error) return <div>Error: {error}</div>;
  if (!videoData) return <div>No video data found</div>;

  return (
    <div className="flex flex-col md:flex-row">
      {VideoContent}
      {RelatedContent}
    </div>
  );
};

export default SingleVideoPage;

const RelatedCardCarousel = ({ selectedCat, backendURL, currentSlug }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(selectedCat);

  // Drag handling states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${backendURL}/api/getAllVideos?category=${selectedCat}&excludeSlug=${currentSlug}`
        );
        if (!response.ok) throw new Error("Failed to fetch podcasts");
        const data = await response.json();
        console.log(data);

        // Filter out the current video if it's still in the response
        const filteredVideos = data.videos.filter(
          (video) => video.slug !== currentSlug
        );

        setPodcasts(filteredVideos);
        setError(null);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedCat && currentSlug) {
      fetchPodcasts();
    }
  }, [selectedCat, currentSlug, backendURL]);

  const handleMouseDown = (e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.pageX - containerRef.current.offsetLeft;
    dragRef.current.scrollLeft = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.isDragging) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const distance = x - dragRef.current.startX;
    containerRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.userSelect = "auto";
  };

  // Touch events handlers
  const handleTouchStart = (e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX =
      e.touches[0].pageX - containerRef.current.offsetLeft;
    dragRef.current.scrollLeft = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!dragRef.current.isDragging) return;

    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const distance = x - dragRef.current.startX;
    containerRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
  };

  const handleTouchEnd = () => {
    dragRef.current.isDragging = false;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseLeave = () => {
      dragRef.current.isDragging = false;
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
    };

    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const slideLeft = () => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.offsetWidth / 3;
      containerRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const slideRight = () => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.offsetWidth / 3;
      containerRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
      setCurrentIndex((prev) =>
        Math.min(prev + 1, Math.max(0, podcasts.length - 3))
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // if (!podcasts?.length) {
  //   return (
  //     <div className="flex justify-center items-center h-48">
  //       <p className="text-lg">No podcasts found</p>
  //     </div>
  //   );
  // }

  return (
    <div className="relative w-full py-8">
      <div
        ref={containerRef}
        className="relative overflow-x-auto px-4 cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex gap-4 mid:gap-8">
          {podcasts.map((podcast) => (
            <Link
              to={`/video/${podcast.slug}`}
              key={podcast._id}
              className="flex-shrink-0 scroll-snap-align-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex flex-cols sm:flex-row min-w-[200px] sm:min-w-[280px] max-w-[400px] bg-white rounded-lg shadow transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Content Section */}
                <div className="flex-1 p-3 sm:p-4">
                  <h3 className="sm:text-sm font-semibold text-gray-800 mb-2 line-clamp-3 hover:text-red-500">
                    {podcast.title}
                  </h3>
                </div>

                {/* Image Section */}
                <div className="relative w-1/2 h-32 overflow-hidden">
                  <img
                    src={`${backendURL}${podcast.image}`}
                    alt={podcast.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    draggable="false"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={slideLeft}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all ${
          currentIndex === 0 ? "invisible" : "visible"
        }`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={slideRight}
        disabled={currentIndex >= podcasts.length - 3}
        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all ${
          currentIndex >= podcasts.length - 3 ? "invisible" : "visible"
        }`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};
