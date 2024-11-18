import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { IoArrowBack } from "react-icons/io5";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
import backendURL from "../../config";

export default function CreateNews() {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [fileInput, setFileInput] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (newsId) {
        try {
          const response = await fetch(
            `${backendURL}/api/getNewsById/${newsId}`
          );
          const data = await response.json();
          if (data.success) {
            setFormData({
              title: data.data.title,
              url: data.data.url,
              date: new Date(data.data.date).toISOString().split("T")[0],
            });
            if (data.data.image) {
              setPreview(`${backendURL}${data.data.image}`);
            }
          }
        } catch (error) {
          console.error("Error fetching news:", error);
          showSnackbar("Failed to fetch news data", "error");
        }
      }
    };

    fetchNews();
  }, [newsId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInput(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newsFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        newsFormData.append(key, value);
      });

      if (fileInput) {
        newsFormData.append("image", fileInput);
      }

      const url = newsId
        ? `${backendURL}/api/updateNews/${newsId}`
        : `${backendURL}/api/createNews`;
      const method = newsId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: newsFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save news");
      }

      showSnackbar(
        newsId ? "News updated successfully" : "News created successfully",
        "success"
      );
      navigate("/DashBoard/Admin/EssentialNews");
    } catch (error) {
      console.error("Error saving news:", error);
      showSnackbar(error.message || "Failed to save news", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="p-3 max-w-3xl mx-auto min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
      >
        <IoArrowBack className="mr-2" size={24} />
        Back
      </button>

      <h1 className="text-center text-3xl my-7 font-semibold">
        {newsId ? "Edit News" : "Create News"}
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          required
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="URL"
          required
          id="url"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Date"
          type="date"
          required
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Box className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current.click()}
          >
            Choose Image
          </Button>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 object-cover"
            />
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className="h-12"
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : newsId ? (
            "Update"
          ) : (
            "Publish"
          )}{" "}
          News
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
