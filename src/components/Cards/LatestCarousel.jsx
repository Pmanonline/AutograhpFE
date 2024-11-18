import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import backendURL from "../../config";
import moment from "moment";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { FiClock } from "react-icons/fi";

// Memoized card component for better performance
const FamilyCard = memo(({ item }) => (
  <Link
    to={`/content/${item.slug}`}
    className="flex-shrink-0 scroll-snap-align-start"
    style={{ scrollSnapAlign: "start" }}
  >
    <Card
      key={item._id}
      elevation={0}
      className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-none"
    >
      <CardMedia
        component="img"
        height="200"
        src={`${backendURL}${item.image1}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/fallback-image.png";
        }}
        className="h-48 object-cover transform transition-all duration-300 hover:shadow-sm hover:-translate-y-1"
      />
      <div className="flex-1 flex flex-col mt-3">
        <h3 className="sm:text-sm font-semibold text-gray-800 mb-2 line-clamp-3 hover:text-red-500">
          {item.title}
        </h3>

        <Typography
          variant="caption"
          color="text.secondary"
          className="mt-auto flex items-center" // Tailwind for flex and vertical alignment
        >
          <FiClock className="w-3 h-3 mr-1 mb-1 font-semibold text-gray-700" />{" "}
          {/* Smaller icon with margin */}
          {moment(item.date).format("MMMM D, YYYY")}
        </Typography>
      </div>
    </Card>
  </Link>
));

FamilyCard.displayName = "LatestCard";

const LatestCarousel = () => {
  const [latest, setLatest] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  const fetchLatest = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=Latest`
      );
      if (!response.ok) throw new Error("Failed to fetch family details");
      const data = await response.json();
      setLatest(data.posts);
      setError(null);
    } catch (error) {
      console.error("Error fetching family details:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendURL]);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  // Memoized drag handlers
  const handleDragStart = useCallback((clientX) => {
    if (!containerRef.current) return;
    dragRef.current.isDragging = true;
    dragRef.current.startX = clientX - containerRef.current.offsetLeft;
    dragRef.current.scrollLeft = containerRef.current.scrollLeft;
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!containerRef.current || !dragRef.current.isDragging) return;
    const x = clientX - containerRef.current.offsetLeft;
    const distance = x - dragRef.current.startX;
    containerRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!containerRef.current) return;
    dragRef.current.isDragging = false;
    containerRef.current.style.cursor = "grab";
    containerRef.current.style.userSelect = "auto";
  }, []);

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (e) => {
      handleDragStart(e.pageX);
    },
    [handleDragStart]
  );

  const handleMouseMove = useCallback(
    (e) => {
      handleDragMove(e.pageX);
    },
    [handleDragMove]
  );

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e) => {
      handleDragStart(e.touches[0].pageX);
    },
    [handleDragStart]
  );

  const handleTouchMove = useCallback(
    (e) => {
      handleDragMove(e.touches[0].pageX);
    },
    [handleDragMove]
  );

  // Navigation handlers
  const slide = useCallback(
    (direction) => {
      if (!containerRef.current) return;
      const itemWidth = containerRef.current.offsetWidth / 3;
      const scrollAmount = direction === "left" ? -itemWidth : itemWidth;

      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setCurrentIndex((prev) => {
        const newIndex =
          direction === "left"
            ? Math.max(prev - 1, 0)
            : Math.min(prev + 1, Math.max(0, latest.length - 3));
        return newIndex;
      });
    },
    [latest.length]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseLeave = () => handleDragEnd();
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleDragEnd]);

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

  if (!latest?.length) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-lg">No latest details found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full py-8">
      <div
        ref={containerRef}
        className="relative overflow-x-auto px-4 cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 mid:px-8">
          {latest.map((item) => (
            <FamilyCard key={item._id} item={item} backendURL={backendURL} />
          ))}
        </div>
      </div>

      <button
        onClick={() => slide("left")}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all ${
          currentIndex === 0 ? "invisible" : "visible"
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => slide("right")}
        disabled={currentIndex >= latest.length - 3}
        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all ${
          currentIndex >= latest.length - 3 ? "invisible" : "visible"
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default LatestCarousel;
