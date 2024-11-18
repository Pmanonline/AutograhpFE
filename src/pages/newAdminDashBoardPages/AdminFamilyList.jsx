import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import moment from "moment";
import backendURL from "../../config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down("sm")}`]: {
    fontSize: 12,
  },
}));

export default function FamilyList() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
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
          `${backendURL}/api/getAllFamily?startIndex=${startIndex}&limit=9`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data.posts)) {
          throw new Error("API didn't return an array of posts");
        }

        if (startIndex === 0) {
          setUserPosts(data.posts);
        } else {
          setUserPosts((prev) => [...prev, ...data.posts]);
        }
        setShowMore(data.posts.length === 9);
      } catch (error) {
        console.error("Error fetching posts:", error);
        showSnackbar(`Failed to fetch posts: ${error.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    },
    [showSnackbar]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleShowMore = () => {
    const startIndex = userPosts.length;
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
        `${backendURL}/api/deleteFamily/${postIdToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete family post");
      }

      // Update local state by removing the deleted post
      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postIdToDelete)
      );

      showSnackbar("Family post deleted successfully", "success");
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting family post:", error);
      showSnackbar(error.message || "Failed to delete family post", "error");
    } finally {
      setIsDeleting(false);
      setPostIdToDelete("");
    }
  };

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={9} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }

    if (userPosts.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={9} align="center">
            No posts available
          </TableCell>
        </TableRow>
      );
    }

    return userPosts.map((post) => (
      <TableRow key={post._id} hover>
        <StyledTableCell>
          {moment(post.updatedAt).format("MMMM D, YYYY")}
        </StyledTableCell>
        <StyledTableCell>
          <Link to={`/post/${post.slug}`}>
            {post?.image1 ? (
              <img
                src={`${backendURL}${post.image1}`}
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
          </Link>
        </StyledTableCell>
        <StyledTableCell>
          <Link to={`/post/${post.slug}`} className="hover:underline">
            {post.title.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 50) +
              (post.title.length > 50 ? "..." : "")}
          </Link>
        </StyledTableCell>
        <StyledTableCell>{post.category}</StyledTableCell>
        <StyledTableCell>{post.authorId.name}</StyledTableCell>
        <StyledTableCell>
          {post.videoTag.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 50) +
            (post.videoTag.length > 50 ? "..." : "")}
        </StyledTableCell>
        <StyledTableCell>{post.likes?.length || 0}</StyledTableCell>
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
            to={`/DashBoard/Admin/CreateFamily/${post._id}`}
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
        to="/DashBoard/Admin/CreateFamily"
        startIcon={<BiMessageSquareAdd />}
        variant="outlined"
        sx={{ m: 2 }}
      >
        Create Family
      </Button>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date Updated</StyledTableCell>
              <StyledTableCell>Post Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Video Tag</StyledTableCell>
              <StyledTableCell>Likes</StyledTableCell>
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
          Are you sure you want to delete this post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to proceed
            with deleting the post.
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
