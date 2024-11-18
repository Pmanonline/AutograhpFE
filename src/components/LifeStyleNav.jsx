import React from "react";
import { Link, useLocation } from "react-router-dom";

const LifeStyleNav = () => {
  const location = useLocation();
  const navItems = [
    { name: "LIFESTYLE", path: "/lifeStyle/home" },
    { name: "FOOD", path: "/lifeStyle/food" },
    { name: "WEDDINGS", path: "/lifeStyle/weddings" },
    { name: "PARENTING", path: "/lifeStyle/parenting" },
    { name: "TRAVEL", path: "/lifeStyle/travel" },
    { name: "HEALTH & FITNESS", path: "/lifeStyle/health-fitness" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="flex flex-wrap justify-center items-center p-4">
        <ul className="flex flex-wrap justify-center items-center space-x-2 md:space-x-8">
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.path}
                className={`
                  block px-2 py-1 text-sm font-medium
                  ${
                    location.pathname === item.path
                      ? "text-red-500 border-b-2 border-red-500"
                      : "text-gray-600 hover:text-gray-900"
                  }
                  transition-colors duration-200
                `}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default LifeStyleNav;
