// import React, { useState, useEffect, useCallback } from "react";
// import ContainerImage from "../assets/images/Container.png";
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

// function Weddings() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [weddingTrend, setWeddingTrend] = useState([]);
//   const [regularWeddingItems, setRegularWeddingItems] = useState([]);
//   const [recommendedWeddingItems, setRecommendedWeddingItems] = useState([]); // Rename for clarity
//   const [news, setNews] = useState([]);

//   const fetchWeddingData = useCallback(async (category, setData) => {
//     try {
//       const response = await fetch(
//         `${backendURL}/api/getAllFashion?category=${category}&postType=LifeStyle&subCategory=Wedding`
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
//     setLoading(true); // Set loading state once
//     fetchNews();
//     fetchWeddingData("TopTrend", setWeddingTrend);
//     fetchWeddingData("Regular", setRegularWeddingItems);
//     fetchWeddingData("Recommended", setRecommendedWeddingItems);
//     setLoading(false); // Set loading state to false after fetching
//   }, [fetchNews, fetchWeddingData]);

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
//           Welcome to our Weddings section! Here, you can explore the latest
//           trends in wedding fashion, decor, and planning. Whether you're a
//           bride-to-be or just looking for inspiration, we have everything you
//           need to make your special day unforgettable.
//         </h3>

//         {/* TrendCard */}
//         <div className="container mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 gap-8">
//             {weddingTrend.map((wedding) => (
//               <TrendCard key={wedding._id} trend={wedding} />
//             ))}
//           </div>
//         </div>
//         {/* TrendCard */}

//         {/* Advert */}
//         <span className="my-[2rem] flex justify-center">
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
//             WEDDING INSPIRATION
//           </h2>
//           <div className="w-full mb-5">
//             <hr className="border-t border-gray-500 w-full" />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
//             {regularWeddingItems.map((item) => (
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
//           Recommends
//         </h2>

//         <div className="w-full mb-5">
//           <hr className="border-t border-gray-500 w-full" />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
//           {recommendedWeddingItems.map((item) => (
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

// export default Weddings;

import React, { useState, useCallback, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import SocialMediaFollow from "../components/SocialMediaFollow";
import LatestPostcomponent from "../components/LatestPostcomponent";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/tools/pagination";
import backendURL from "../config";

// Change items per page to 5
const ITEMS_PER_PAGE = 5;

const Weddings = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchWedding = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=LifeStyle&subCategory=Wedding`
      );
      if (!response.ok) throw new Error("Failed to fetch Wedding data");
      const data = await response.json();
      console.log(data);
      setNewsItems(data.posts);
      setError(null);
    } catch (error) {
      console.error("Error fetching Wedding data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWedding();
  }, [fetchWedding]);

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
              <h3 className="text-xl font-normal">Category : Wedding</h3>
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

export default Weddings;
