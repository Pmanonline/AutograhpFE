import React from "react";
import Diamond from "../assets/images/diamond.png";
import awardImage1 from "../assets/images/awardImage1.png";
import awardImage2 from "../assets/images/awardImage2.png";
import awardImage3 from "../assets/images/awardImage3.png";
import awardImages from "../assets/images/awardImages.png";
import { Link } from "react-router-dom";
const truncateContent = (content, maxLength = 100) => {
  if (!content) return "";
  const strippedContent = content.replace(/<[^>]*>/g, "");
  return strippedContent.length > maxLength
    ? `${strippedContent.substring(0, maxLength)}...`
    : strippedContent;
};

const awardData = [
  {
    id: 1,
    image: awardImage1,
    awardTitle: "The Pride Of LAgos Awards",
    description:
      "Ornallis Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor qua eros tempus lacinia. Nam bi",
    link: "https://theprideofnigeria.ng/",
  },
  {
    id: 2,
    image: awardImages,
    awardTitle: "The Pride Of Abuja Awards",
    description:
      "Ornallis Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor qua eros tempus lacinia. Nam bi",
    link: "https://theprideofnigeria.ng/",
  },
  {
    id: 3,
    image: awardImages,

    awardTitle: "The Pride Of Porthacourt Awards",
    description:
      "Ornallis Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor qua eros tempus lacinia. Nam bi",
    link: "https://theprideofnigeria.ng/",
  },
  {
    id: 3,
    image: awardImage3,
    awardTitle: "The Pride Of Ibadan Awards",
    description:
      "Ornallis Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor qua eros tempus lacinia. Nam bi",
    link: "https://theprideofnigeria.ng/",
  },
  {
    id: 3,
    image: awardImages,

    awardTitle: "The Pride Of Enugu Awards",
    description:
      "Ornallis Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Curabitur tempor qua eros tempus lacinia. Nam bi",
    link: "https://theprideofnigeria.ng/",
  },
];

const AwardCard = ({ image, link, awardTitle, description }) => {
  return (
    <Link target="_blank" to={link}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col sm:flex-row">
        <img
          src={image}
          alt="award image"
          className="w-full sm:w-1/2 h-48 sm:h-auto object-cover max-h-[15rem] hover:scale-105 transition duration-300 ease-in-out"
        />
        <div className="p-4 flex flex-col justify-between w-full sm:w-1/2">
          <div className="text-3xl font-bold  p-2 rounded-lg mb-2 hover:text-HeroClr">
            {awardTitle}
          </div>
          <p className="text-gray-600 text-sm hover:text-HeroClr">
            {" "}
            {truncateContent(description)}
          </p>

          <div>
            <Link target="_blank" to={link}>
              <button className=" mid:mt-2 p-1 text-sm px-2 md:block bg-HeroClr text-white rounded-lg hover:border-2 hover:border-HeroClr hover:bg-transparent hover:text-HeroClr  uppercase">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

const AwardCards = () => {
  return (
    <>
      <div className="md:p-16 mid:p-8 max-w-7xl mx-auto">
        <div>
          <h2 className="text-5xl font-medium mb-8 text-center text-green">
            PRIDE OF NIGERIA<br></br>
            <div className="flex justify-center gap-7">
              <img src={Diamond} alt="" className="w-4 h-4 mt-3" />
              <span className="text-green font-medium text-2xl">AWARD</span>
              <img src={Diamond} alt="" className="w-4 h-4 mt-3" />
            </div>
          </h2>
        </div>
        {/* subHeading */}
        <h3 className="mid:mx-5 mid:mt-5">
          Pride of Nigeria’s regional awards celebrate incredible heroes
          changing lives in their communities and beyond. Just like Pride of
          Nigeria, the winners go to extraordinary lengths to help others,
          display immense courage in the face of extreme challenges, and always
          put others first, no matter what adversity they face themselves. Click
          the links below to meet the winners, relive uplifting awards moments,
          and find out how to nominate.
        </h3>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[6rem]">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-red-900 bg-clip-text text-transparent headFont">
            Pride Of Nigeria Awards
          </h2>
          <div className="w-full mb-5">
            <hr className="border-t border-gray-500 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {awardData.map((award) => (
            <AwardCard
              key={award.id}
              image={award.image}
              name={award.name}
              awardTitle={award.awardTitle}
              description={award.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AwardCards;
