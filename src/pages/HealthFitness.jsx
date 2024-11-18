// import React, { useState, useEffect, useCallback } from "react";
// import ContainerImage from "../assets/images/Container.png"; // You can use the same image or a different one
// import ShortVideosSection from "../components/Cards/ShortVideoCards";
// import { EssentialNews } from "./Home";
// import TrendCard from "../components/Cards/TrendCard";
// import RegularCard from "../components/Cards/RegularCard";
// import RecommendCard from "../components/Cards/RecommendedCrad";
// import { CircularProgress } from "@mui/material";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// function HealthFitness() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [healthTrend, setHealthTrend] = useState([]);
//   const [regularHealthItems, setRegularHealthItems] = useState([]);
//   const [recommendedHealthItems, setRecommendedHealthItems] = useState([]);
//   const [news, setNews] = useState([]);

//   const fetchHealthData = useCallback(async (category, setData) => {
//     try {
//       const response = await fetch(
//         `${backendURL}/api/getAllFashion?category=${category}&postType=LifeStyle&subCategory=Health & Fitness`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();
//       if (data?.posts) {
//         setData(data.posts);
//       } else {
//         setError("Invalid data format received");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     }
//   }, []);

//   const fetchNews = useCallback(async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/getAllNews`);
//       if (!res.ok) {
//         throw new Error(`HTTP error! status : ${res.status}`);
//       }
//       const data = await res.json();
//       setNews(data.posts.slice(0, 4));
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setError(error.message);
//     }
//   }, []);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         await Promise.all([
//           fetchNews(),
//           fetchHealthData("TopTrend", setHealthTrend),
//           fetchHealthData("Regular", setRegularHealthItems),
//           fetchHealthData("Recommended", setRecommendedHealthItems),
//         ]);
//       } catch (error) {
//         setError("Failed to load health data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [fetchNews, fetchHealthData]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="md:p-16 max-w-7xl mx-auto">
//         <h3 className="mid:mx-5 mid:mt-5">
//           Welcome to the Health & Fitness section! Here, we provide tips,
//           guides, and inspiration for your wellness journey. From fitness
//           routines to healthy recipes, we have everything you need to lead a
//           healthier lifestyle!
//         </h3>

//         {/* TrendCard */}
//         <div className="container mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 gap-8">
//             {healthTrend.map((health) => (
//               <TrendCard key={health._id} trend={health} />
//             ))}
//           </div>
//         </div>
//         {/* TrendCard */}

//         {/* Advert */}
//         <span className="my-[ 2rem] flex justify-center">
//           <img
//             className="h-32 rounded-md w-[80%]"
//             src={ContainerImage}
//             alt="Container Image" // Add meaningful alt text
//           />
//         </span>
//         {/* Advert */}

//         {/* Regular Card */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[6rem]">
//           <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-red-900 bg-clip-text text-transparent headFont">
//             LIFE STYLE
//           </h2>
//           <div className="w-full mb-5">
//             <hr className="border-t border-gray-500 w-full" />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
//             {regularHealthItems.map((item) => (
//               <RegularCard key={item.id} item={item} />
//             ))}
//           </div>
//         </div>
//         {/* Regular Card */}

//         {/* SHORT VIDEO SECTION */}
//         <ShortVideosSection />
//         {/* SHORT VIDEO SECTION */}
//       </div>

//       {/* Recommend Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[6rem]">
//         <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-red-900 bg-clip-text text-transparent headFont">
//           RECOMMENDED
//         </h2>

//         <div className="w-full mb-5">
//           <hr className="border-t border-gray-500 w-full" />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
//           {recommendedHealthItems.map((item) => (
//             <RecommendCard key={item._id} item={item} />
//           ))}
//         </div>
//       </div>

//       {/* ESSENTIAL NEWS */}
//       <EssentialNews news={news} />
//       {/* ESSENTIAL NEWS */}
//     </>
//   );
// }

// export default HealthFitness;

import React, { useState, useCallback, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import SocialMediaFollow from "../components/SocialMediaFollow";
import LatestPostcomponent from "../components/LatestPostcomponent";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/tools/pagination";
import backendURL from "../config";

// Change items per page to 5
const ITEMS_PER_PAGE = 5;

const HealthFitness = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHealthFitness = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=LifeStyle&subCategory=Health & Fitness`
      );
      if (!response.ok)
        throw new Error("Failed to fetch fetchHealthFitness data");
      const data = await response.json();
      setNewsItems(data.posts);
      setError(null);
    } catch (error) {
      console.error("Error fetching fetchHealthFitness data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealthFitness();
  }, [fetchHealthFitness]);

  // Reset to first page when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [newsItems.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = newsItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    window.scrollTo(0, 0); // Scroll to top when page changes
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:w-2/3">
            <div className="ml-4 my-5">
              <h3 className="text-xl font-normal">
                Category : Health & Fitness
              </h3>
            </div>
            <div className="container mx-auto px-4 pb-12">
              <div className="grid grid-cols-1 gap-8">
                {currentItems.map((item) => (
                  <NewsCard key={item._id} trend={item} />
                ))}
              </div>
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </main>

          <aside className="lg:w-1/3 mid:hidde">
            <div className="sticky top-4">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-gray-500 to-black bg-clip-text text-transparent ml-10">
                Latest Posts
              </h2>
              <LatestPostcomponent />

              <div className="mx-7 mt-12">
                <SocialMediaFollow />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HealthFitness;
