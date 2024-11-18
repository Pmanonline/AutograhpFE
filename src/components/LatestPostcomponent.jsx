import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import backendURL from "../config";

import { RotatingLines } from "react-loader-spinner";
import CalendarToday from "@mui/icons-material/CalendarToday";

import ArrowForward from "@mui/icons-material/ArrowForward";

function LatestPostcomponent() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  const LatestPosts = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch(`${backendURL}/api/getAllFashion`);
      if (!response.ok) {
        throw new Error("Failed to fetch fashion trends");
      }
      const data = await response.json();
      if (data && data.posts) {
        setLatest(data.posts.slice(0, 6)); // Limit to 6 posts
      }
    } catch (error) {
      console.error("Error fetching fashion trends:", error);
    } finally {
      setLoading(false);
    }
  }, [backendURL]);

  useEffect(() => {
    LatestPosts();
  }, [LatestPosts]);

  const memoizedLatestPosts = useMemo(() => {
    return latest.map((article) => (
      <div
        key={article._id}
        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow lg:max-w-xs mx-auto"
      >
        <img
          src={`${backendURL}${article.image1}`}
          alt={article.title}
          className="w-full h-32 object-cover"
        />
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 hover:text-red-500 cursor-pointer">
            <Link to={`/content/${article.slug}`}>{article.title}</Link>
          </h3>
          <div className="flex justify-between items-center text-xs text-gray-600">
            <div className="flex items-center">
              <CalendarToday fontSize="small" className=" mr-1" />
              {moment(article.createdAt).format("MMM D, YYYY")}
            </div>
          </div>
          <Link
            to={`/content/${article.slug}`}
            className="mt-2 inline-flex items-center text-red-600 hover:text-red-700 text-xs"
          >
            Read More
            <ArrowForward fontSize="small" className=" ml-1" />
          </Link>
        </div>
      </div>
    ));
  }, [latest]);

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mx-auto">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        memoizedLatestPosts // Render memoized posts
      )}
    </div>
  );
}

export default LatestPostcomponent;
