import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoArrowBack } from "react-icons/io5";
import backendURL from "../../config";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function CreateLatest() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    authorId: "",
    videoTag: "",
    videoContent: "",
  });

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [fileInputs, setFileInputs] = useState({
    image1: null,
    image2: null,
    videoClip: null,
  });
  const [previews, setPreviews] = useState({
    image1: null,
    image2: null,
    videoClip: null,
  });

  const fileInputRefs = {
    image1: useRef(null),
    image2: useRef(null),
    videoClip: useRef(null),
  };

  const fetchAuthors = useCallback(async () => {
    try {
      const res = await fetch(`${backendURL}/api/getAllAuthors`);
      const data = await res.json();
      setAuthors(data.map((author) => ({ id: author._id, name: author.name })));
    } catch (error) {
      console.error("Failed to fetch authors:", error);
      showSnackbar("Failed to fetch authors", "error");
    }
  }, []);

  const fetchPost = useCallback(async () => {
    if (postId) {
      try {
        const response = await fetch(
          `${backendURL}/api/getLatestById/${postId}`
        );
        const data = await response.json();
        if (data.success) {
          setFormData(data.data);
          setPreviews({
            image1: data.data.image1
              ? `${backendURL}${data.data.image1}`
              : null,
            image2: data.data.image2
              ? `${backendURL}${data.data.image2}`
              : null,
            videoClip: data.data.videoClip
              ? `${backendURL}${data.data.videoClip}`
              : null,
          });
        }
      } catch (error) {
        console.error("Error fetching latest post data:", error);
        showSnackbar("Failed to fetch latest post data", "error");
      }
    }
  }, [postId]);

  useEffect(() => {
    fetchAuthors();
    fetchPost();
  }, [fetchAuthors, fetchPost]);

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
      const postFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          postFormData.append(key, value);
        }
      });

      Object.entries(fileInputs).forEach(([key, file]) => {
        if (file instanceof File) {
          postFormData.append(key, file);
        }
      });

      // Debug FormData contents
      for (let pair of postFormData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const url = postId
        ? `${backendURL}/api/updateLatest/${postId}`
        : `${backendURL}/api/createLatest`;
      const method = postId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: postFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save latest post");
      }

      const data = await response.json();
      showSnackbar(
        postId
          ? "Latest post updated successfully"
          : "Latest post created successfully",
        "success"
      );
      navigate("/DashBoard/Admin/LatestList");
    } catch (error) {
      console.error("Error saving latest post:", error);
      showSnackbar(error.message || "Failed to save latest post", "error");
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
        {postId ? "Edit Latest Post" : "Create Latest Post"}
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
          <InputLabel id="author-select-label">Author</InputLabel>
          <Select
            labelId="author-select-label"
            id="authorId"
            name="authorId"
            value={formData.authorId}
            onChange={handleInputChange}
            label="Author"
            required
          >
            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          select
          label="Category"
          required
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          fullWidth
        >
          <MenuItem value="uncategorized">Select a category</MenuItem>
          <MenuItem value="Regular">Regular</MenuItem>
          <MenuItem value="TopTrend">TopTrend</MenuItem>
          <MenuItem value="Recommended">Recommended</MenuItem>
        </TextField>
        <TextField
          label="Video Tag"
          id="videoTag"
          name="videoTag"
          value={formData.videoTag}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Video Content"
          id="videoContent"
          name="videoContent"
          value={formData.videoContent}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
        />

        {["image1", "image2", "videoClip"].map((type) => (
          <Box
            key={type}
            className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3"
          >
            <input
              type="file"
              accept={type.startsWith("image") ? "image/*" : "video/*"}
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
              (type.startsWith("image") ? (
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

        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : postId ? (
            "Update"
          ) : (
            "Publish"
          )}{" "}
          Latest Post
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
