import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";

import eRegistryIcon from "../../assets/images/herocardImage.png";
import eCertifyIcon from "../../assets/images/herocardImage2.png";
import eMailIcon from "../../assets/images/herocardImage3.png";
import ePollsIcon from "../../assets/images/herocardImage4.png";
import eJobs from "../../assets/images/Ejobs.jpg";
import eDriveIcon from "../../assets/images/Edrive.jpg";
import eNews from "../../assets/images/Enews.jpg";
import eSchools from "../../assets/images/Eschools.jpg";
import edirect from "../../assets/images/Edrive.jpg";
import eroot from "../../assets/images/Eroot.png";
import ebnb from "../../assets/images/ebnb.jpg";
import companion from "../../assets/images/ecompanion.png";
import autograph from "../../assets/images/autograph2.png";
import etech from "../../assets/images/etech.png";
import estores from "../../assets/images/estores.png";
import eproperties from "../../assets/images/eproperties.png";
import pride from "../../assets/images/pride.png";
import eVenue from "../../assets/images/Evenue.png";

const CarouselCard = React.memo(({ title, description, iconSrc, url }) => (
  <Link target="blank" to={url} className="no-underline">
    <Card className="h-full min-w-[12rem] flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-2 items-start border-b border-gray-100 relative z-10 bg-white">
        <img
          src={iconSrc}
          alt={title}
          className="w-24 h-12 object-cover rounded-md mr-4 flex-shrink-0 shadow-sm"
        />
        <Typography
          variant="h7"
          component="div"
          className="font-semibold text-gray-800 break-words mt-2">
          {title}
        </Typography>
      </div>
      <CardContent className="bg-white flex-grow flex flex-col justify-between relative z-10">
        <Typography variant="body2" className="text-gray-600 mb-4">
          <p className="text-gray-600 text-xs line-clamp-4 mb-3">
            {description.replace(/<[^>]*>/g, "")}
          </p>
        </Typography>
        <div className="mt-2">
          <button className="px-0 text-red-600 text-sm rounded-md hover:scale-110 transition-all duration-200 flex items-center gap-2 group-hover:text-red-700">
            <span>Explore</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  </Link>
));

const AutoScrollCarousel = ({ items }) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const scrollSpeed = useRef(1);
  const duplicatedItems = [...items, ...items];

  const handleScrollReset = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const containerWidth = scrollContainer.clientWidth;
    const scrollWidth = scrollContainer.scrollWidth / 2;

    if (scrollContainer.scrollLeft >= scrollWidth - containerWidth) {
      scrollContainer.scrollLeft -= scrollWidth - containerWidth;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isInteracting) return;

    scrollContainer.scrollLeft += scrollSpeed.current;

    if (scrollContainer.scrollLeft % 100 === 0) {
      scrollSpeed.current = Math.min(scrollSpeed.current + 0.1, 2);
    }

    animationRef.current = requestAnimationFrame(startAutoScroll);
  }, [isInteracting]);

  const stopAutoScroll = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    scrollSpeed.current = 1;
  }, []);

  const scrollTo = useCallback((direction) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = scrollContainer.firstChild?.offsetWidth + 24 || 0;
    scrollContainer.scrollBy({
      left: direction === "next" ? cardWidth * 3 : -cardWidth * 3,
      behavior: "smooth",
    });
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 1500);
  }, []);

  // Touch and mouse handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setIsInteracting(true);
    stopAutoScroll();
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const touchCurrentX = e.touches[0].clientX;
    scrollRef.current.scrollLeft += touchStartX.current - touchCurrentX;
    touchStartX.current = touchCurrentX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setTimeout(() => setIsInteracting(false), 1000);
    startAutoScroll();
  };

  // Mouse drag handling
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
    setIsInteracting(true);
    stopAutoScroll();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    scrollRef.current.scrollLeft += touchStartX.current - e.clientX;
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => setIsInteracting(false), 1000);
    startAutoScroll();
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", handleScrollReset);
    startAutoScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScrollReset);
      stopAutoScroll();
    };
  }, [handleScrollReset, startAutoScroll, stopAutoScroll]);

  return (
    <div
      className="relative group"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}>
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Navigation buttons */}
      <button
        className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-xl hover:shadow-2xl hover:scale-125 transition-all duration-200 z-20 backdrop-blur-sm"
        onClick={() => scrollTo("prev")}>
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>
      <button
        className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-xl hover:shadow-2xl hover:scale-125 transition-all duration-200 z-20 backdrop-blur-sm"
        onClick={() => scrollTo("next")}>
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide py-4 gap-6 px-4"
        style={{ scrollBehavior: "smooth" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        {duplicatedItems.map((item, index) => (
          <CarouselCard key={`${item.title}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
};

const AllEssentialSite = () => {
  const carouselItems = [
    {
      title: "E-Jobs",
      description:
        " E-Jobs is a comprehensive job portal that links job seekers with employers across various industries. Whether you're looking for full-time employment, remote work, or freelance gigs, E-Jobs provides thousands of job listings tailored to your skills and experience. Employers can post vacancies, review applications, and connect with top talents through the platform. Job seekers can upload their resumes, receive interview tips, and access career development resources to enhance their employability.",
      iconSrc: eJobs,
      url: "http://ejobs.com.ng",
      category: "Technology",
    },
    {
      title: "E-Drivers",
      description:
        "E-Drivers is a dedicated job-matching platform for professional drivers seeking employment opportunities. Whether you specialize in ride-hailing, logistics, corporate driving, or chauffeur services, E-Drivers connects you with companies and individuals in need of skilled drivers. Employers can post job openings, review applications, and find the right fit for their needs. The platform also provides resources such as driving tips, licensing updates, and professional training courses to enhance career growth in the transportation industry.",
      iconSrc: eDriveIcon,
      url: "http://edrive.ng",
      category: "Technology",
    },
    {
      title: "E-News",
      description:
        "E-News is a cutting-edge digital news platform that delivers real-time updates on politics, business, entertainment, sports, and global events. Whether you’re looking for breaking news, in-depth analysis, or exclusive interviews, E-News ensures that you stay ahead with credible and well-researched journalism. Readers can customize their news feed, watch live broadcasts, and engage in discussions on trending topics.",
      iconSrc: eNews,
      url: "http://essentialnews.ng",
      category: "Entertainment",
    },
    {
      title: "E-Direct",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: edirect,
      url: "http://edirect.ng",
      category: "People",
    },
    {
      title: "E-schools",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: eSchools,
      url: "http://eschoolconnect.ng",
      category: "Academics",
    },

    {
      title: "E-Legal",
      description: "Description for E-Legal",
      iconSrc: eRegistryIcon,
      category: "Health & Wellness",
      url: "http://elegal.ng",
    },
    {
      title: "E-Root",
      description:
        "Every family has a story waiting to be told. eRoot is a revolutionary genealogy platform designed to help individuals trace their lineage, document their family history, and connect with long-lost relatives across generations. Whether you're uncovering your ancestors, building a family tree, or preserving memories for future generations, eRoot is your digital gateway to the past. E-Root provides a seamless way to explore your ancestry, offering tools to document your lineage, access historical records, and connect with relatives worldwide. From birth and marriage certificates to census data and migration records, our platform empowers you to piece together the puzzle of your family’s past. This platform helps you discover new relatives and uncover historical connections you never knew existed. You can reconnect with lost relatives or discover new ones through eRoot’s powerful search and matching system. Our platform helps users find and connect with family members worldwide, making it easier to bridge generational gaps and strengthen familial bonds. History isn’t just about names and dates—it’s about the stories, traditions, and values that define us. eRoot allows families to store cherished memories, old photographs, personal letters, and recorded stories in a secure digital archive. Future generations will have access to a treasure trove of family history, ensuring that legacies are never forgotten.",
      iconSrc: eroot,
      category: "People",
      url: "http://eroot.ng/",
    },
    {
      title: "OOSHMAIL",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: eMailIcon,
      category: "Technology",
      url: "http://ooshmail.com",
    },
    {
      title: "E-BNB",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: ebnb,
      category: "People",
      url: "http://ebnbhotel.com",
    },
    {
      title: "Companion",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: companion,
      category: "Health & Wellness",
      url: "http://ecompanionng.com",
    },
    {
      title: "E-Polls",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: ePollsIcon,
      category: "People",
      url: "/services/companion",
    },
    {
      title: "Autograph_Magazine",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: autograph,
      category: "Entertainment",
      url: "http://theautographcollections.ng",
    },
    {
      title: "Etalent",
      description:
        "This platform helps you to discover, Connect, and Showcase Your Talent. Unleash your potential with eTalent—the ultimate platform for connecting talented individuals with opportunities. Whether you’re an artist, freelancer, performer, or professional, showcase your skills, collaborate with like-minded creatives, and get discovered by top recruiters and clients worldwide. Your talent deserves the spotlight!.",
      iconSrc: etech,
      category: "Technology",
      url: "http://etalent.ng",
    },
    {
      title: "Estores",
      description:
        "E-Stores is an all-in-one online marketplace where businesses and individuals can set up virtual shops and sell their products to a global audience. Whether you’re a small business owner, an artisan, or a large retailer, E-Stores offers customizable storefronts, secure payment gateways, and integrated shipping options. Shoppers can explore a vast selection of products, from fashion and beauty to electronics and home essentials, enjoying seamless transactions and fast delivery.",
      iconSrc: estores,
      category: "People",
      url: "http://estores.ng",
    },
    {
      title: "Eproperties",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: eproperties,
      category: "People",
      url: "http://eproperties.ng",
    },
    {
      title: "ThePrideOfNigeria",
      description: "Lorem ipsum dolor sit amet consectetur.",
      iconSrc: pride,
      category: "People",
      url: "http://theprideofnigeria.ng",
    },
  ];

  return (
    <div className="p-2">
      <AutoScrollCarousel items={carouselItems} />
    </div>
  );
};

export default AllEssentialSite;
