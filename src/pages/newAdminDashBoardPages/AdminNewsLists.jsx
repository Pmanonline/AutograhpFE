import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
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

export default function AdminNewsLists() {
  const [news, setNews] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    lastMonthPosts: 0,
  });
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

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/getAllNews`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setNews(data.posts);
      setStats({
        totalPosts: data.totalPosts,
        lastMonthPosts: data.lastMonthPosts,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      showSnackbar(`Failed to fetch news: ${error.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleDeleteConfirmation = (postId) => {
    setPostIdToDelete(postId);
    setDeleteOpen(true);
  };

  const handleDeletePost = async () => {
    if (!postIdToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${backendURL}/api/deleteNews/${postIdToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete news");
      }

      setNews((prevNews) =>
        prevNews.filter((item) => item._id !== postIdToDelete)
      );
      showSnackbar("News deleted successfully", "success");
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting news:", error);
      showSnackbar(error.message || "Failed to delete news", "error");
    } finally {
      setIsDeleting(false);
      setPostIdToDelete("");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
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

    if (news.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            No news available
          </TableCell>
        </TableRow>
      );
    }

    return news.map((item) => (
      <TableRow key={item._id} hover>
        <StyledTableCell>
          {moment(item.date).format("MMMM D, YYYY")}
        </StyledTableCell>
        <StyledTableCell>
          {item?.image ? (
            <img
              src={`${backendURL}${item.image}`}
              alt={item.title}
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
        <StyledTableCell>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {item.title}
          </a>
        </StyledTableCell>
        <StyledTableCell>{item.slug}</StyledTableCell>
        <StyledTableCell>
          <Button
            onClick={() => handleDeleteConfirmation(item._id)}
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
            to={`/DashBoard/Admin/CreateNews/${item._id}`}
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
      <div className="flex justify-between items-center p-4">
        <Button
          component={Link}
          to="/DashBoard/Admin/CreateNews"
          startIcon={<BiMessageSquareAdd />}
          variant="outlined"
        >
          Create News
        </Button>
        <div className="text-sm">
          <div>Total News: {stats.totalPosts}</div>
          <div>Last Month: {stats.lastMonthPosts}</div>
        </div>
      </div>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Slug</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteOpen}
        onClose={() => !isDeleting && setDeleteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this news item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to proceed
            with deleting this news item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            startIcon={<IoClose />}
            disabled={isDeleting}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeletePost}
            startIcon={<AiTwotoneDelete />}
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
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
