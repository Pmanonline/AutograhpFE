import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment";
import backendURL from "../../config";

const PodcastCarousel = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  // Memoize fetch function to prevent unnecessary recreations
  const fetchPodcasts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllVideos?category=PodCasts`
      );
      if (!response.ok) throw new Error("Failed to fetch podcasts");
      const data = await response.json();
      setPodcasts(data.videos);
      setError(null);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  // Memoize drag handling functions
  const handleMouseDown = useCallback((e) => {
    if (!containerRef.current) return;
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.pageX - containerRef.current.offsetLeft;
    dragRef.current.scrollLeft = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!dragRef.current.isDragging || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const distance = x - dragRef.current.startX;
    containerRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!containerRef.current) return;
    dragRef.current.isDragging = false;
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.userSelect = "auto";
  }, []);

  // Memoize touch handling functions
  const handleTouchStart = useCallback((e) => {
    if (!containerRef.current) return;
    dragRef.current.isDragging = true;
    dragRef.current.startX =
      e.touches[0].pageX - containerRef.current.offsetLeft;
    dragRef.current.scrollLeft = containerRef.current.scrollLeft;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!dragRef.current.isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const distance = x - dragRef.current.startX;
    containerRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
  }, []);

  const handleTouchEnd = useCallback(() => {
    dragRef.current.isDragging = false;
  }, []);

  // Memoize mouse leave handler
  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    dragRef.current.isDragging = false;
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.userSelect = "auto";
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  // Memoize slide functions
  const slideLeft = useCallback(() => {
    if (!containerRef.current) return;
    const itemWidth = containerRef.current.offsetWidth / 3;
    containerRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const slideRight = useCallback(() => {
    if (!containerRef.current) return;
    const itemWidth = containerRef.current.offsetWidth / 3;
    containerRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(0, podcasts.length - 3))
    );
  }, [podcasts.length]);

  // Memoize the podcast cards rendering
  const PodcastCards = useMemo(() => {
    return podcasts.map((podcast) => (
      <Link
        to={`/video/${podcast.slug}`}
        key={podcast._id}
        className="flex-shrink-0 scroll-snap-align-start"
        style={{ scrollSnapAlign: "start" }}>
        <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-w-[300px] max-w-[400px] mod:max-w-[300px]">
          <div className="relative w-full sm:w-1/2 h-48 sm:h-auto sm:max-h-[8rem] overflow-hidden">
            <img
              src={`${backendURL}${podcast.image}`}
              alt={podcast.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              draggable="false"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-500 text-sm">
                {moment(podcast.createdAt).format("MMM D, YYYY")}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-3 hover:text-red-500">
              {podcast.title}
            </h3>
            <p className="text-gray-600 line-clamp-3">{podcast.description}</p>
          </div>
        </div>
      </Link>
    ));
  }, [podcasts]);

  // Memoize container styles
  const containerStyles = useMemo(
    () => ({
      scrollSnapType: "x mandatory",
      scrollBehavior: "smooth",
      WebkitOverflowScrolling: "touch",
    }),
    []
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
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

  if (!podcasts?.length) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-lg">No podcasts found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative overflow-x-auto px-4 cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={containerStyles}>
        <div className="flex gap-4 mid:gap-8">{PodcastCards}</div>
      </div>

      <button
        onClick={slideLeft}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all ${
          currentIndex === 0 ? "invisible" : "visible"
        }`}>
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={slideRight}
        disabled={currentIndex >= podcasts.length - 3}
        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all ${
          currentIndex >= podcasts.length - 3 ? "invisible" : "visible"
        }`}>
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default PodcastCarousel;
