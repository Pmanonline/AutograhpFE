import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import moment from "moment";
import backendURL from "../../config";

const PopCultureCarousel = () => {
  const [popCultureItems, setPopCultureItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Drag handling states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const fetchPopCultureItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${backendURL}/api/getAllFashion?postType=PopCulture`
        );

        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setPopCultureItems(data.posts);
        setError(null);
      } catch (error) {
        console.error("Error fetching pop culture items:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopCultureItems();
  }, []);

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
        Math.min(prev + 1, Math.max(0, popCultureItems.length - 3))
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

  if (!popCultureItems.length) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-lg">No pop culture items found</p>
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
          {popCultureItems.map((item) => (
            <Link
              to={`/content/${item.slug}`}
              key={item._id}
              className="flex-shrink-0 scroll-snap-align-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-w-[300px] max-w-[400px] mod:max-w-[300px]">
                {/* Image Section */}
                <div className="relative w-full sm:w-1/2 h-48 sm:h-auto sm:max-h-[8rem]  overflow-hidden">
                  <img
                    src={`${backendURL}${item.image1}`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    draggable="false"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-500 text-sm">
                      {moment(item.createdAt).format("MMM D, YYYY")}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-3 hover:text-red-500">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
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
        disabled={currentIndex >= popCultureItems.length - 3}
        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all ${
          currentIndex >= popCultureItems.length - 3 ? "invisible" : "visible"
        }`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default PopCultureCarousel;
