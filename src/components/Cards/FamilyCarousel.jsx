import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import backendURL from "../../config";
// Memoized card component for better performance
const FamilyCard = memo(({ item }) => (
  <Link
    to={`/singlePost/${item.slug}`}
    className="flex-shrink-0 scroll-snap-align-start"
    style={{ scrollSnapAlign: "start" }}
  >
    <div className="flex flex-cols sm:flex-row min-w-[200px] sm:min-w-[280px] max-w-[400px] bg-white rounded-lg shadow transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex-1 p-3 sm:p-4">
        <h3 className="sm:text-sm font-semibold text-gray-800 mb-2 line-clamp-3 hover:text-red-500">
          {item.title}
        </h3>
      </div>
      <div className="relative w-1/2 h-32 overflow-hidden">
        <img
          src={`${backendURL}${item.image1}`}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          draggable="false"
          loading="lazy"
        />
      </div>
    </div>
  </Link>
));

FamilyCard.displayName = "FamilyCard";

const FamilyCarousel = () => {
  const [family, setFamily] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  const backendURL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:3001";

  // Memoized fetch function
  const fetchFamily = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=Family`
      );
      if (!response.ok) throw new Error("Failed to fetch family details");
      const data = await response.json();
      setFamily(data.posts);
      setError(null);
    } catch (error) {
      console.error("Error fetching family details:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendURL]);

  useEffect(() => {
    fetchFamily();
  }, [fetchFamily]);

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
            : Math.min(prev + 1, Math.max(0, family.length - 3));
        return newIndex;
      });
    },
    [family.length]
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

  if (!family?.length) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-lg">No family details found</p>
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
        <div className="flex gap-4 mid:gap-8">
          {family.map((item) => (
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
        disabled={currentIndex >= family.length - 3}
        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all ${
          currentIndex >= family.length - 3 ? "invisible" : "visible"
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FamilyCarousel;
