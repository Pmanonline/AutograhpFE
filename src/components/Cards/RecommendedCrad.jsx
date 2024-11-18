import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import backendURL from "../../config";

const RecommendCard = ({ item }) => {
  return (
    <Link
      to={`/content/${item.slug}`}
      key={item._id}
      className="flex-shrink-0 scroll-snap-align-start"
      style={{ scrollSnapAlign: "start" }}
    >
      <Card className="flex flex-cols sm:flex-row min-w-[200px] sm:min-w-[280px] max-w-[400px] bg-white rounded-lg shadow transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Content Section */}
        <Box className="flex-1 p-3 sm:p-4">
          <h3 className="sm:text-sm font-semibold text-gray-800 mb-2 line-clamp-3 hover:text-red-500">
            {item.title}
          </h3>
        </Box>

        {/* Image Section */}
        <Box className="relative w-1/2 h-32 overflow-hidden">
          <img
            src={`${backendURL}${item.image1}`}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            draggable="false"
          />
        </Box>
      </Card>
    </Link>
  );
};

export default RecommendCard;
