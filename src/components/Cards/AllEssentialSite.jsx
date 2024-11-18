// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

// const CarouselCard = ({ image, name, url }) => (
//   <Link target="_blank" to={url} className="flex-shrink-0 mx-1">
//     <div className="w-24 bg-white rounded-md shadow-sm overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-md">
//       <img src={image} alt={name} className="w-full h-16 object-cover" />
//       <div className="p-1">
//         <h3 className="font-semibold text-xs text-center truncate">{name}</h3>
//       </div>
//     </div>
//   </Link>
// );

// const AutoScrollCarousel = ({ items }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     let scrollInterval;

//     const startScrolling = () => {
//       scrollInterval = setInterval(() => {
//         if (!isHovered && scrollContainer) {
//           scrollContainer.scrollLeft += 1;
//           if (
//             scrollContainer.scrollLeft >=
//             scrollContainer.scrollWidth - scrollContainer.clientWidth
//           ) {
//             scrollContainer.scrollLeft = 0;
//           }
//         }
//       }, 20);
//     };

//     startScrolling();

//     return () => {
//       if (scrollInterval) clearInterval(scrollInterval);
//     };
//   }, [isHovered]);

//   return (
//     <div
//       className="w-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         ref={scrollRef}
//         className="flex overflow-x-scroll scrollbar-hide py-2 gap-12"
//         style={{ scrollBehavior: "smooth" }}
//       >
//         {items.map((item, index) => (
//           <CarouselCard key={index} {...item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const AllEssentialSite = () => {
//   const carouselItems = [
//     {
//       image: "/src/assets/images/E-business.png",
//       name: "E-bussiness",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//     },
//     {
//       image: "/src/assets/images/Edrive.jpg",
//       name: "E-drive",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: "http://edrive.ng",
//     },
//     {
//       image: "/src/assets/images/Egroup.png",
//       name: "E-group",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//     },
//     {
//       image: "/src/assets/images/Ejobs.jpg",
//       name: "E-jobs",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: " http://13.92.179.121:3002/",
//     },
//     {
//       image: "/src/assets/images/Enews.jpg",
//       name: "E-news",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: "http://essentialnews.ng",
//     },
//     {
//       image: "/src/assets/images/Eschools.jpg",
//       name: "E-schools",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: "https://eschools.ng/",
//     },
//     {
//       image: "/src/assets/images/Evenue.png",
//       name: "E-venue",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//     },
//     {
//       image: "/src/assets/images/Eschools.jpg",
//       name: "E-direct",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: "https://edirect.essential.ng/",
//     },
//     {
//       image: "/src/assets/images/Eschools.jpg",
//       name: "E-registry",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: "/",
//     },
//     {
//       image: "/src/assets/images/Eschools.jpg",
//       name: "E-polls",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: "/",
//     },
//     {
//       image: "/src/assets/images/Eschools.jpg",
//       name: "E-companion",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: "/",
//     },
//     {
//       image: "/src/assets/images/Eschools.jpg",
//       name: "E-registry",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
//       url: "/",
//     },
//   ];

//   return (
//     <div className="p-2">
//       <AutoScrollCarousel items={carouselItems} />
//     </div>
//   );
// };

// export default AllEssentialSite;
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import eBusinessImage from "../../assets/images/E-business.png";
import eDriveImage from "../../assets/images/Edrive.jpg";
import eGroupImage from "../../assets/images/Egroup.png";
import eJobsImage from "../../assets/images/Ejobs.jpg";
import eNewsImage from "../../assets/images/Enews.jpg";
import eSchoolsImage from "../../assets/images/Eschools.jpg";
import eVenueImage from "../../assets/images/Evenue.png";

const CarouselCard = ({ image, name, url }) => (
  <Link target="_blank" to={url} className="flex-shrink-0 mx-1">
    <div className="w-24 bg-white rounded-md shadow-sm overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-md">
      <img src={image} alt={name} className="w-full h-16 object-cover" />
      <div className="p-1">
        <h3 className="font-semibold text-xs text-center truncate">{name}</h3>
      </div>
    </div>
  </Link>
);

const AutoScrollCarousel = ({ items }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered && scrollContainer) {
          scrollContainer.scrollLeft += 1;
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 20);
    };

    startScrolling();

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isHovered]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide py-2 gap-12"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((item, index) => (
          <CarouselCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const AllEssentialSite = () => {
  const carouselItems = [
    {
      image: eBusinessImage,
      name: "E-bussiness",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "/",
    },
    {
      image: eDriveImage,
      name: "E-drive",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "http://edrive.ng",
    },
    {
      image: eGroupImage,
      name: "E-group",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "/",
    },
    {
      image: eJobsImage,
      name: "E-jobs",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "http://13.92.179.121:3002/",
    },
    {
      image: eNewsImage,
      name: "E-news",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "http://essentialnews.ng",
    },
    {
      image: eSchoolsImage,
      name: "E-schools",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "https://eschools.ng/",
    },
    {
      image: eVenueImage,
      name: "E-venue",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
    },
    {
      image: eSchoolsImage,
      name: "E-direct",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "https://edirect.essential.ng/",
    },
    {
      image: eSchoolsImage,
      name: "E-registry",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "/",
    },
    {
      image: eSchoolsImage,
      name: "E-polls",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "/",
    },
    {
      image: eSchoolsImage,
      name: "E-companion",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "/",
    },
    {
      image: eSchoolsImage,
      name: "E-registry",
      description:
        "Lorem ipsum dolor sit amet, consectetur. Et rhoncus nunc dictum massa.",
      url: "/",
    },
  ];

  return (
    <div className="p-2">
      <AutoScrollCarousel items={carouselItems} />
    </div>
  );
};

export default AllEssentialSite;
