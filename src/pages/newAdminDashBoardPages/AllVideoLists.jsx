import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import backendURL from "../../config";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down("sm")}`]: {
    fontSize: 12,
  },
}));

export default function AllVideoLists() {
  const navigate = useNavigate();
  const [videoPosts, setVideoPosts] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for selected category
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchPosts = useCallback(
    async (startIndex = 0) => {
      try {
        const res = await fetch(
          `${backendURL}/api/getAllVideos?startIndex=${startIndex}&limit=9${
            selectedCategory ? `&category=${selectedCategory}` : ""
          }`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (startIndex === 0) {
          setVideoPosts(data.videos);
        } else {
          setVideoPosts((prev) => [...prev, ...data.videos]);
        }
        setShowMore(data.videos.length === 9);
        setTotalVideos(data.totalVideos);
        setLastMonthPosts(data.lastMonthPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        showSnackbar(`Failed to fetch posts: ${error.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    },
    [showSnackbar, selectedCategory]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, selectedCategory]);

  const handleShowMore = () => {
    const startIndex = videoPosts.length;
    fetchPosts(startIndex);
  };

  const handleDeleteConfirmation = (postId) => {
    setPostIdToDelete(postId);
    setDeleteOpen(true);
  };

  const handleDeletePost = async () => {
    if (!postIdToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${backendURL}/api/deleteVideo/${postIdToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete video post");
      }

      setVideoPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postIdToDelete)
      );

      showSnackbar("Video post deleted successfully", "success");
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting Video post:", error);
      showSnackbar(error.message || "Failed to delete Video post", "error");
    } finally {
      setIsDeleting(false);
      setPostIdToDelete("");
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setIsLoading(true);
  };

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }

    if (videoPosts.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            No posts available
          </TableCell>
        </TableRow>
      );
    }

    return videoPosts.map((post) => (
      <TableRow key={post._id} hover>
        <StyledTableCell>
          {moment(post.updatedAt).format("MMMM D, YYYY")}
        </StyledTableCell>
        <StyledTableCell>
          {post?.image ? (
            <img
              src={`${backendURL}${post.image}`}
              alt={post.title}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.png";
              }}
            />
          ) : (
            <HiOutlineUserCircle className="w-10 h-10 text-gray-500" />
          )}
        </StyledTableCell>
        <StyledTableCell>{post.title}</StyledTableCell>
        <StyledTableCell>{post.category}</StyledTableCell>
        <StyledTableCell>
          <Button
            onClick={() => handleDeleteConfirmation(post._id)}
            variant="contained"
            color="error"
            size="small"
          >
            Delete
          </Button>
        </StyledTableCell>
        <StyledTableCell>
          <Button
            component={Link}
            to={`/DashBoard/Admin/CreateVideos/${post._id}`}
            variant="contained"
            color="primary"
            size="small"
          >
            Edit
          </Button>
        </StyledTableCell>
      </TableRow>
    ));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Button
        component={Link}
        to="/DashBoard/Admin/CreateVideos"
        startIcon={<BiMessageSquareAdd />}
        variant="outlined"
        sx={{ m: 2 }}
      >
        Create Videos
      </Button>
      <div>
        <label
          className="flex justify-end text-sm font-semibold mb-2 text-gray-600"
          htmlFor=""
        >
          Sort videos by Category
        </label>
      </div>

      <div className="flex justify-end mb-4">
        <select
          id="category"
          className="w-ful bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Short Video">Short Video</option>
          <option value="PodCasts">PodCasts</option>
          <option value="InterViews">InterViews</option>
        </select>
      </div>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date Updated</StyledTableCell>
              <StyledTableCell>Cover Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </TableContainer>

      {showMore && !isLoading && (
        <Button
          onClick={handleShowMore}
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Show more"}
        </Button>
      )}

      <Dialog
        open={deleteOpen}
        onClose={() => !isDeleting && setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this video post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to proceed
            with deleting the video post.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            startIcon={<IoClose />}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeletePost}
            startIcon={
              isDeleting ? <CircularProgress size={20} /> : <AiTwotoneDelete />
            }
            disabled={isDeleting}
            color="error"
            autoFocus
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
