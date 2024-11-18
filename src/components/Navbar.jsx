import React, { useState, useEffect } from "react";
import { Navbar, Button } from "flowbite-react";
import NewsletterSubscription from "./tools/NewLetterSignUp2";
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
  const { loading, userInfo, error, isOtpRequired, tempUserId } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Updated navLinks array with URLs
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

  const allNavLinks = [
    { name: "Home", url: "/" },
    { name: "Society", url: "/Society" },
    { name: "Events", url: "/Events" },
    { name: "Digital Editions", url: "/DigitalEditions" },
    { name: "Business", url: "/business" },
    { name: "Entertainment", url: "/entertainment" },
    { name: "Fashion", url: "/fashion" },
    { name: "Lifestyle", url: "/lifeStyle/home" },
    { name: "Celebrities", url: "/celebrities" },
    { name: "Shopping", url: "/shopping" },
    { name: "Awards", url: "/Awards" },
  ];

  const navLinkClasses =
    "text-gray-700 hover:text-red-500 px-4 py-2 transition duration-200 transform hover:scale-105";
  const activeLinkClasses = "text-red-600 font-bold";

  const isActiveLink = (url) => {
    // Special handling for lifestyle and its sub-routes
    if (url === "/lifeStyle/home") {
      return location.pathname.startsWith("/lifeStyle");
    }
    // Default handling for other routes
    return location.pathname === url || location.pathname.startsWith(`${url}/`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top row with centered navigation */}
      <div
        className={`bg-white py-2 transition-all duration-300 ${
          isSticky ? "-translate-y-full" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  src={AutographLogo}
                  alt="Autograph Logo"
                  className="h-16"
                />
              </Link>
            </div>

            {/* Centered Navigation */}
            <div className="hidden md:flex justify-center items-center md:space-x-6 Nlg:space-x-5 lg:whitespace-nowrap text-sm font-semibold uppercase">
              {navLinks2.map((link) => (
                <Link
                  key={link.url}
                  to={link.url}
                  className={`${navLinkClasses} ${
                    isActiveLink(link.url) ? activeLinkClasses : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Login/Logout Button */}
            <div className="hidden md:flex justify-end">
              {!userInfo ? (
                <Link to="/login">
                  <button className="px-4 py-2 text-sm bg-HeroCl text-black border rounded-lg hover:border-2 hover:border-HeroClr hover:bg-transparent hover:text-HeroClr">
                    Login
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-HeroCl text-black border rounded-lg hover:border-2 hover:border-HeroClr hover:bg-transparent hover:text-HeroClr"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <Navbar
        fluid
        rounded
        className={`bg-white shadow transition-all duration-300 ${
          isSticky ? "sticky top-0 z-30 " : ""
        }`}
      >
        <Navbar.Brand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white md:hidden">
            {/* Hidden on larger screens */}
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2">
          <Link to="/contactUs">
            <button className="hidden p-1 text-sm px-2 md:block bg-HeroClr text-white rounded-lg hover:border-2 hover:border-HeroClr hover:bg-transparent hover:text-HeroClr  uppercase">
              Contact Us
            </button>
          </Link>
          <Navbar.Toggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </Navbar.Toggle>
        </div>

        {/* Navbar Collapse */}
        <Navbar.Collapse className="md:flex md:flex-row md:items-center md:w-auto">
          <div className="flex flex-col md:flex-row md:space-x-6 Nlg:space-x-5 lg:whitespace-nowrap Nlg:text-sm font-semibold uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className={`${navLinkClasses} ${
                  isActiveLink(link.url) ? activeLinkClasses : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </Navbar.Collapse>

        {/* Updated Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header - Fixed at top */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <img
                    src={AutographLogo}
                    alt="Autograph Logo"
                    className="w-32 h-12"
                  />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-red-600 transition duration-200 transform hover:scale-110"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Scrollable Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="px-4 space-y-2">
                {allNavLinks.map((link) => (
                  <Link
                    key={link.url}
                    to={link.url}
                    className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-red-500 rounded-lg transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Action Buttons - Fixed at bottom */}
            <div className="p-4 border-t border-gray-200">
              <div className="space-y-3">
                {!userInfo ? (
                  <Link
                    to="/login"
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-HeroClr text-white hover:bg-red-600">
                      Login
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-HeroClr text-white hover:bg-red-600"
                  >
                    Logout
                  </Button>
                )}
                <Link
                  to="/contactUs"
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full border border-HeroClr text-HeroClr hover:bg-gray-50">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default ResponsiveNavbar;
