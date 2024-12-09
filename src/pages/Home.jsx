import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import moment from "moment";
import GridCards from "../components/Cards/HomeGridCard";
import LatestGridHome from "../components/Cards/LatestGridHome";
import { RotatingLines } from "react-loader-spinner";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import PopCultureCarousel from "../components/Cards/PopCultureCarousel";
import PodcastCarousel from "../components/Cards/PodcastsCarousel";
import InterviewCarousel from "../components/Cards/InterviewCarousel";
import FamilyCarousel from "../components/Cards/FamilyCarousel";
import LatestCarousel from "../components/Cards/LatestCarousel";
import EventSocietyCard from "../components/Cards/EventSocietyCard";
import backendURL from "../config";

import HeroImage from "../assets/images/favImage.png";
import CardImage from "../assets/images/cardImage.png";
import PrideOfNigeria from "../assets/images/prideOfNigeria.png";

import ShortVideosSection from "../components/Cards/ShortVideoCards";
import ContainerImage from "../assets/images/Container.png";
import AllEssentialSite from "../components/Cards/AllEssentialSite";

const documentImages = ["/path/to/document1.jpg", ,];

import buzibodyImage from "../assets/images/buzibody.png";
import companionImage from "../assets/images/companion.png";
import ancestriesImage from "../assets/images/ancestries.png";
import enewsImage from "../assets/images/enews.png";

const cardData = [
  {
    title: "Buzi Bodi",
    description:
      "Unmask the Silence that surrounds you, and boldly share your truth without fear of judgment or reprisal.",
    image: buzibodyImage,
    link: "/service-2",
  },
  {
    title: "E-companion",
    description:
      " A vibrant, dynamic background featuring images of people connecting, networking, and engaging in conversations.",
    image: companionImage,
    link: "/service-2",
  },
];

const cardData2 = [
  {
    title: "E-ancestries",
    description:
      " Connect the Dots of Your Heritage: Discover the Stories of Your Ancestors and Embrace the Rich Tapestry of Your Family History",
    image: ancestriesImage,
    link: "https://eroot.ng",
  },
  {
    title: "E-news",
    description:
      " Stay Informed, Stay Connected: Enews Brings You the Latest Updates and Insights That Matter Most!",
    image: enewsImage,
    link: "https://enews.com.ng/",
  },
];

export default function Home() {
  const [latestUpdate, setLatestUpdate] = useState([]);
  const [fashionItems, setFashionItems] = useState([]);
  const [fashionTrend, setFashionTrend] = useState([]);
  const [regularFashionItems, setRegularFashionItems] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "The Autograph";
  const typingSpeed = 150;
  const pauseDuration = 1000;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = useCallback((message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/getAllNews`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setNews(data.posts.slice(0, 4));
    } catch (error) {
      console.error("Error fetching news:", error);
      showSnackbar(`Failed to fetch news: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  const fetchFashionTrend = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendURL}/api/getAllFashion?category=TopTrend&postType=Fashion`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch fashion trends");
      }
      const data = await response.json();
      if (data && data.posts) {
        setFashionTrend(data.posts);
        console.log(data.posts);
      } else {
        setError("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching fashion trends:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    fetchFashionTrend();
  }, [fetchFashionTrend]);

  const TruncateText = ({ text, maxLength }) => {
    // Remove HTML tags and decode HTML entities
    const stripHtmlTags = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };

    const cleanText = stripHtmlTags(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength).trim() + "...";
  };
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <RotatingLines
  //         strokeColor="grey"
  //         strokeWidth="5"
  //         animationDuration="0.75"
  //         width="96"
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }

  const resetTyping = useCallback(() => {
    setText("");
  }, []);

  useEffect(() => {
    let timeoutId = null;
    let currentIndex = 0;

    const typeNextCharacter = () => {
      if (loading) {
        // Only continue if still loading
        if (currentIndex < fullText.length) {
          setText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeNextCharacter, typingSpeed);
        } else {
          // When reaching the end, pause briefly then restart
          timeoutId = setTimeout(() => {
            currentIndex = 0;
            setText("");
            // Start the next cycle
            timeoutId = setTimeout(typeNextCharacter, typingSpeed);
          }, pauseDuration);
        }
      }
    };

    // Start the animation
    typeNextCharacter();

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      resetTyping();
    };
  }, [loading, fullText, typingSpeed, resetTyping]); // Added loading dependency

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
          <h1 className="text-2xl font-light text-HeroClr">{text}</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 max-w-7xl mx-auto">
        {/* Left side - Text content */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <motion.h1
            className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your <span className="text-HeroClr">Gateway</span> to
            <br />
            Compelling
            <br />
            Stories
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover how our platform can help you create and share engaging
            narratives.
          </motion.p>
        </div>

        {/* Right side - Document images grid */}
        <div className="w-full md:w-1/2 md:grid grid-cols-1 md:grid-cols-1 gap-4">
          {documentImages.map((img, index) => (
            <motion.div
              key={index}
              className="w-full rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <img
                src={HeroImage}
                alt={`Document preview ${index + 1}`}
                className="w-full h-full object-cover mid:hidden"
              />
            </motion.div>
          ))}
        </div>
      </div>
      {/* FavCArd */}
      <section>
        {/* All essential card Carousel */}
        <div className="text-center">
          <h4 className=" font-semibold"> List of Essentia group brands</h4>
        </div>
        <AllEssentialSite />
      </section>
      {/* Grid */}
      <GridCards />
      {/* Grid */}
      {/* Advert */}
      <span className="my-[5rem] flex justify-center">
        <img className="h-32 rounded-md w-[80%]" src={ContainerImage} alt="" />
      </span>
      {/* Advert */}
      {/* ESSENTIAL BRANDS CARDS*/}
      <section className="lg:px-[8rem] Nlg:px-5  mb-[5rem]">
        <Grid container spacing={2}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  position: "relative",
                  height: 200,
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    "& .card-overlay": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                    "& .card-button": {
                      backgroundColor: "white",
                      color: "white",
                      borderColor: "white",
                    },
                  },
                }}
              >
                <Box
                  className="card-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                />
                <CardContent
                  sx={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    component="div"
                    className="font-bold text-white"
                    variant="h4"
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" className="text-white mb-4">
                    {card.description}
                  </Typography>
                  <a href={card.link} className="inline-block">
                    <button className="card-butto bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white font-bold py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-red-400   transition-all duration-300 ease-in-out">
                      Get Started
                    </button>
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
      {/* ESSENTIAL BRANDS CARDS ENDS*/}
      {/* LatestGridCard */}
      <LatestGridHome />
      {/* LatestGridCard */}
      {/* Short video section */}
      <ShortVideosSection />
      {/* Short video section */}
      {/* Pride of Nigeria */}
      <div className="container mx-auto px-4 py-[8rem]">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Card */}
          <div className="w-full md:w-1/3 bg-indigo-700 text-white rounded-lg shadow-lg p-3">
            {/* <h2 className="text-2xl font-bold mb-4">Pride Of Nigeria</h2> */}
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-green to-green bg-clip-text text-transparent">
              Pride Of Nigeria
            </h2>

            <p className="mb-6">
              Lorem ipsum dolor sit amet consectetur. Et sed et non quisque.
            </p>
            <Link to={""} target="blank">
              <button className="bg-white text-indigo-700 font-semibold py-2 px-4 rounded hover:bg-indigo-100 transition duration-300 hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="w-full md:w-2/3">
            <img
              src={PrideOfNigeria}
              alt="Nigeria Flag Representation"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* pop culture Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-0 bg-gray-100 p-2 rounded-sm">
          <h2 className="text-xl font-bold headFont bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent">
            POP CULTURE
          </h2>
        </div>
        <div className="w-full mb-5">
          <hr className="border-t border-gray-500 w-full" />
        </div>
        <span>
          <PopCultureCarousel />
        </span>
      </div>
      {/* Latest pop culture Cards ends */}
      {/* poCasts Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[8rem]">
        <div className="flex justify-between items-center mb-0 bg-gray-100 p-2 rounded-sm">
          <h2 className="text-xl font-bold headFont bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent">
            PODCASTS
          </h2>
        </div>
        <div className="w-full mb-5">
          <hr className="border-t border-gray-500 w-full" />
        </div>
        <span>
          <PodcastCarousel />
        </span>
      </div>
      {/* podCast Cards ends */}
      {/* ESSENTIAL NEWS */}
      <EssentialNews news={news} />
      {/* ESSENTIAL NEWS */}
      {/* InterViews Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-[8rem]">
        <div className="flex justify-between items-center mb-0 bg-gray-100 p-2 rounded-sm">
          <h2 className="text-xl font-bold headFont bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent">
            INTERVIEWS
          </h2>
        </div>
        <div className="w-full mb-5">
          <hr className="border-t border-gray-500 w-full" />
        </div>
        <span>
          <InterviewCarousel />
        </span>
      </div>
      {/* InterViews Cards ends */}
      {/* ESSENTIAL BRAND CARDS2 */}
      <section className="lg:px-[8rem] Nlg:px-5  mb-[5rem]">
        <Grid container spacing={2}>
          {cardData2.map((card, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  position: "relative",
                  height: 200,
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    "& .card-overlay": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                    "& .card-button": {
                      backgroundColor: "white",
                      color: "white",
                      borderColor: "white",
                    },
                  },
                }}
              >
                <Box
                  className="card-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                />
                <CardContent
                  sx={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    component="div"
                    className="font-bold text-white"
                    variant="h4"
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" className="text-white mb-4">
                    {card.description}
                  </Typography>
                  <a href={card.link} className="inline-block">
                    <button className="card-butto bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white font-bold py-2 px-4 rounded border-2 border-white hover:bg-white hover:text-red-400   transition-all duration-300 ease-in-out">
                      Get Started
                    </button>
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
      {/* ESSENTIAL BRAND CARDS2 */}
      {/* society/event CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[4rem]">
        <EventSocietyCard />
      </section>
      {/* society/event CARDS */}
    </>
  );
}

export const EssentialNews = ({ news }) => {
  return (
    <>
      {/* NEWS ARTICLES */}
      <div className=" lg:mx-[10rem] Nlg:mx-[5rem] mb-[8rem]">
        <div className="my-5 font-semibold">
          <h3>
            More From
            <Link to={"/"} target="blank">
              <span className="underline text-blue-600 mx-3 cursor-pointer hover:text-red-500">
                Essential News
              </span>
            </Link>
          </h3>
        </div>
        {/* Grid Layout */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
          {news.map((item) => (
            <Card
              key={item._id}
              className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
            >
              <CardMedia
                component="img"
                height="200"
                image={
                  item.image
                    ? `${backendURL}${item.image}`
                    : "/fallback-image.png"
                }
                alt={item.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-image.png";
                }}
                className="h-48 object-cover"
              />
              <CardContent className="flex-1 flex flex-col">
                <Typography
                  variant="subtitle1"
                  component="h2"
                  className="font-medium mb-2 line-clamp-2  hover:text-red-500"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline "
                  >
                    {item.title}
                  </a>
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  className="mt-auto"
                >
                  {moment(item.date).format("MMMM D, YYYY")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No news articles available
          </div>
        )}
      </div>
      {/* NEWS ARTICLES ENDS*/}
    </>
  );
};
