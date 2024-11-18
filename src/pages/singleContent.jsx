import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import moment from "moment";
import ReactPlayer from "react-player";
import { Play, X, Maximize, Minimize, Volume2, VolumeX } from "lucide-react";
import { ChevronRight, Calendar, Eye, ArrowRight } from "lucide-react";
import { Twitter, Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
import SocialMediaFollow from "../components/SocialMediaFollow";
import axios from "axios";
import { ThumbUp, Edit, Delete } from "@mui/icons-material";
import { IoMdClose } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  MenuItem,
  Menu,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import { ImageOutlined as ImageIcon } from "@mui/icons-material";
import { ThumbsUp, MoreVertical } from "lucide-react";
import backendURL from "../config";

// Create an Alert component that uses MuiAlert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VideoSection = ({
  videoUrl,
  thumbnailUrl,
  title,
  videoTag,
  videoContent,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(0);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  // console.log(videoTag, videoContent);

  // Construct full video URL
  const fullVideoUrl = videoUrl
    ? videoUrl.startsWith("http")
      ? videoUrl
      : `${backendURL}${videoUrl}`
    : null;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
      setError("Fullscreen mode is not supported on this device");
    }
  };

  const handleError = (err) => {
    console.error("Video playback error:", err);
    setError("Failed to load video. Please try again.");
    setIsPlaying(false);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`my-8 ${
          isFullscreen
            ? "fixed inset-0 z-50 bg-black"
            : "rounded-lg mb-6 w-full md:w-1/2"
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-lg group transition-all
          ${
            isFullscreen
              ? "w-full h-full"
              : "aspect-video w-full max-w-4xl mx-auto"
          }`}
        >
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white z-20">
              <p className="text-center p-4">{error}</p>
            </div>
          )}

          {!isPlaying && !loaded && (
            <div className="absolute inset-0 z-10">
              <img
                src={thumbnailUrl}
                alt={title || "Video thumbnail"}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="relative w-full h-full">
            <ReactPlayer
              ref={playerRef}
              url={fullVideoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={isMuted}
              onError={handleError}
              onBuffer={() => console.log("buffering")}
              onBufferEnd={() => console.log("buffering end")}
              onProgress={({ loaded }) => setLoaded(loaded)}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                    playsInline: true,
                  },
                },
              }}
              style={{ position: "absolute", top: 0, left: 0 }}
            />

            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    {isPlaying ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    onClick={handleMute}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>
                  <span className="text-white text-sm font-medium truncate">
                    {title || "Video"}
                  </span>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize className="w-6 h-6" />
                  ) : (
                    <Maximize className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
                  <Play className="text-white w-8 h-8" />
                </div>
              </button>
            )}
          </div>
        </div>
        <div className="m-1">
          <span className="text-sm font-black text-gray-500">VideoClip:</span>{" "}
          <span>{videoTag}</span>
        </div>
        <Divider sx={{ mb: 3 }} />
        {/* videoContent */}
      </div>
      <span>{videoContent}</span>
    </>
  );
};

const SingleContent = () => {
  const { slug } = useParams();

  const [fetchedData, setfetchedData] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postType, setPostType] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTag, setVideoTag] = useState("");
  const [videoContent, setVideoContent] = useState("");
  const [images, setImages] = useState([]);
  console.log("Array of images", images);

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(fetchedData.title);
    let shareUrl;

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  const fetchFashionTrend = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendURL}/api/getFashionBySlug/${slug}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setfetchedData(data);
      setPostType(data?.postType || ""); // Ensure postType is never undefined
      setVideoTag(data?.videoTag);
      setVideoContent(data?.videoContent);
      setVideoUrl(data?.videoClip || "");
      setImages(data?.image2 || []);

      // After getting the postType, fetch related posts
      if (data?.postType) {
        await fetchRelatedPosts(data.postType);
      }
    } catch (error) {
      console.error("Error fetching fashion trends:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Modified fetchRelatedPosts to accept postType as parameter
  const fetchRelatedPosts = async (currentPostType) => {
    if (!currentPostType) {
      console.warn("No postType provided for fetching related posts");
      return;
    }

    try {
      const response = await fetch(
        `${backendURL}/api/getAllFashion?postType=${currentPostType}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch related posts");
      }

      const data = await response.json();

      if (data && data.posts) {
        // Filter out the current post and limit to a reasonable number
        const filteredPosts = data.posts
          .filter((post) => post.slug !== slug)
          .slice(0, 5); // Limit to 5 related posts

        setRelatedArticles(filteredPosts);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching related posts:", error);
      setError(error.message);
    }
  };

  // Only need to call fetchFashionTrend on mount or when slug changes
  useEffect(() => {
    fetchFashionTrend();
  }, [fetchFashionTrend]);
  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Hero Section (keeping the same as before) */}
      <div className="relative h-[100vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backendURL}${fetchedData.image1})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative h-full flex flex-col justify-end pb-16 px-4 md:px-8 lg:px-16">
          <div className="mb-4">
            <a
              // href="/society"
              className="inline-block bg-red-600 text-white text-sm px-4 py-1 rounded-sm hover:bg-red-700 transition-colors"
              style={{
                opacity: 0.8,
              }}
            >
              {fetchedData.postType}
            </a>
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl"
            style={{
              opacity: 0.4,
            }}
          >
            {fetchedData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
            <div
              style={{
                opacity: 0.4,
              }}
              className="flex items-center"
            >
              <a
                href="#"
                className="text-white hover:text-gray-300 flex items-center"
              >
                <Avatar
                  src={`${backendURL}${fetchedData?.authorId?.image}`}
                  alt={fetchedData?.authorId?.name}
                  sx={{ width: 30, height: 30 }}
                >
                  {!fetchedData?.authorId?.image && <ImageIcon />}
                </Avatar>
                <span className="ml-2">{fetchedData?.authorId?.name}</span>
              </a>
            </div>

            <div
              style={{
                opacity: 0.4,
              }}
              className="flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {moment(fetchedData.createdAt).format("MMMM D, YYYY")}
              </span>
            </div>
            <div
              style={{
                opacity: 0.4,
              }}
              className="flex items-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              <span>
                {fetchedData.views ? `${fetchedData.views} views` : "212 views"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* New Two-Column Layout */}
      <div className="sm:container mx-auto px-4 py-3   ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Column */}
          <main className="lg:w-[70%]">
            {/* HEADER */}
            <div className="">
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 mb-2">
                <div className="flex items-center">
                  <a
                    href="#"
                    className="text-white hover:text-gray-300 flex items-center"
                  >
                    <Avatar
                      src={`${backendURL}${fetchedData?.authorId?.image}`}
                      alt={fetchedData?.authorId?.name}
                      sx={{ width: 30, height: 30 }}
                    >
                      {!fetchedData?.authorId?.image && <ImageIcon />}
                    </Avatar>
                    <a href="#" className="text-black font-semibold ml-2">
                      {fetchedData?.authorId?.name}
                    </a>
                  </a>
                </div>
                <div className="flex items-center text-gray-800">
                  <Calendar className="w-4 h-4 mr-2" />
                  {moment(fetchedData.createdAt).format("MMMM D, YYYY")}
                </div>
                <div className="flex items-center text-gray-800">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>
                    {fetchedData.views
                      ? `${fetchedData.views} views`
                      : "212 views"}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 mb-6 max-w-4xl">
                {fetchedData.title}
              </h1>
            </div>
            {/* HEADER */}

            {/* BODY */}

            <ReactQuill
              value={fetchedData.content || ""}
              readOnly={true}
              theme="bubble"
              className="quill-editor mb-6" // Add a custom class
            />
            {/* BODY */}

            {/* GAllery Image2 */}
            <ImageGallery images={images} />
            {/* GAllery Image2 */}

            {/* VIDEO SECTION */}
            {videoUrl && (
              <VideoSection
                videoUrl={videoUrl}
                thumbnailUrl={`${backendURL}${fetchedData.image1}`}
                title={fetchedData.title}
                videoTag={videoTag}
                videoContent={videoContent}
              />
            )}
            {/* VIDEO SECTION */}

            {/* Share buttons */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 2 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Share this:
              </Typography>
              <IconButton
                onClick={() => handleShare("twitter")}
                size="small"
                sx={{ mr: 1 }}
              >
                <Twitter fontSize="small" sx={{ color: "#1DA1F2" }} />
              </IconButton>
              <IconButton
                onClick={() => handleShare("facebook")}
                size="small"
                sx={{ mr: 1 }}
              >
                <Facebook fontSize="small" sx={{ color: "#4267B2" }} />
              </IconButton>
              <IconButton
                onClick={() => handleShare("linkedin")}
                size="small"
                sx={{ mr: 1 }}
              >
                <LinkedIn fontSize="small" sx={{ color: "#0077b5" }} />
              </IconButton>
              <IconButton onClick={() => handleShare("whatsapp")} size="small">
                <WhatsApp fontSize="small" sx={{ color: "#25D366" }} />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 3 }} />

            {/* COMMENT SECTION */}
            <CommentBox />
            {/* COMMENT SECTION */}
          </main>

          {/* Related Articles Sidebar */}
          <aside className="lg:w-[30%]">
            <div className="top-4 ">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-black to-red-500 text-transparent bg-clip-text">
                Related Articles
              </h2>

              <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4 mx-auto">
                {relatedArticles.map((article) => (
                  <div
                    key={article._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={`${backendURL}${article.image1}`}
                      alt={article.image1}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-red-500 cursor-pointer">
                        <Link to={`/content/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-2" />
                          {moment(article.createdAt).format("MMMM D, YYYY")}
                        </div>
                      </div>
                      <Link
                        to={`/content/${article.slug}`}
                        className="mt-4 inline-flex items-center text-red-600 hover:text-red-700"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              {/* Social Media Follow */}
              <div className="mx-auto">
                <SocialMediaFollow />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SingleContent;

const CommentBox = () => {
  const { slug } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Get user from Redux store
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;
  console.log(comments);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (slug) {
      setPage(1);
      fetchComments(1, true);
    }
  }, [slug]);

  const fetchComments = async (pageNum, reset = false) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${backendURL}/api/getPostComments/${slug}?page=${pageNum}`
      );

      const newComments = response.data.comments.map((comment) => ({
        ...comment,
        userId: comment.userId || {
          _id: null,
          username: "Anonymous",
          image: null,
        },
      }));

      setComments((prev) => (reset ? newComments : [...prev, ...newComments]));
      setHasMoreComments(response.data.hasMore);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error loading comments",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !userInfo?._id) {
      setLoginModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${backendURL}/api/createComment`, {
        content: newComment,
        slug: slug,
        userId: userId,
      });

      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment("");
      setSnackbar({
        open: true,
        message: "Comment posted successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error posting comment",
        severity: "error",
      });
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!userId) {
      setLoginModalOpen(true);
      return;
    }

    try {
      console.log("Sending like request for comment:", commentId);
      console.log("With user ID:", userInfo._id);

      const response = await axios.put(
        `${backendURL}/api/likeComment/${commentId}`,
        { userId: userInfo._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Like response:", response.data);

      if (response.data) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, ...response.data }
              : comment
          )
        );

        setSnackbar({
          open: true,
          message: "Comment liked successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error liking comment:", error);

      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error liking comment",
        severity: "error",
      });
    }
  };

  const handleEditComment = async () => {
    if (!editedComment.trim() || !selectedComment || !userInfo?._id) return;

    try {
      const response = await axios.put(
        `${backendURL}/api/editComment/${selectedComment._id}`,
        { content: editedComment }
      );

      const updatedComment = {
        ...response.data,
        userId: selectedComment.userId,
      };

      setComments(
        comments.map((comment) =>
          comment._id === selectedComment._id ? updatedComment : comment
        )
      );
      setEditDialogOpen(false);
      setSelectedComment(null);
      setEditedComment("");
      setSnackbar({
        open: true,
        message: "Comment updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error updating comment",
        severity: "error",
      });
    }
  };

  const handleDeleteComment = async () => {
    if (!selectedComment || !userInfo?._id) return;

    try {
      await axios.delete(
        `${backendURL}/api/deleteComment/${selectedComment._id}`
      );
      setComments(
        comments.filter((comment) => comment._id !== selectedComment._id)
      );
      setIsDeleteDialogOpen(false);
      setSelectedComment(null);
      setSnackbar({
        open: true,
        message: "Comment deleted successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error deleting comment",
        severity: "error",
      });
    }
  };

  const handleViewMoreComments = () => {
    const nextPage = page + 1;
    fetchComments(nextPage);
    setPage(nextPage);
  };

  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
    setEditedComment(comment.content);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditDialog = () => {
    handleMenuClose();
    setEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = () => {
    handleMenuClose();
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="mt-8 border mr-7 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>

        {/* Comment Input Section */}
        <div className="mb-8">
          <div className="w-full mb-4">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onClick={() => !userInfo && setLoginModalOpen(true)}
            ></textarea>
          </div>
          <button
            onClick={handleCommentSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            disabled={!newComment.trim()}
          >
            Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={comment._id}>
              <div className="p-4 hover:bg-gray-50 transition-colors rounded-lg">
                <div className="flex items-start space-x-4">
                  <Avatar
                    src={
                      comment?.userId?.picture
                        ? `${comment?.userId?.picture}`
                        : `${comment.userId?.picture}`
                    }
                    alt={comment?.userId?.username || "Deleted User"}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Typography className="font-semibold">
                          {comment?.userId?.username || "Anonymous"}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-gray-500 text-sm"
                        >
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </Typography>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLikeComment(comment._id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            comment.likes?.includes(userInfo?._id)
                              ? "text-blue-600"
                              : "text-gray-500 hover:text-blue-600"
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">
                            {comment.likes?.length || 0}
                          </span>
                        </button>
                        {comment?.userId?._id === userInfo?._id && (
                          <IconButton
                            size="small"
                            onClick={(event) => handleMenuOpen(event, comment)}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </IconButton>
                        )}
                      </div>
                    </div>
                    <Typography className="mt-2">{comment.content}</Typography>
                  </div>
                </div>
              </div>
              {index < comments.length - 1 && <Divider className="my-4" />}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreComments && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleViewMoreComments}
              className="text-blue-700 hover:text-blue-800 border border-blue-700 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More Comments"}
            </button>
          </div>
        )}
      </div>
      <span></span>
      {/* Login Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          loginModalOpen ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">Login Required</h3>
            <p className="text-gray-600 mb-6">
              Please log in to interact with comments. Join our community to
              share your thoughts!
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setLoginModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
              <Link
                to="/login"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Other dialogs remain the same */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={handleOpenEditDialog}
          className="text-gray-700 hover:bg-gray-100"
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleOpenDeleteDialog}
          className="text-red-600 hover:bg-red-50"
        >
          Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setEditDialogOpen(false)}
            className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleEditComment}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            disabled={!editedComment.trim()}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => setIsDeleteDialogOpen(false)}
            className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteComment}
            className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const displayedImages = images.slice(0, 3);
  const remainingImages = images.length - 3;

  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % images.length
        : (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="relative">
      <div className="relative">
        {images.length === 1 && (
          <img
            src={`${backendURL}${images[0]}`}
            alt="Single Image"
            className="object-cover  h-80 cursor-pointer rounded w-[50%]"
            onClick={() => handleImageClick(0)}
          />
        )}

        {images.length === 2 && (
          <div className="grid grid-cols-2 gap-2 w-[50%]">
            {displayedImages.map((image, index) => (
              <img
                key={index}
                src={`${backendURL}${image}`}
                alt={`Image ${index}`}
                className="object-cover w-full h-80 cursor-pointer rounded"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        )}

        {images.length >= 3 && (
          <div className="grid grid-cols-2 gap-2 w-[50%]">
            <div
              className="relative col-span-1 h-80 cursor-pointer"
              onClick={() => handleImageClick(0)}
            >
              <img
                src={`${backendURL}${displayedImages[0]}`}
                alt="Main Image"
                className="object-cover w-full h-full rounded"
              />
              {images.length > 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 text-white text-xl font-bold">
                  +{remainingImages}
                </div>
              )}
            </div>

            <div className="grid grid-rows-2 gap-2 h-80">
              {displayedImages.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={`${backendURL}${image}`}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => handleImageClick(index + 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-md max-w-4xl w-full overflow-auto max-h-[100vh] shadow-lg">
            <div className="sticky top-0 w-full bg-white flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold text-gray-700 ml-4">
                Gallery
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 text-red-500 border-red-500 border rounded hover:text-white hover:bg-red-600"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Images Displayed in Single Blocks */}
            <div className="flex flex-col space-y-4 p-4">
              <div className="flex flex-col items-center">
                <div className="my-5 w-[30rem] h-[30rem] shadow-gray-900 shadow-sm bg-gray-100 flex items-center justify-center">
                  <img
                    src={`${backendURL}${images[currentImageIndex]}`}
                    alt={`Expanded Image ${currentImageIndex}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>

              {/* Image Navigation */}
              {images.length > 1 && (
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigateImage("prev")}
                    className="p-2 bg-gray-200 rounded-full"
                  >
                    ←
                  </button>
                  <span className="text-gray-600">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => navigateImage("next")}
                    className="p-2 bg-gray-200 rounded-full"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
