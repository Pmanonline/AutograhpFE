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

export default function CreateFamily() {
  const { familyId } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef();

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

  // Quill modules configuration with custom image handler
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleQuillImageClick,
      },
    },
  };

  // Function to handle image insertion into Quill editor
  const insertImage = useCallback((imageUrl) => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);
    editor.insertEmbed(range.index, "image", imageUrl);
    editor.setSelection(range.index + 1);
  }, []);

  // Function to handle image button click in Quill toolbar
  function handleQuillImageClick() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        // Add the file to fileInputs
        const imageKey = fileInputs.image1 ? "image2" : "image1";
        setFileInputs((prev) => ({ ...prev, [imageKey]: file }));
        setPreviews((prev) => ({ ...prev, [imageKey]: previewUrl }));
        // Insert the image into the editor
        insertImage(previewUrl);
      }
    };
  }

  // Modified handleFileChange to include insert button functionality
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFileInputs((prev) => ({ ...prev, [type]: file }));
      setPreviews((prev) => ({
        ...prev,
        [type]: previewUrl,
      }));
    }
  };

  // Add button to insert image into editor
  const handleInsertImage = (type) => {
    if (previews[type]) {
      insertImage(previews[type]);
    }
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

  const fetchFamily = useCallback(async () => {
    if (familyId) {
      try {
        const response = await fetch(
          `${backendURL}/api/getFamilyById/${familyId}`
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
        console.error("Error fetching family data:", error);
        showSnackbar("Failed to fetch family data", "error");
      }
    }
  }, [familyId]);

  useEffect(() => {
    fetchAuthors();
    fetchFamily();
  }, [fetchAuthors, fetchFamily]);

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
      const familyFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          familyFormData.append(key, value);
        }
      });

      Object.entries(fileInputs).forEach(([key, file]) => {
        if (file instanceof File) {
          familyFormData.append(key, file);
        }
      });

      const url = familyId
        ? `${backendURL}/api/updateFamily/${familyId}`
        : `${backendURL}/api/createFamily`;
      const method = familyId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: familyFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save family post");
      }

      showSnackbar(
        familyId ? "Post updated successfully" : "Post created successfully",
        "success"
      );
      navigate("/DashBoard/Admin/FamilyList");
    } catch (error) {
      console.error("Error saving family post:", error);
      showSnackbar(error.message || "Failed to save family post", "error");
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
        {familyId ? "Edit Family Post" : "Create a Family Post"}
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
            <div className="flex gap-2">
              <Button
                variant="outlined"
                onClick={() => fileInputRefs[type].current.click()}
              >
                Choose {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
              {type.startsWith("image") && previews[type] && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleInsertImage(type)}
                >
                  Insert into Content
                </Button>
              )}
            </div>
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
          ref={quillRef}
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
          modules={modules}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : familyId ? (
            "Update"
          ) : (
            "Publish"
          )}{" "}
          Family Post
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
