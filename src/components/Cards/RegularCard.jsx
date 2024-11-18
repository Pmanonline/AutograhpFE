import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import backendURL from "../../config";
const RegularCard = ({ item }) => {
  return (
    <Link
      to={`/content/${item.slug}`}
      className="block transition duration-300 ease-in-out transform hover:scale-10 border-none mid:mb-5"
    >
      <Card className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img
            src={`${backendURL}${item.image1}`}
            alt={item.title}
            className="w-full h-64 object-cover transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-base mb-2 hover:text-red-600">
            {item.title.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 70) +
              (item.title.length > 70 ? "..." : "")}
          </h3>
          <Typography
            variant="body1"
            className="text-gray-700 mb-6"
            sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
          >
            {item.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 50) +
              (item.content.length > 50 ? "..." : "")}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RegularCard;
