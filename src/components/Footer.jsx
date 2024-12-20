import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

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
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Categories</h3>
            <ul className="space-y-2">
              <li className=" hover:text-red-300">
                <Link to="/lifeStyle/home">LifeStyle</Link>
              </li>
              <li className=" hover:text-red-300">
                <Link to="/fashion">Fashion</Link>
              </li>
              <li className=" hover:text-red-300">
                <Link to="/business">Business</Link>
              </li>
              <li className=" hover:text-red-300">
                <Link to="/Society">Society</Link>
              </li>
              <li className=" hover:text-red-300">
                <Link to="/Events">Events</Link>
              </li>
              <li className=" hover:text-red-300">
                <Link to="/DigitalEditions">DigitalEditions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li className=" hover:text-red-300">
                <Link to="/contactUs">Contact Us</Link>
              </li>
              <li className=" hover:text-red-300">
                <Link target="_blank" to="https://essentialgroup.ng/">
                  Essential Group
                </Link>
              </li>
              {userInfo?.role == "admin" ? (
                <li>
                  <Link to="/DashBoard">DashBoard</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li className=" hover:text-red-300">
                <Link to="/terms">Terms and Conditions</Link>
              </li>
              <li className=" hover:text-red-300">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 ">
              <a
                className="hover:text-red-300"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                className="hover:text-red-300"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                className="hover:text-red-300"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {showCookieConsent && (
          <div className="mt-8 bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <p className="text-sm">Our site uses essential cookies to work.</p>
            <div className="space-x-4">
              <button
                onClick={() => handleCookieConsent("accepted")}
                className="bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => handleCookieConsent("declined")}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Decline All
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
