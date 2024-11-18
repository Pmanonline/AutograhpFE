import React, { useState, useEffect, useCallback } from "react";
import ContainerImage from "../assets/images/Container.png"; // You can use the same image or a different one
import ShortVideosSection from "../components/Cards/ShortVideoCards";
import { EssentialNews } from "./Home";
import TrendCard from "../components/Cards/TrendCard";
import RegularCard from "../components/Cards/RegularCard";
import RecommendCard from "../components/Cards/RecommendedCrad";
import { CircularProgress } from "@mui/material";
import backendURL from "../config";

function Awards() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [awardsTrend, setAwardsTrend] = useState([]); // Change naming to reflect awards
  const [regularAwardsItems, setRegularAwardsItems] = useState([]); // Change naming to reflect awards
  const [recommendedAwardsItems, setRecommendedAwardsItems] = useState([]); // Change naming to reflect awards
  const [news, setNews] = useState([]);

  const fetchAwardsData = useCallback(async (category, setData) => {
    try {
      const response = await fetch(
        `${backendURL}/api/getAllFashion?category=${category}&postType=LifeStyle&subCategory=Awards`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data?.posts) {
        setData(data.posts);
      } else {
        setError("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/getAllNews`);
      if (!res.ok) {
        throw new Error(`HTTP error! status : ${res.status}`);
      }
      const data = await res.json();
      setNews(data.posts.slice(0, 4));
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchNews(),
          fetchAwardsData("TopTrend", setAwardsTrend),
          fetchAwardsData("Regular", setRegularAwardsItems),
          fetchAwardsData("Recommended", setRecommendedAwardsItems),
        ]);
      } catch (error) {
        setError("Failed to load awards data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchNews, fetchAwardsData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="md:p-16 max-w-7xl mx-auto">
        <h3 className="mid:mx-5 mid:mt-5">
          Welcome to the Awards section! Here, we celebrate the achievements and
          recognitions in various fields. Stay updated on the latest award
          ceremonies, nominees, and winners!
        </h3>

        {/* TrendCard */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8">
            {awardsTrend.map((award) => (
              <TrendCard key={award._id} trend={award} />
            ))}
          </div>
        </div>
        {/* TrendCard */}

        {/* Advert */}
        <span className="my-[2rem] flex justify-center">
          <img
            className="h-32 rounded-md w-[80%]"
            src={ContainerImage}
            alt="Container Image" // Add meaningful alt text
          />
        </span>
        {/* Advert */}

        {/* Regular Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[6rem]">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-red-900 bg-clip-text text-transparent headFont">
            ESSENTIAL AWARDS
          </h2>
          <div className="w-full mb-5">
            <hr className="border-t border-gray-500 w-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
            {regularAwardsItems.map((item) => (
              <RegularCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        {/* Regular Card */}

        {/* SHORT VIDEO SECTION */}
        <ShortVideosSection />
        {/* SHORT VIDEO SECTION */}
      </div>

      {/* Recommend Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[6rem]">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-red-900 bg-clip-text text-transparent headFont">
          MORE ON AWARDS
        </h2>

        <div className="w-full mb-5">
          <hr className="border-t border-gray-500 w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
          {recommendedAwardsItems.map((item) => (
            <RecommendCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* ESSENTIAL NEWS */}
      <EssentialNews news={news} />
      {/* ESSENTIAL NEWS */}
    </>
  );
}

export default Awards;
