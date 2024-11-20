// import React, { useEffect, useState, useCallback } from "react";
// import { Eye, Heart, Calendar, User } from "lucide-react";
// import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import backendURL from "../config";
// import moment from "moment";

// const DigitalEdition = () => {
//   const [digitalEditions, setDigitalEditions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const fetchDigitalEditions = useCallback(async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/getAllDigitalEditions`);
//       if (!res.ok) throw new Error("Failed to fetch");
//       const data = await res.json();
//       console.log(data);
//       setDigitalEditions(data);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDigitalEditions();
//   }, [fetchDigitalEditions]);

//   const handleCardClick = (slug) => {
//     navigate(`/digital-edition/${slug}`); // Navigate to the single page using slug
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Digital Editions</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {digitalEditions.map((edition) => (
//           <div
//             onClick={() => handleCardClick(edition.slug)}
//             key={edition._id}
//             className="group relative h-[500px] overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//           >
//             {/* Main Image */}
//             <img
//               src={`${backendURL}${edition.image1}`}
//               alt={edition.title}
//               className="h-full w-full object-cover"
//             />

//             {/* Category Badge */}
//             <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
//               {edition.category}
//             </div>

//             {/* Hover Overlay */}
//             <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 rounded-lg group-hover:rounded-lg">
//               <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center space-y-4 border border-white border-r-btColour border-l-HeroClr border-t-black cursor-pointer group-hover:rounded-3xl group-hover:p-2  group-hover:bg-red-500">
//                 {/* Icon */}
//                 <Eye size={32} className="text-white mb-4" />

//                 {/* Title */}
//                 <h3 className="text-2xl font-bold text-white text-center">
//                   {edition.title}
//                 </h3>

//                 {/* Author */}
//                 <div className="flex items-center space-x-2 text-white/90">
//                   <span className="text-xs"> Published by:</span>
//                   <span>
//                     {" "}
//                     <User size={16} />
//                   </span>
//                   <span>{edition?.authorId?.name}</span>
//                 </div>

//                 {/* Date */}
//                 <div className="flex items-center space-x-2 text-white/90">
//                   <Calendar size={16} />
//                   <span>
//                     {moment(edition.updatedAt).format("MMMM D, YYYY")}
//                   </span>
//                 </div>

//                 {/* Likes */}
//                 <div className="flex items-center space-x-2 text-white/90">
//                   <Heart size={16} />
//                   <span>{edition.likes?.length || 0} Likes</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DigitalEdition;
import React, { useEffect, useState, useCallback } from "react";
import { Eye, Heart, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import backendURL from "../config";
import moment from "moment";
import Pagination from "../components/tools/pagination";

const ITEMS_PER_PAGE = 6;

const DigitalEdition = () => {
  const [digitalEditions, setDigitalEditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchDigitalEditions = useCallback(async (page) => {
    try {
      setIsLoading(true);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;

      const response = await fetch(
        `${backendURL}/api/getAllDigitalEditions2?startIndex=${startIndex}&limit=${ITEMS_PER_PAGE}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.digitalEditions || !Array.isArray(data.digitalEditions)) {
        throw new Error("API didn't return expected data format");
      }

      setDigitalEditions(data.digitalEditions);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDigitalEditions(currentPage);
  }, [currentPage, fetchDigitalEditions]);

  const handleCardClick = (slug) => {
    navigate(`/digital-edition/${slug}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Digital Editions</h1>

      {digitalEditions.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No digital editions available
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalEditions.map((edition) => (
              <div
                onClick={() => handleCardClick(edition.slug)}
                key={edition._id}
                className="group relative h-[500px] overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Main Image */}
                <img
                  src={`${backendURL}${edition.image1}`}
                  alt={edition.title}
                  className="h-full w-full object-cover"
                />

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  {edition.category}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 rounded-lg group-hover:rounded-lg">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center space-y-4 border border-white border-r-btColour border-l-HeroClr border-t-black cursor-pointer group-hover:rounded-3xl group-hover:p-2 group-hover:bg-red-500">
                    {/* Icon */}
                    <Eye size={32} className="text-white mb-4" />

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white text-center">
                      {edition.title}
                    </h3>

                    {/* Author */}
                    <div className="flex items-center space-x-2 text-white/90">
                      <span className="text-xs">Published by:</span>
                      <span>
                        <User size={16} />
                      </span>
                      <span>{edition?.authorId?.name}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center space-x-2 text-white/90">
                      <Calendar size={16} />
                      <span>
                        {moment(edition.updatedAt).format("MMMM D, YYYY")}
                      </span>
                    </div>

                    {/* Likes */}
                    <div className="flex items-center space-x-2 text-white/90">
                      <Heart size={16} />
                      <span>{edition.likes?.length || 0} Likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DigitalEdition;
