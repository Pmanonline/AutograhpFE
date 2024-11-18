// import React, { useEffect, useState, useCallback } from "react";
// import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import { Document, Page } from "react-pdf";
// import { Eye } from "lucide-react";
// import backendURL from "../config";
// import moment from "moment";

// const StyledCard = styled(Card)(({ theme }) => ({
//   position: "relative",
//   height: "400px",
//   width: "100%",
//   cursor: "pointer",
//   overflow: "hidden",
//   backgroundColor: theme.palette.background.paper,
//   transition: "all 0.3s ease-in-out",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: theme.shadows[10],
//     "& .overlay": {
//       opacity: 1,
//     },
//   },
// }));

// const PDFPreview = styled(Box)({
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
//   backgroundColor: "#f5f5f5",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// const Overlay = styled(Box)({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0, 0, 0, 0.7)",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   opacity: 0,
//   transition: "opacity 0.3s ease-in-out",
//   padding: "1rem",
//   color: "white",
//   textAlign: "center",
// });

// const CategoryBadge = styled(Box)({
//   position: "absolute",
//   top: "1rem",
//   right: "1rem",
//   padding: "0.25rem 0.75rem",
//   backgroundColor: "#FF5733",
//   color: "white",
//   borderRadius: "4px",
//   fontWeight: "bold",
//   zIndex: 1,
// });

// const DigitalEdition = () => {
//   const [digitalEditions, setDigitalEditions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchDigitalEditions = useCallback(async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/getAllDigitalEditions`);
//       if (!res.ok) throw new Error("Failed to fetch");
//       const data = await res.json();
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

// const handleCardClick = (slug) => {
//   navigate(`/digital-edition/${slug}`);
// };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Typography variant="h4" className="mb-8 text-center font-bold">
//         Digital Editions
//       </Typography>
//       <Grid container spacing={4}>
//         {digitalEditions.map((edition) => (
//           <Grid item xs={12} sm={6} md={4} key={edition._id}>
//             <StyledCard onClick={() => handleCardClick(edition.slug)}>
//               <PDFPreview>
//                 <iframe
//                   src={`${backendURL}${edition.image1}#toolbar=0&navpanes=0`}
//                   title={edition.title}
//                   width="100%"
//                   height="100%"
//                   style={{ border: "none" }}
//                 />
//               </PDFPreview>
//               <Overlay className="overlay">
//                 <Eye size={32} className="mb-4" />
//                 <Typography variant="h6" className="mb-2 font-bold">
//                   {edition.title}
//                 </Typography>
//                 <Typography variant="body2" className="mb-2">
//                   By {edition.authorId.name}
//                 </Typography>
//                 <Typography variant="body2" className="mb-2">
//                   {/* {new Date(edition.createdAt).toLocaleDateString()} */}
//                   {moment(edition.updatedAt).format("MMMM D, YYYY")}
//                 </Typography>
//                 <Typography variant="body2">
//                   {edition.likes?.length || 0} Likes
//                 </Typography>
//               </Overlay>
//             </StyledCard>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default DigitalEdition;

import React, { useEffect, useState, useCallback } from "react";
import { Eye, Heart, Calendar, User } from "lucide-react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import backendURL from "../config";
import moment from "moment";

const DigitalEdition = () => {
  const [digitalEditions, setDigitalEditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchDigitalEditions = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/getAllDigitalEditions`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setDigitalEditions(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDigitalEditions();
  }, [fetchDigitalEditions]);

  const handleCardClick = (slug) => {
    navigate(`/digital-edition/${slug}`); // Navigate to the single page using slug
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Digital Editions</h1>
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
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center space-y-4 border border-white border-r-btColour border-l-HeroClr border-t-black cursor-pointer group-hover:rounded-3xl group-hover:p-2  group-hover:bg-red-500">
                {/* Icon */}
                <Eye size={32} className="text-white mb-4" />

                {/* Title */}
                <h3 className="text-2xl font-bold text-white text-center">
                  {edition.title}
                </h3>

                {/* Author */}
                <div className="flex items-center space-x-2 text-white/90">
                  <span className="text-xs"> Published by:</span>
                  <span>
                    {" "}
                    <User size={16} />
                  </span>
                  <span>{edition.authorId.name}</span>
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
    </div>
  );
};

export default DigitalEdition;
