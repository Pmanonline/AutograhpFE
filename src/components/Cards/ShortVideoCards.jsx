import React, { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import backendURL from "../../config";

const VideoCard = ({ videoClip, image, title, isPlaying, onPlay }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg group transition-all ${
        isPlaying ? "lg:h-[350px] Nlg:h-[30rem]" : "h-64 sm:h-72 md:h-80"
      }`}
    >
      {!isPlaying ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <video
          src={videoClip}
          controls
          autoPlay
          className="w-full h-full object-cover"
        />
      )}
      {!isPlaying && (
        <div
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <Play className="text-white w-12 h-12" />
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
        {title}
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ShortVideosSection = () => {
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${backendURL}/api/getAllVideos?category=Short Video`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setAllVideos(data.videos);
        setVideos(data.videos.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handlePlayVideo = (videoId) => {
    setPlayingVideoId(videoId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-10">
      <div className="">
        <div className="flex justify-between items-center mb-0 bg-gray-100 p-2 rounded-sm">
          <h2 className="text-xl font-bold headFont bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent">
            Short Videos
          </h2>
        </div>
        <div className="w-full mb-5">
          <hr className="border-t border-gray-500 w-full" />
        </div>
        {allVideos.length > 4 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-800 font-bold hover:underline"
          >
            See All
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            videoClip={`${backendURL}${video.videoClip}`}
            image={`${backendURL}${video.image}`}
            title={video.title}
            isPlaying={playingVideoId === video._id}
            onPlay={() => handlePlayVideo(video._id)}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPlayingVideoId(null);
        }}
      >
        <h2 className="text-2xl font-bold mb-4">All Short Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allVideos.map((video) => (
            <VideoCard
              key={video._id}
              videoClip={`${backendURL}${video.videoClip}`}
              image={`${backendURL}${video.image}`}
              title={video.title}
              isPlaying={playingVideoId === video._id}
              onPlay={() => handlePlayVideo(video._id)}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ShortVideosSection;
