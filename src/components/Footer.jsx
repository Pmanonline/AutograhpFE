import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AutographLogo from "../assets/images/autograghLogo.png";

const Footer = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const { userInfo, error, isOtpRequired, tempUserId } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  console.log(userInfo);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    if (consentGiven === null) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleCookieConsent = (consent) => {
    localStorage.setItem("cookieConsent", consent);
    setShowCookieConsent(false);
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-[#18202f] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  src={AutographLogo}
                  alt="Autograph Logo"
                  className="h-16 bg-white m-1 rounded-md px-3 "
                />
              </Link>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Connecting ideas, people, and opportunities. Stay informed with
              our latest updates.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-700 rounded-full hover:bg-gradient-to-r from-red-500 to-purple-600 transition-all duration-300 hover:scale-110">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {["Categories", "Support", "Legal"].map((section) => (
            <div key={section}>
              <h3 className="text-lg font-semibold mb-4 border-l-4 border-red-500 pl-3">
                {section}
              </h3>
              <ul className="space-y-3">
                {section === "Categories" &&
                  [
                    "LifeStyle",
                    "Fashion",
                    "Business",
                    "Society",
                    "Events",
                    "DigitalEditions",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        to={`/${item.toLowerCase()}`}
                        className="text-gray-300 hover:text-red-400 transition-colors duration-200 group">
                        <span className="group-hover:ml-2 transition-all duration-300">
                          {item}
                        </span>
                      </Link>
                    </li>
                  ))}

                {section === "Support" && (
                  <>
                    <li>
                      <Link
                        to="/contactUs"
                        className="text-gray-300 hover:text-red-400 transition-colors duration-200 group">
                        <span className="group-hover:ml-2 transition-all duration-300">
                          Contact Us
                        </span>
                      </Link>
                    </li>
                    {/* ... other support links ... */}
                  </>
                )}

                {section === "Legal" && (
                  <>
                    <li>
                      <Link
                        to="/terms"
                        className="text-gray-300 hover:text-red-400 transition-colors duration-200 group">
                        <span className="group-hover:ml-2 transition-all duration-300">
                          Terms & Conditions
                        </span>
                      </Link>
                    </li>
                    {/* ... other legal links ... */}
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookie Consent */}
        {showCookieConsent && (
          <div className="mt-8 bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 shadow-lg border border-gray-700">
            <p className="text-sm text-gray-300">
              We use cookies to enhance your experience. By continuing to visit
              this site, you agree to our use of cookies.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleCookieConsent("accepted")}
                className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200 shadow-md">
                Accept All
              </button>
              <button
                onClick={() => handleCookieConsent("declined")}
                className="bg-gray-700 px-6 py-2 rounded-full hover:bg-gray-600 transition-colors duration-200">
                Decline
              </button>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TheAutographCollections. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
