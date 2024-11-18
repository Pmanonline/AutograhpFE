import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";

import { Link } from "react-router-dom";
import moment from "moment";
import { Calendar, Eye } from "lucide-react";
import backendURL from "../../config";

const NewsCard = ({ trend }) => {
  const getDisplayType = () => {
    // Handle case where subCategory is a string
    if (trend?.subCategory && typeof trend.subCategory === "string") {
      return trend.subCategory;
    }

    // Handle case where subCategory is an array
    if (
      trend?.subCategory &&
      Array.isArray(trend.subCategory) &&
      trend.subCategory.length > 0
    ) {
      return trend.subCategory.join(", ");
    }

    // Fallback to postType or default
    return trend?.postType || "Uncategorized";
  };

  const truncateContent = (content, maxLength = 120) => {
    if (!content) return "";
    const strippedContent = content.replace(/<[^>]*>/g, "");
    return strippedContent.length > maxLength
      ? `${strippedContent.substring(0, maxLength)}...`
      : strippedContent;
  };

  // Debug logging to help identify issues (remove in production)
  console.log("Subcategory data:", {
    raw: trend?.subCategory,
    isArray: Array.isArray(trend?.subCategory),
    length: trend?.subCategory?.length,
    type: typeof trend?.subCategory,
  });

  return (
    <Card
      className="transform transition-all duration-300 hover:shadow-xl border-none hover:-translate-y-1"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        overflow: "hidden",
        maxWidth: "900px",
        // maxHeight: "280px",
        maxHeight: { xs: "500px", md: "280px" },
        margin: "0 auto",
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
          className="w-full h-[350px]   object-cover transition-transform duration-500 "
          style={{
            display: "block",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: { xs: "1 1 auto", md: "1 1 50%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent className="flex flex-col h-full justify-between p-6">
          <Link
            to={`/content/${trend?.slug}`}
            className="inline-block hover:text-HeroClr"
          >
            <div>
              <Typography
                variant="overline"
                className="text-gray- mb-2 block text-HeroClr font-bold "
              >
                <span className="text-sm font-medium text-HeroClr mb-2 block">
                  {getDisplayType()}
                </span>
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
                <span className="inline-block hover:text-HeroClr">
                  {trend?.title}
                </span>
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-700 mb-6"
                sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
              >
                <span className="inline-block hover:text-HeroClr">
                  {truncateContent(trend?.content)}
                </span>
              </Typography>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-sm text-gray-800">
            <div className="flex items-center">
              <a
                href="#"
                className="text-sm md:text-sm text-gray-800 flex items-center"
              >
                <Avatar
                  src={`${backendURL}${trend?.authorId?.image}`}
                  alt={trend?.authorId?.name}
                  sx={{ width: 30, height: 30 }}
                >
                  {!trend?.authorId?.image && <ImageIcon />}
                </Avatar>
                <span className="ml-2">{trend?.authorId?.name}</span>
              </a>
            </div>

            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{moment(trend.updatedAt).format("MMMM D, YYYY")}</span>
            </div>
          </div>
        </CardContent>
      </Box>
    </Card>
  );
};

export default NewsCard;
