// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import backendURL from "../../config";

// const GridCards = () => {
//   const [fashionItems, setFashionItems] = useState([]);
//   const [businessItems, setBusinessItems] = useState([]);
//   const [entertainmentItems, setEntertainmentItems] = useState([]);
//   const [latestItems, setLatestItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           fashionResponse,
//           businessResponse,
//           entertainmentResponse,
//           latestResponse,
//         ] = await Promise.all([
//           fetch(
//             `${backendURL}/api/getAllFashion?category=TopTrend&postType=Fashion`
//           ),
//           fetch(
//             `${backendURL}/api/getAllFashion?category=TopTrend&postType=Business`
//           ),
//           fetch(
//             `${backendURL}/api/getAllFashion?category=TopTrend&postType=Entertainment`
//           ),
//           fetch(
//             `${backendURL}/api/getAllFashion?category=TopTrend&postType=LifeStyle&subCategory=LifeStyle`
//           ),
//         ]);

//         const [fashionData, businessData, entertainmentData, latestData] =
//           await Promise.all([
//             fashionResponse.json(),
//             businessResponse.json(),
//             entertainmentResponse.json(),
//             latestResponse.json(),
//           ]);

//         setFashionItems(fashionData.posts);
//         setBusinessItems(businessData.posts);
//         setEntertainmentItems(entertainmentData.posts);
//         setLatestItems(latestData.posts);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderCard = (item, size = "small") => {
//     if (!item) return null;

//     const cardClasses =
//       size === "large"
//         ? "col-span-2 md:col-span-2 lg:col-span-2 h-full"
//         : "h-full";

//     return (
//       <Link
//         to={`/content/${item.slug}`}
//         className={`${cardClasses} relative block group overflow-hidden`}
//       >
//         <div className="relative h-full">
//           <img
//             src={`${backendURL}${item.image1}`}
//             alt={item.title}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//           <div className="absolute top-4 left-4">
//             <span
//               className={`
//                 ${
//                   item.postType === "Fashion"
//                     ? "bg-red-600"
//                     : item.postType === "Entertainment"
//                     ? "bg-blue-600"
//                     : item.postType === "Business"
//                     ? "bg-blue-600"
//                     : "bg-green-600"
//                 }
//                 text-white text-xs px-3 py-1 rounded-sm uppercase font-medium
//               `}
//             >
//               {item.postType}
//             </span>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 p-4">
//             <h2
//               className={`text-white font-bold mb-2 line-clamp-2 ${
//                 size === "large" ? "text-2xl md:text-xl lg:text-2xl" : "text-lg"
//               }`}
//             >
//               {item.title}
//             </h2>
//             <div className="flex items-center text-white/80 text-sm space-x-4">
//               <span>{new Date(item.date).toLocaleDateString()}</span>
//               <div className="flex items-center space-x-1">
//                 <span>{item.views}</span>
//                 <span>Views</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     );
//   };

//   return (
//     <div className="mx-auto  py-6">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-1 h-full ">
//         {/* Fashion Section - Large Card */}
//         {fashionItems.length > 0 && (
//           <div className="lg:col-span-2 h-full">
//             {renderCard(fashionItems[0], "large")}
//           </div>
//         )}

//         {/* Entertainment Section - Full Height */}
//         <div className="h-full">
//           {entertainmentItems.slice(0, 1).map((item) => (
//             <div key={item.id} className="h-full">
//               {renderCard(item)}
//             </div>
//           ))}
//         </div>

//         {/* Business and Lifestyle Section */}
//         <div className="flex flex-col  gap-1">
//           {businessItems.slice(0, 1).map((item) => (
//             <div key={item.id} className="flex-1">
//               {renderCard(item)}
//             </div>
//           ))}
//           {latestItems.slice(0, 1).map((item) => (
//             <div key={item.id} className="flex-1">
//               {renderCard(item)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GridCards;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backendURL from "../../config";

const GridCards = () => {
  const [fashionItems, setFashionItems] = useState([]);
  const [businessItems, setBusinessItems] = useState([]);
  const [entertainmentItems, setEntertainmentItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          fashionResponse,
          businessResponse,
          entertainmentResponse,
          latestResponse,
        ] = await Promise.all([
          fetch(
            `${backendURL}/api/getAllFashion?category=TopTrend&postType=Fashion`
          ),
          fetch(
            `${backendURL}/api/getAllFashion?category=TopTrend&postType=Business`
          ),
          fetch(
            `${backendURL}/api/getAllFashion?category=TopTrend&postType=Entertainment`
          ),
          fetch(
            `${backendURL}/api/getAllFashion?category=TopTrend&postType=LifeStyle&subCategory=LifeStyle`
          ),
        ]);

        const [fashionData, businessData, entertainmentData, latestData] =
          await Promise.all([
            fashionResponse.json(),
            businessResponse.json(),
            entertainmentResponse.json(),
            latestResponse.json(),
          ]);

        setFashionItems(fashionData.posts);
        setBusinessItems(businessData.posts);
        setEntertainmentItems(entertainmentData.posts);
        setLatestItems(latestData.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderCard = (item, size = "small") => {
    if (!item) return null;

    const cardClasses = `
      relative block group overflow-hidden h-full
      ${size === "large" ? "col-span-full sm:col-span-2" : ""}
    `;

    return (
      <Link to={`/content/${item.slug}`} className={cardClasses}>
        <div className="relative h-full min-h-[200px] sm:min-h-[250px]">
          <img
            src={`${backendURL}${item.image1}`}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span
              className={`
                ${
                  item.postType === "Fashion"
                    ? "bg-red-600"
                    : item.postType === "Entertainment"
                    ? "bg-blue-600"
                    : item.postType === "Business"
                    ? "bg-blue-600"
                    : "bg-pink-600"
                }
                text-white text-xs px-2 sm:px-3 py-1 rounded-sm uppercase font-medium
              `}
            >
              {item.postType}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
            <h2
              className={`text-white font-bold mb-1 sm:mb-2 line-clamp-2 
                ${
                  size === "large"
                    ? "text-lg sm:text-xl lg:text-2xl"
                    : "text-base sm:text-lg"
                }
              `}
            >
              {item.title}
            </h2>
            <div className="flex items-center text-white/80 text-xs sm:text-sm space-x-2 sm:space-x-4">
              <span>{new Date(item.date).toLocaleDateString()}</span>
              <div className="flex items-center space-x-1">
                <span>{item.views}</span>
                <span>Views</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 py-2 sm:py-6">
      <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-4 gap-2 h-full">
        {/* Fashion Section */}
        {fashionItems.length > 0 && (
          <div className="col-span-2 sm:col-span-2 h-full">
            {renderCard(fashionItems[0], "large")}
          </div>
        )}

        {/* Entertainment Section */}
        <div className="h-full">
          {entertainmentItems.slice(0, 1).map((item) => (
            <div key={item.id} className="h-full">
              {renderCard(item)}
            </div>
          ))}
        </div>

        {/* Business and Lifestyle Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 h-full">
          {businessItems.slice(0, 1).map((item) => (
            <div key={item.id} className="h-full">
              {renderCard(item)}
            </div>
          ))}
          {latestItems.slice(0, 1).map((item) => (
            <div key={item.id} className="h-full">
              {renderCard(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridCards;
