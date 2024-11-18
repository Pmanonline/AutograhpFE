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
import moment from "moment";
import backendURL from "../../config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down("sm")}`]: {
    fontSize: 12,
  },
}));

export default function DigitalEditionsList() {
  const navigate = useNavigate();
  const [digitalEditions, setDigitalEditions] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [editionIdToDelete, setEditionIdToDelete] = useState("");
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

  const fetchDigitalEditions = useCallback(
    async (startIndex = 0) => {
      try {
        const res = await fetch(
          `${backendURL}/api/getAllDigitalEditions?startIndex=${startIndex}&limit=9`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        if (!Array.isArray(data)) {
          throw new Error("API didn't return an array of digital editions");
        }
        if (startIndex === 0) {
          setDigitalEditions(data);
        } else {
          setDigitalEditions((prev) => [...prev, ...data]);
        }
        setShowMore(data.length === 9);
      } catch (error) {
        console.error("Error fetching digital editions:", error);
        showSnackbar(
          `Failed to fetch digital editions: ${error.message}`,
          "error"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [showSnackbar]
  );

  useEffect(() => {
    fetchDigitalEditions();
  }, [fetchDigitalEditions]);

  const handleShowMore = () => {
    const startIndex = digitalEditions.length;
    fetchDigitalEditions(startIndex);
  };

  const handleDeleteConfirmation = (editionId) => {
    setEditionIdToDelete(editionId);
    setDeleteOpen(true);
  };

  const handleDeleteDigitalEdition = async () => {
    if (!editionIdToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${backendURL}/api/deleteDigitalEdition/${editionIdToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to delete digital edition"
        );
      }

      // Update local state by removing the deleted digital edition
      setDigitalEditions((prevEditions) =>
        prevEditions.filter((edition) => edition._id !== editionIdToDelete)
      );

      showSnackbar("Digital edition deleted successfully", "success");
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting digital edition:", error);
      showSnackbar(
        error.message || "Failed to delete digital edition",
        "error"
      );
    } finally {
      setIsDeleting(false);
      setEditionIdToDelete("");
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

    if (digitalEditions.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={9} align="center">
            No digital editions available
          </TableCell>
        </TableRow>
      );
    }

    return digitalEditions.map((edition) => (
      <TableRow key={edition._id} hover>
        <StyledTableCell>
          {moment(edition.updatedAt).format("MMMM D, YYYY")}
        </StyledTableCell>
        <StyledTableCell>
          <a
            href={`${backendURL}${edition.image1}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            Preview Cover
          </a>
        </StyledTableCell>
        <StyledTableCell>
          <Link
            to={`/digital-edition/${edition.slug}`}
            className="hover:underline"
          >
            {edition.title.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 50) +
              (edition.title.length > 50 ? "..." : "")}
          </Link>
        </StyledTableCell>
        <StyledTableCell>{edition.category}</StyledTableCell>
        <StyledTableCell>{edition.authorId.name}</StyledTableCell>
        <StyledTableCell>
          {edition.image2.map((url, index) => (
            <a
              key={index}
              href={`${backendURL}${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 block"
            >
              Flipbook PDF {index + 1}
            </a>
          ))}
        </StyledTableCell>
        <StyledTableCell>{edition.likes?.length || 0}</StyledTableCell>
        <StyledTableCell>
          <Button
            onClick={() => handleDeleteConfirmation(edition._id)}
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
            to={`/DashBoard/Admin/CreateDigitalEDT/${edition._id}`}
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
        to="/DashBoard/Admin/CreateDigitalEDT"
        variant="outlined"
        sx={{ m: 2 }}
      >
        Create Digital Edition
      </Button>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date Updated</StyledTableCell>
              <StyledTableCell>Cover PDF</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Flipbook PDFs</StyledTableCell>
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
          Are you sure you want to delete this digital edition?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to proceed
            with deleting the digital edition.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteDigitalEdition}
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
