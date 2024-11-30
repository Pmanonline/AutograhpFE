import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ChevronRight, Calendar, Eye } from "lucide-react";
import backendURL from "../../config";
import moment from "moment";

export const SocietyCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [society, setSociety] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSociety = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=Society`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      if (!response.ok) throw new Error("Failed to fetch society data");
      const data = await response.json();
      setSociety(data.posts);
      setError(null);
    } catch (error) {
      console.error("Error fetching society data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendURL]);

  useEffect(() => {
    fetchSociety();
  }, [fetchSociety]);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % society.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + society.length) % society.length
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="relative h-full overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-center object-cover transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundImage: `url(${
            society[currentIndex]?.image1
              ? `${backendURL}${society[currentIndex]?.image1}`
              : "path/to/placeholder/image.jpg"
          })`,
        }}
      ></div>

      {/* Header Section */}
      <div className="relative z-10 p-2 bg-gray-50 flex justify-between items-center border-b border-gray-300">
        <Typography
          component="div"
          sx={{
            color: "black",
            fontWeight: "600", // or 'fontWeight: 500' for semibold
          }}
        >
          <Link to={"/society"}>
            <span class="relative group text-transparent bg-clip-text bg-gradient-to-r from-black via-red-500 to-black hover:from-white hover:via-black hover:to-red-500 transition-all duration-300 ease-in-out">
              SOCIETY
            </span>
          </Link>
        </Typography>

        <div className="flex space-x-2 items-center">
          <IconButton onClick={handlePrevClick}>
            <ArrowLeft />
          </IconButton>
          <IconButton onClick={handleNextClick}>
            <ArrowRight />
          </IconButton>
        </div>
      </div>
      <Link
        className="cursor-pointer"
        to={`/content/${society[currentIndex]?.slug}`}
      >
        {/* Content Section */}
        <div className="relative z-10 p-4 text-white align-bottom pt-[15rem]">
          <Typography
            sx={{
              color: "white",
              fontWeight: "600", // or 'fontWeight: 500' for semibold
            }}
            variant="h5"
            component="h3"
            className="font-bold"
          >
            {society[currentIndex]?.title}
          </Typography>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {moment(society[currentIndex]?.createdAt).format("MMMM D, YYYY")}
            </span>
          </div>

          <div className="flex text-sm mt-2  items-center">
            <span>{society[currentIndex]?.date}</span>
            <span className="flex items-center">
              <CommentIcon fontSize="small" className="text-xs" />{" "}
              <span className="ml-1">0</span>
            </span>
            <span className="flex items-center mx-2">
              <VisibilityIcon fontSize="small" className="mr-1" />
              {society[currentIndex]?.views || "0"}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

const EventCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=Events`
      );
      if (!response.ok) throw new Error("Failed to fetch events data");
      const data = await response.json();
      setEvents(data.posts);
      setError(null);
    } catch (error) {
      console.error("Error fetching events data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendURL]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="relative h-full overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-center object-cover transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundImage: `url(${
            events[currentIndex]?.image1
              ? `${backendURL}${events[currentIndex]?.image1}`
              : "path/to/placeholder/image.jpg"
          })`,
        }}
      ></div>

      {/* Header Section */}
      <div className="relative z-10 p-2 bg-gray-50 flex justify-between items-center border-b border-gray-300">
        <Typography
          component="div"
          sx={{
            color: "black",
            fontWeight: "600", // or 'fontWeight: 500' for semibold
          }}
        >
          <Link to={"/events"}>
            <span class="relative group text-transparent bg-clip-text bg-gradient-to-r from-black via-red-500 to-black hover:from-white hover:via-black hover:to-red-500 transition-all duration-300 ease-in-out">
              EVENTS
            </span>
          </Link>
        </Typography>

        <div className="flex space-x-2 items-center">
          <IconButton onClick={handlePrevClick}>
            <ArrowLeft />
          </IconButton>
          <IconButton onClick={handleNextClick}>
            <ArrowRight />
          </IconButton>
        </div>
      </div>

      {/* Content Section */}
      <Link
        className="cursor-pointer"
        to={`/content/${events[currentIndex]?.slug}`}
      >
        <div className="relative z-10 p-4 text-white align-bottom pt-[15rem]">
          <Typography
            sx={{
              color: "white",
              fontWeight: "600", // or 'fontWeight: 500' for semibold
            }}
            variant="h5"
            component="h3"
            className="font-bold"
          >
            {events[currentIndex]?.title}
          </Typography>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {moment(events[currentIndex]?.createdAt).format("MMMM D, YYYY")}
            </span>
          </div>

          <div className="flex text-sm mt-2  items-center">
            <span>{events[currentIndex]?.date}</span>
            <span className="flex items-center">
              <CommentIcon fontSize="small" className="text-xs" />{" "}
              <span className="ml-1">0</span>
            </span>
            <span className="flex items-center mx-2">
              <VisibilityIcon fontSize="small" className="mr-1" />
              {events[currentIndex]?.views || "0"}
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

const EventeventsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SocietyCard />
      <EventCard />
    </div>
  );
};

export default EventeventsCards;
