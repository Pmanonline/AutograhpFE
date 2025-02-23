// import React, { useState, useEffect } from "react";
// import { Navbar, Button } from "flowbite-react";
// import NewsletterSubscription from "./tools/NewLetterSignUp2";
// import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
// import { FaUserCircle, FaTimes, FaBars } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../features/auth/authSlice";
// import AutographLogo from "../assets/images/autograghLogo.png";

// const ResponsiveNavbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, userInfo, error, isOtpRequired, tempUserId } = useSelector(
//     (state) => state.auth
//   );

//   const handleLogout = () => {
//     try {
//       dispatch(logoutUser());
//       navigate("/");
//       window.location.reload();
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   // Updated navLinks array with URLs
//   const navLinks = [
//     { name: "Home", url: "/" },
//     { name: "Society", url: "/Society" },
//     { name: "Events", url: "/Events" },
//     { name: "Digital Editions", url: "/DigitalEditions" },
//     { name: "Business", url: "/business" },
//     { name: "Entertainment", url: "/entertainment" },
//   ];
//   const navLinks2 = [
//     { name: "Fashion", url: "/fashion" },
//     { name: "Lifestyle", url: "/lifeStyle/home" },
//     { name: "Celebrities", url: "/celebrities" },
//     { name: "Shopping", url: "/shopping" },
//     { name: "Awards", url: "/Awards" },
//   ];

//   const allNavLinks = [
//     { name: "Home", url: "/" },
//     { name: "Society", url: "/Society" },
//     { name: "Events", url: "/Events" },
//     { name: "Digital Editions", url: "/DigitalEditions" },
//     { name: "Business", url: "/business" },
//     { name: "Entertainment", url: "/entertainment" },
//     { name: "Fashion", url: "/fashion" },
//     { name: "Lifestyle", url: "/lifeStyle/home" },
//     { name: "Celebrities", url: "/celebrities" },
//     { name: "Shopping", url: "/shopping" },
//     { name: "Awards", url: "/Awards" },
//   ];

//   const navLinkClasses =
//     "text-white hover:text-red-500 px-4 py-2 transition duration-200 transform hover:scale-105";
//   const activeLinkClasses = "text-red-600 font-bold";

//   const isActiveLink = (url) => {
//     // Special handling for lifestyle and its sub-routes
//     if (url === "/lifeStyle/home") {
//       return location.pathname.startsWith("/lifeStyle");
//     }
//     // Default handling for other routes
//     return location.pathname === url || location.pathname.startsWith(`${url}/`);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY;
//       setIsSticky(offset > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       {/* Top row with centered navigation */}
//       <div
//         className={`bg-[#1e2836] py-2  transition-all duration-300 ${
//           isSticky ? "-translate-y-full" : ""
//         }`}>
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-3 items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <Link to="/">
//                 <img
//                   src={AutographLogo}
//                   alt="Autograph Logo"
//                   className="h-16"
//                 />
//               </Link>
//             </div>

//             {/* Centered Navigation */}
//             <div className="hidden md:flex justify-center items-center md:space-x-6 Nlg:space-x-5 lg:whitespace-nowrap text-sm  font-semibold uppercase">
//               {navLinks2.map((link) => (
//                 <Link
//                   key={link.url}
//                   to={link.url}
//                   className={`${navLinkClasses} ${
//                     isActiveLink(link.url) ? activeLinkClasses : ""
//                   }`}>
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             {/* Login/Logout Button */}
//             <div className="hidden md:flex justify-end">
//               {!userInfo ? (
//                 <Link to="/login">
//                   <button className="px-4 py-2 text-sm bg-HeroCl text-black border rounded-lg hover:border-2 hover:border-HeroClr hover:bg-transparent hover:text-HeroClr">
//                     Login
//                   </button>
//                 </Link>
//               ) : (
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 text-sm bg-HeroCl text-black border rounded-lg hover:border-2 hover:border-HeroClr hover:bg-transparent hover:text-HeroClr">
//                   Logout
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main navbar */}
//       <Navbar
//         fluid
//         rounded
//         className={`bg-[#1e2836] shadow transition-all duration-300 ${
//           isSticky ? "sticky top-0 z-30 " : ""
//         }`}>
//         <Navbar.Brand as={Link} to="/">
//           <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white md:hidden">
//             {/* Hidden on larger screens */}
//           </span>
//         </Navbar.Brand>

//         <div className="flex md:order-2">
//           <Link to="/contactUs">
//             <button className="hidden p-1 text-sm px-2 md:block bg-HeroClr text-white rounded-lg hover:border-2 hover:border-HeroClr hover:bg-transparent hover:text-HeroClr  uppercase">
//               Contact Us
//             </button>
//           </Link>
//           <Navbar.Toggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <FaTimes /> : <FaBars />}
//           </Navbar.Toggle>
//         </div>

//         {/* Navbar Collapse */}
//         <Navbar.Collapse className="md:flex md:flex-row md:items-center md:w-auto">
//           <div className="flex flex-col md:flex-row md:space-x-6 Nlg:space-x-5 lg:whitespace-nowrap Nlg:text-sm font-semibold uppercase">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.url}
//                 to={link.url}
//                 className={`${navLinkClasses} ${
//                   isActiveLink(link.url) ? activeLinkClasses : ""
//                 }`}>
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </Navbar.Collapse>

//         {/* Updated Mobile Menu */}
//         <div
//           className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
//             isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
//           }`}
//           onClick={() => setIsMenuOpen(false)}>
//           <div
//             className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
//               isMenuOpen ? "translate-x-0" : "-translate-x-full"
//             }`}
//             onClick={(e) => e.stopPropagation()}>
//             {/* Mobile Menu Header - Fixed at top */}
//             <div className="p-4 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <Link to="/" onClick={() => setIsMenuOpen(false)}>
//                   <img
//                     src={AutographLogo}
//                     alt="Autograph Logo"
//                     className="w-32 h-12"
//                   />
//                 </Link>
//                 <button
//                   onClick={() => setIsMenuOpen(false)}
//                   className="text-gray-600 hover:text-red-600 transition duration-200 transform hover:scale-110">
//                   <FaTimes className="text-2xl" />
//                 </button>
//               </div>
//             </div>

//             {/* Scrollable Navigation Links */}
//             <div className="flex-1 overflow-y-auto py-4">
//               <nav className="px-4 space-y-2">
//                 {allNavLinks.map((link) => (
//                   <Link
//                     key={link.url}
//                     to={link.url}
//                     className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-red-500 rounded-lg transition duration-200"
//                     onClick={() => setIsMenuOpen(false)}>
//                     {link.name}
//                   </Link>
//                 ))}
//               </nav>
//             </div>

//             {/* Action Buttons - Fixed at bottom */}
//             <div className="p-4 border-t border-gray-200">
//               <div className="space-y-3">
//                 {!userInfo ? (
//                   <Link
//                     to="/login"
//                     className="block w-full"
//                     onClick={() => setIsMenuOpen(false)}>
//                     <Button className="w-full bg-HeroClr text-white hover:bg-red-600">
//                       Login
//                     </Button>
//                   </Link>
//                 ) : (
//                   <Button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full bg-HeroClr text-white hover:bg-red-600">
//                     Logout
//                   </Button>
//                 )}
//                 <Link
//                   to="/contactUs"
//                   className="block w-full"
//                   onClick={() => setIsMenuOpen(false)}>
//                   <Button className="w-full border border-HeroClr text-HeroClr hover:bg-gray-50">
//                     Contact Us
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Navbar>
//     </>
//   );
// };

// export default ResponsiveNavbar;

// import React, { useState, useEffect } from "react";
// import { Navbar, Button } from "flowbite-react";
// import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
// import { FaUserCircle, FaTimes, FaBars } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../features/auth/authSlice";
// import AutographLogo from "../assets/images/autograghLogo.png";

// const ResponsiveNavbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/");
//     window.location.reload();
//   };

//   const navLinks = [
//     { name: "Home", url: "/" },
//     { name: "Society", url: "/Society" },
//     { name: "Events", url: "/Events" },
//     { name: "Digital Editions", url: "/DigitalEditions" },
//     { name: "Business", url: "/business" },
//     { name: "Entertainment", url: "/entertainment" },
//   ];

//   const navLinks2 = [
//     { name: "Fashion", url: "/fashion" },
//     { name: "Lifestyle", url: "/lifeStyle/home" },
//     { name: "Celebrities", url: "/celebrities" },
//     { name: "Shopping", url: "/shopping" },
//     { name: "Awards", url: "/Awards" },
//   ];

//   const navLinkClasses = `
//     relative px-4 py-2 text-white/90 hover:text-white transition-all
//     duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2
//     after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300
//     hover:after:w-full hover:after:left-0
//   `;

//   const activeLinkClasses = `
//     text-white after:content-[''] after:absolute after:bottom-0 after:left-0
//     after:w-full after:h-[2px] after:bg-red-500
//   `;

//   const isActiveLink = (url) => {
//     if (url === "/lifeStyle/home") {
//       return location.pathname.startsWith("/lifeStyle");
//     }
//     return location.pathname === url || location.pathname.startsWith(`${url}/`);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY;
//       setIsSticky(offset > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {/* Top Navigation Row */}
//       <div
//         className={`bg-[#0d1219] py-3 transition-all duration-300 ${isSticky ? "-translate-y-full opacity-0" : "opacity-100"}`}>
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-3 items-center">
//             <Link to="/">
//               <img src={AutographLogo} alt="Logo" className="h-14" />
//             </Link>

//             <div className="hidden md:flex justify-center space-x-6">
//               {navLinks2.map((link) => (
//                 <Link
//                   key={link.url}
//                   to={link.url}
//                   className={`${navLinkClasses} ${isActiveLink(link.url) ? activeLinkClasses : ""}`}>
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             <div className="hidden md:flex justify-end">
//               {!userInfo ? (
//                 <Link
//                   to="/login"
//                   className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
//                   Login
//                 </Link>
//               ) : (
//                 <button
//                   onClick={handleLogout}
//                   className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors duration-300">
//                   Logout
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation Bar */}
//       <Navbar
//         fluid
//         className={`
//           bg-[#0d1219]/95 backdrop-blur-sm border-b border-white/10
//           transition-all duration-300 ${isSticky ? "sticky top-0 z-50 shadow-xl" : ""}
//         `}>
//         <Navbar.Brand as={Link} to="/" className="md:hidden">
//           <img src={AutographLogo} alt="Logo" className="h-12" />
//         </Navbar.Brand>

//         <div className="flex md:order-2 space-x-4">
//           <Link
//             to="/contactUs"
//             className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
//             Contact Us
//           </Link>
//           <Navbar.Toggle
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-white hover:text-red-500 transition-colors duration-300">
//             {isMenuOpen ? (
//               <FaTimes className="text-2xl" />
//             ) : (
//               <FaBars className="text-2xl" />
//             )}
//           </Navbar.Toggle>
//         </div>

//         <Navbar.Collapse className="md:space-x-6">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.url}
//               to={link.url}
//               className={`${navLinkClasses} ${isActiveLink(link.url) ? activeLinkClasses : ""}`}>
//               {link.name}
//             </NavLink>
//           ))}
//         </Navbar.Collapse>

//         {/* Mobile Menu */}
//         <div
//           className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 ${
//             isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
//           }`}
//           onClick={() => setIsMenuOpen(false)}>
//           <div
//             className={`absolute top-0 left-0 w-80 h-full bg-[#0d1219] shadow-xl transform transition-transform duration-300 ${
//               isMenuOpen ? "translate-x-0" : "-translate-x-full"
//             }`}
//             onClick={(e) => e.stopPropagation()}>
//             <div className="p-6 border-b border-white/10">
//               <div className="flex justify-between items-center">
//                 <img src={AutographLogo} alt="Logo" className="h-10" />
//                 <button
//                   onClick={() => setIsMenuOpen(false)}
//                   className="text-white/50 hover:text-red-500 transition-colors duration-300">
//                   <FaTimes className="text-2xl" />
//                 </button>
//               </div>
//             </div>

//             <div className="h-[calc(100%-160px)] overflow-y-auto p-6 space-y-4">
//               {[...navLinks, ...navLinks2].map((link) => (
//                 <Link
//                   key={link.url}
//                   to={link.url}
//                   className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-300"
//                   onClick={() => setIsMenuOpen(false)}>
//                   {link.name}
//                 </Link>
//               ))}
//             </div>

//             <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-[#0d1219]">
//               <div className="space-y-4">
//                 {!userInfo ? (
//                   <Link
//                     to="/login"
//                     className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-md transition-colors duration-300">
//                     Login
//                   </Link>
//                 ) : (
//                   <button
//                     onClick={handleLogout}
//                     className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md transition-colors duration-300">
//                     Logout
//                   </button>
//                 )}
//                 <Link
//                   to="/contactUs"
//                   className="block w-full border border-white/20 hover:border-red-500 text-white text-center py-3 rounded-md transition-colors duration-300">
//                   Contact Us
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Navbar>
//     </>
//   );
// };

// export default ResponsiveNavbar;

import React, { useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaTimes, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import AutographLogo from "../assets/images/autograghLogo.png";

const ResponsiveNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Society", url: "/Society" },
    { name: "Events", url: "/Events" },
    { name: "Digital Editions", url: "/DigitalEditions" },
    { name: "Business", url: "/business" },
    { name: "Entertainment", url: "/entertainment" },
  ];

  const navLinks2 = [
    { name: "Fashion", url: "/fashion" },
    { name: "Lifestyle", url: "/lifeStyle/home" },
    { name: "Celebrities", url: "/celebrities" },
    { name: "Shopping", url: "/shopping" },
    { name: "Awards", url: "/Awards" },
  ];

  const navLinkClasses = `
    relative px-4 py-2 text-white/90 hover:text-white transition-all
    duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2
    after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300
    hover:after:w-full hover:after:left-0
  `;

  const activeLinkClasses = `
    text-white after:content-[''] after:absolute after:bottom-0 after:left-0
    after:w-full after:h-[2px] after:bg-red-500
  `;

  const isActiveLink = (url) => {
    if (url === "/lifeStyle/home") {
      return location.pathname.startsWith("/lifeStyle");
    }
    return location.pathname === url || location.pathname.startsWith(`${url}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add body overflow control when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Top Navigation Row */}
      <div
        className={`bg-[#1f242c] py-1 transition-all duration-300 mid:hidden ${
          isSticky ? "-translate-y-full opacity-0" : "opacity-100"
        }`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 items-center">
            <Link to="/">
              <img src={AutographLogo} alt="Logo" className="h-14" />
            </Link>

            <div
              className="hidden text-sm
             md:flex justify-center space-x-6">
              {navLinks2.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  className={`${navLinkClasses} ${
                    isActiveLink(link.url) ? activeLinkClasses : ""
                  }`}>
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex justify-end">
              {!userInfo ? (
                <Link
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 text-white py-1  px-3 rounded-md transition-colors duration-300 text-sm">
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-1  px-3 rounded-md transition-colors duration-300 text-sm">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`
          bg-[#1f242c]  backdrop-blur-sm border-b border-white/10
          transition-all duration-300 ${isSticky ? "sticky top-0 z-40 shadow-xl" : ""}
        ${isMenuOpen ? "hidden" : ""}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="md:hidden">
              <Link to="/">
                <img src={AutographLogo} alt="Logo" className="h-12" />
              </Link>
            </div>

            <div className="hidden md:flex space-x-6 text-sm">
              {navLinks.map((link) => (
                <NavLink
                  key={link.url}
                  to={link.url}
                  className={`${navLinkClasses} ${
                    isActiveLink(link.url) ? activeLinkClasses : ""
                  }`}>
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/contactUs"
                className=" hidden  md:block hover:text-red-600 hover:font-semibold bg-gray-700 hover:bg-gray-600 text-white py-1  px-3 rounded-md transition-colors duration-300 text-sm">
                Contact Us
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-red-500 transition-colors duration-300">
                {isMenuOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Ensure it's outside the nav component */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div
            className="fixed top-0 left-0 w-80 h-full bg-[#0d1219] shadow-xl transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <img src={AutographLogo} alt="Logo" className="h-10" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/50 hover:text-red-500 transition-colors duration-300">
                  <FaTimes className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="h-[calc(100%-160px)] overflow-y-auto p-6 space-y-4">
              {[...navLinks, ...navLinks2].map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-[#0d1219]">
              <div className="space-y-4">
                {!userInfo ? (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-md transition-colors duration-300">
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md transition-colors duration-300">
                    Logout
                  </button>
                )}
                <Link
                  to="/contactUs"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full border border-white/20 hover:border-red-500 text-white text-center py-3 rounded-md transition-colors duration-300">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveNavbar;
