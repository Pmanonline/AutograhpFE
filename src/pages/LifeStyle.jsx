// import React, { useState, useEffect, useCallback } from "react";
// import ContainerImage from "../assets/images/Container.png";
// import ShortVideosSection from "../components/Cards/ShortVideoCards";
// import { Link } from "react-router-dom";
// import { EssentialNews } from "./Home";
// import TrendCard from "../components/Cards/TrendCard"; // Import TrendCard
// import RegularCard from "../components/Cards/RegularCard"; // Import RegularCard
// import RecommendCard from "../components/Cards/RecommendedCrad";
// import { CircularProgress } from "@mui/material";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:3001";

// function LifeStyle() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [fashionTrend, setFashionTrend] = useState([]);
//   const [regularLifeStyle, setRegularLifeStyle] = useState([]);
//   const [recommendedLifeStyleItems, setRecommendedLifeStyleItems] = useState(
//     []
//   );
//   const [news, setNews] = useState([]);
//   console.log(fashionTrend);

//   const fetchData = useCallback(async (category, setData) => {
//     try {
//       const response = await fetch(
//         `${backendURL}/api/getAllFashion?category=${category}&postType=LifeStyle&subCategory=LifeStyle`
//       );
//       if (!response.ok) {
//         throw new Error(`Failed to fetch ${category} data`);
//       }
//       const data = await response.json();
//       console.log(data);
//       if (data?.posts) {
//         setData(data.posts);
//       } else {
//         setError("Invalid data format received");
//       }
//     } catch (error) {
//       console.error(`Error fetching ${category} data:`, error);
//       setError(error.message);
//     }
//   }, []);

//   const fetchNews = useCallback(async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/getAllNews`);
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       setNews(data.posts.slice(0, 4));
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setError(error.message);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       setLoading(true);
//       await Promise.all([
//         fetchData("TopTrend", setFashionTrend),
//         fetchData("Regular", setRegularLifeStyle),
//         fetchData("Recommended", setRecommendedLifeStyleItems),
//         fetchNews(),
//       ]);
//       setLoading(false);
//     };

//     fetchAllData();
//   }, [fetchData, fetchNews]);

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
//           Get your ultimate fashion inspiration from our celebrity style
//           pictures! See how you can wear the latest trends as demonstrated by
//           models, celebrities and our A list style icons. Whether it is from
//           their street style or on the red carpet, we bring you the best fashion
//           moments and styling tips as learnt from your fave celebs. You can even
//           shop your favourite celebrity's outfit with our Get the Look features!
//         </h3>

//         {/* Trend Card Section */}
//         {/* TrendCard */}
//         <div className="container mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 gap-8">
//             {fashionTrend.map((fashion) => (
//               <TrendCard key={fashion._id} trend={fashion} />
//             ))}
//           </div>
//         </div>
//         {/* TrendCard */}

//         {/* Advert */}
//         <span className="my-[2rem] flex justify-center">
//           <img
//             className="h-32 rounded-md w-[80%]"
//             src={ContainerImage}
//             alt="Container Image"
//           />
//         </span>
//         {/* Advert */}

//         {/* LIFE STYLE Section And Card */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[6rem]">
//           <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-red-900 bg-clip-text text-transparent headFont">
//             LIFE STYLE
//           </h2>
//           <div className="w-full mb-5">
//             <hr className="border-t border-gray-500 w-full" />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
//             {regularLifeStyle.map((item) => (
//               <RegularCard key={item.id} item={item} />
//             ))}
//           </div>
//         </div>

//         {/* SHORT VIDEO SECTION */}
//         <ShortVideosSection />

//         {/* Recommend Fashion Card */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[6rem]">
//           <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-red-900 bg-clip-text text-transparent headFont">
//             Recommends
//           </h2>

//           <div className="w-full mb-5">
//             <hr className="border-t border-gray-500 w-full" />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
//             {recommendedLifeStyleItems.map((item) => (
//               <RecommendCard key={item._id} item={item} />
//             ))}
//           </div>
//         </div>

//         {/* ESSENTIAL NEWS */}
//         <EssentialNews news={news} />
//         {/* ESSENTIAL NEWS */}
//       </div>
//     </>
//   );
// }

// export default LifeStyle;

import React, { useState, useCallback, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import SocialMediaFollow from "../components/SocialMediaFollow";
import LatestPostcomponent from "../components/LatestPostcomponent";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/tools/pagination";
import backendURL from "../config";

// Change items per page to 5
const ITEMS_PER_PAGE = 5;

const LifeStyle = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLifeStyle = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=LifeStyle&subCategory=LifeStyle`
      );
      if (!response.ok) throw new Error("Failed to fetch LifeStyle data");
      const data = await response.json();
      setNewsItems(data.posts);
      setError(null);
    } catch (error) {
      console.error("Error fetching LifeStyle data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLifeStyle();
  }, [fetchLifeStyle]);

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
              <h3 className="text-xl font-normal">Category : LifeStyle</h3>
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

export default LifeStyle;
