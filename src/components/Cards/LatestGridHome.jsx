import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Calendar } from "lucide-react";
import SocialMediaFollow from "../../components/SocialMediaFollow";
import backendURL from "../../config";

const LatestGridHome = () => {
  const [regularFashionItems, setRegularFashionItems] = useState([]);

  const fetchRegularFashion = useCallback(async () => {
    try {
      const response = await fetch(`${backendURL}/api/getAllFashion`);
      if (!response.ok) {
        throw new Error("Failed to fetch fashion trends");
      }
      const data = await response.json();
      if (data && data.posts) {
        setRegularFashionItems(data.posts.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching fashion trends:", error);
    }
  }, [backendURL]);

  useEffect(() => {
    fetchRegularFashion();
  }, [fetchRegularFashion]);

  return (
    <div className="sm:container mx-auto px-4 py-3">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="lg:w-[70%]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6 bg-gray-100 p-2 rounded-sm">
              <h2 className="text-xl font-bold headFont bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent">
                LATEST POSTS
              </h2>
              <Link
                // to="/all-posts"
                className="text-orange-500 hover:text-orange-600"
              >
                All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularFashionItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/content/${item.slug}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                    <div className="relative">
                      <img
                        src={`${backendURL}${item.image1}`}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                      />
                      {/* <span className="absolute top-4 left-4 bg-gray-200 opacity-90 text-HeroClr text-xs px-3 py-1 rounded">
                        {item.postType}
                      </span> */}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-3 group-hover:text-orange-500 transition-colors duration-200">
                        {item.title
                          .replace(/<\/?[^>]+(>|$)/g, "")
                          .slice(0, 70) + (item.title.length > 70 ? "..." : "")}
                      </h3>
                      <div className="flex items-center text-gray-500 text-xs gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{item.commentCount || 0} comment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <aside className="lg:w-[30%]">
          <div className="top-4">
            <div className="mx-auto">
              <SocialMediaFollow />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LatestGridHome;
