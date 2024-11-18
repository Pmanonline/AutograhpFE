import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { IoArrowBack } from "react-icons/io5";
import backendURL from "../../config";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function CreatVideos() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [fileInputs, setFileInputs] = useState({
    image: null,
    videoClip: null,
  });
  const [previews, setPreviews] = useState({
    image: null,
    videoClip: null,
  });

  const fileInputRefs = {
    image: useRef(null),
    videoClip: useRef(null),
  };

  const FetchVideos = useCallback(async () => {
    if (videoId) {
      try {
        const response = await fetch(
          `${backendURL}/api/getVideosById/${videoId}`
        );
        const data = await response.json();
        if (data.success) {
          setFormData(data.data);
          setPreviews({
            image: data.data.image ? `${backendURL}${data.data.image}` : null,
            videoClip: data.data.videoClip
              ? `${backendURL}${data.data.videoClip}`
              : null,
          });
        }
      } catch (error) {
        console.error("Error fetching Video data:", error);
        showSnackbar("Failed to fetch Video data", "error");
      }
    }
  }, [videoId]);

  useEffect(() => {
    FetchVideos();
  }, [FetchVideos]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFileInputs((prev) => ({ ...prev, [type]: file }));
      setPreviews((prev) => ({
        ...prev,
        [type]: URL.createObjectURL(file),
      }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const videoFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          videoFormData.append(key, value);
        }
      });

      Object.entries(fileInputs).forEach(([key, file]) => {
        if (file instanceof File) {
          videoFormData.append(key, file);
        }
      });

      const url = videoId
        ? `${backendURL}/api/updateVideo/${videoId}`
        : `${backendURL}/api/UploadVideo`;
      const method = videoId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: videoFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save Video post");
      }

      const data = await response.json();
      showSnackbar(
        videoId
          ? "Video post updated successfully"
          : "Video post created successfully",
        "success"
      );
      navigate("/DashBoard/Admin/AllVideosList");
    } catch (error) {
      console.error("Error saving Video post:", error);
      showSnackbar(error.message || "Failed to save Video post", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
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
        {videoId ? "Edit Video Post" : "Create a Video Post"}
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
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            label="Category"
            required
          >
            <MenuItem value="Short Video">Short Video</MenuItem>
            <MenuItem value="PodCasts">PodCasts</MenuItem>
            <MenuItem value="InterViews">InterViews</MenuItem>
          </Select>
        </FormControl>

        {["image", "videoClip"].map((type) => (
          <Box
            key={type}
            className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3"
          >
            <input
              type="file"
              accept={type === "image" ? "image/*" : "video/*"}
              onChange={(e) => handleFileChange(e, type)}
              ref={fileInputRefs[type]}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              onClick={() => fileInputRefs[type].current.click()}
            >
              Choose {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
            {previews[type] &&
              (type === "image" ? (
                <img
                  src={previews[type]}
                  alt={`preview ${type}`}
                  className="w-20 h-20 object-cover"
                />
              ) : (
                <video
                  src={previews[type]}
                  className="w-20 h-20 object-cover"
                  controls
                />
              ))}
          </Box>
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : videoId ? (
            "Update"
          ) : (
            "Publish"
          )}{" "}
          Video Post
        </Button>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
