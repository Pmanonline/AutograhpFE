import React, { useState, useCallback, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import SocialMediaFollow from "../components/SocialMediaFollow";
import LatestPostcomponent from "../components/LatestPostcomponent";
import NewsCard from "../components/Cards/NewsCard";
import Pagination from "../components/tools/pagination";
import backendURL from "../config";

// Change items per page to 5
const ITEMS_PER_PAGE = 5;

const Entertainment = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEntertainment = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=Entertainment`
      );
      if (!response.ok) throw new Error("Failed to fetch society data");
      const data = await response.json();
      setNewsItems(data.posts);
      setError(null);
    } catch (error) {
      console.error("Error fetching society data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntertainment();
  }, [fetchEntertainment]);

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
              <h3 className="text-xl font-normal">Category : Entertainment</h3>
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

export default Entertainment;
