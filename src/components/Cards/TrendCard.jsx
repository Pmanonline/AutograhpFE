import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import backendURL from "../../config";

const TrendCard = ({ trend }) => {
  return (
    <Card
      className="transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        overflow: "hidden",
        maxWidth: "900px",
        margin: "0 auto",
        border: "1px solid #e0e0e0",
      }}
    >
      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "1 1 50%" },
          position: "relative",
          "&:hover img": {
            transform: "scale(1.05)",
          },
          overflow: "hidden",
        }}
      >
        <img
          src={`${backendURL}${trend?.image1}`}
          alt={trend?.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            height: "350px",
            display: "block",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "1 1 50%" },
          backgroundColor: "#F8F7F5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent className="flex flex-col h-full justify-between p-6">
          <div>
            <Typography variant="overline" className="text-gray- mb-2 block">
              {trend?.category}
            </Typography>
            <Typography
              variant="h4"
              className="font-bold text-gray-700 mb-4 headFont"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                lineHeight: 1.3,
                fontWeight: "bold",
                mb: 1,
              }}
            >
              {trend?.title}
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-700 mb-6"
              sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
            >
              {trend?.content.length > 200
                ? trend.content.replace(/<[^>]*>/g, "").substring(0, 200) +
                  "..."
                : trend?.content.replace(/<[^>]*>/g, "")}
            </Typography>
          </div>
          <Link to={`/content/${trend?.slug}`} className="inline-block">
            <button
              className="mid:mt-2 bg-HeroClr text-white px-4 py-2 rounded-lg 
              transform transition-all duration-300 
              hover:bg-transparent hover:text-HeroClr hover:border-HeroClr hover:border 
              active:scale-95 focus:outline-none focus:ring-2 focus:ring-HeroClr focus:ring-opacity-50"
            >
              Read More
            </button>
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};

export default TrendCard;
