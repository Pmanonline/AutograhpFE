// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   MenuItem,
//   Box,
//   Select,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Snackbar,
// } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
// import backendURL from "../../config";
// import { IoArrowBack } from "react-icons/io5";

// const Alert = React.forwardRef((props, ref) => (
//   <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// ));

// const DigitalEditionForm = () => {
//   const { digitalEditionId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     category: "",
//     authorId: "",
//   });
//   const [authors, setAuthors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [fileInputs, setFileInputs] = useState({
//     image1: null,
//     image2: [],
//   });
//   const [previews, setPreviews] = useState({
//     image1: null,
//     image2: [],
//   });

//   const fileInputRefs = {
//     image1: useRef(null),
//     image2: useRef(null),
//   };

//   const fetchAuthors = useCallback(async () => {
//     try {
//       const res = await fetch(`${backendURL}/api/getAllAuthors`);
//       const data = await res.json();
//       setAuthors(data.map((author) => ({ id: author._id, name: author.name })));
//     } catch (error) {
//       console.error("Failed to fetch authors:", error);
//       showSnackbar("Failed to fetch authors", "error");
//     }
//   }, []);

//   const fetchDigitalEdition = useCallback(async () => {
//     if (digitalEditionId) {
//       try {
//         const response = await fetch(
//           `${backendURL}/api/getDigitalEditionById/${digitalEditionId}`
//         );
//         const data = await response.json();
//         if (data.success) {
//           setFormData({
//             title: data.data.title,
//             category: data.data.category,
//             authorId: data.data.authorId._id,
//           });
//           setPreviews({
//             image1: data.data.image1
//               ? `${backendURL}${data.data.image1}`
//               : null,
//             image2: data.data.image2.map((url) => `${backendURL}${url}`),
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching digital edition data:", error);
//         showSnackbar("Failed to fetch digital edition data", "error");
//       }
//     }
//   }, [digitalEditionId]);

//   useEffect(() => {
//     fetchAuthors();
//     fetchDigitalEdition();
//   }, [fetchAuthors, fetchDigitalEdition]);

//   const handleFileChange = (e, type) => {
//     const files =
//       type === "image2" ? Array.from(e.target.files) : [e.target.files[0]];
//     const newPreviews = {};

//     if (files.length > 0) {
//       if (type === "image1") {
//         // Image validation for image1
//         const isValidImage = files[0].type.startsWith("image/");
//         if (!isValidImage) {
//           showSnackbar(
//             "Please select only image files (JPEG, PNG, etc.)",
//             "error"
//           );
//           return;
//         }
//         newPreviews.image1 = URL.createObjectURL(files[0]);
//         setFileInputs((prev) => ({ ...prev, [type]: files[0] }));
//       } else {
//         // PDF validation for image2
//         const isValidPDF = files.every(
//           (file) =>
//             file.type === "application/pdf" ||
//             file.name.toLowerCase().endsWith(".pdf")
//         );
//         if (!isValidPDF) {
//           showSnackbar("Please select only PDF files for flipbook", "error");
//           return;
//         }
//         newPreviews.image2 = files.map((file) => URL.createObjectURL(file));
//         setFileInputs((prev) => ({ ...prev, [type]: files }));
//       }
//       setPreviews((prev) => ({ ...prev, ...newPreviews }));
//     }
//   };

//   useEffect(() => {
//     return () => {
//       Object.values(previews).forEach((url) => {
//         if (url && (typeof url === "string" ? url.startsWith("blob:") : true)) {
//           if (typeof url === "string") {
//             URL.revokeObjectURL(url);
//           } else {
//             url.forEach(URL.revokeObjectURL);
//           }
//         }
//       });
//     };
//   }, [previews]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const digitalEditionFormData = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value !== null && value !== undefined && value !== "") {
//           digitalEditionFormData.append(key, value);
//         }
//       });

//       if (fileInputs.image1 instanceof File) {
//         digitalEditionFormData.append("image1", fileInputs.image1);
//       }
//       if (fileInputs.image2.length > 0) {
//         fileInputs.image2.forEach((file) => {
//           digitalEditionFormData.append("image2", file);
//         });
//       }

//       const url = digitalEditionId
//         ? `${backendURL}/api/updateDigitalEdition/${digitalEditionId}`
//         : `${backendURL}/api/createDigitalEdition`;
//       const method = digitalEditionId ? "PUT" : "POST";

//       const response = await fetch(url, {
//         method,
//         body: digitalEditionFormData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save digital edition");
//       }

//       const data = await response.json();
//       showSnackbar(
//         digitalEditionId
//           ? "Digital Edition updated successfully"
//           : "Digital Edition created successfully",
//         "success"
//       );
//       navigate("/DashBoard/Admin/DigialEditions");
//     } catch (error) {
//       console.error("Error saving digital edition:", error);
//       showSnackbar(error.message || "Failed to save digital edition", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   return (
//     <>
//       <Box className="p-3 max-w-3xl mx-auto min-h-screen">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
//         >
//           <IoArrowBack className="mr-2" size={24} />
//           Back
//         </button>
//         <h1 className="text-center text-3xl my-7 font-semibold">
//           {digitalEditionId ? "Edit Digital Edition" : "Create Digital Edition"}
//         </h1>

// <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//   <TextField
//     label="Title"
//     required
//     id="title"
//     name="title"
//     value={formData.title}
//     onChange={handleInputChange}
//     fullWidth
//   />
//   <FormControl fullWidth>
//     <InputLabel id="author-select-label">Author</InputLabel>
//     <Select
//       labelId="author-select-label"
//       id="authorId"
//       name="authorId"
//       value={formData.authorId}
//       onChange={handleInputChange}
//       label="Author"
//       required
//     >
//       {authors.map((author) => (
//         <MenuItem key={author.id} value={author.id}>
//           {author.name}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
//   <TextField
//     select
//     label="Category"
//     required
//     id="category"
//     name="category"
//     value={formData.category}
//     onChange={handleInputChange}
//     fullWidth
//   >
//     <MenuItem value="uncategorized">Select a category</MenuItem>
//     <MenuItem value="Regular">Regular</MenuItem>
//     <MenuItem value="TopTrend">TopTrend</MenuItem>
//     <MenuItem value="Recommended">Recommended</MenuItem>
//   </TextField>

//   <Box className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
//     <input
//       type="file"
//       accept="image/*"
//       onChange={(e) => handleFileChange(e, "image1")}
//       ref={fileInputRefs.image1}
//       style={{ display: "none" }}
//     />
//     <Button
//       variant="outlined"
//       onClick={() => fileInputRefs.image1.current.click()}
//     >
//       Choose Cover Image
//     </Button>
//     {previews.image1 && (
//       <img
//         src={previews.image1}
//         alt="Cover preview"
//         className="h-20 w-auto object-contain"
//       />
//     )}
//   </Box>

//   <Box className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
//     <input
//       type="file"
//       accept="application/pdf"
//       multiple
//       onChange={(e) => handleFileChange(e, "image2")}
//       ref={fileInputRefs.image2}
//       style={{ display: "none" }}
//     />
//     <Button
//       variant="outlined"
//       onClick={() => fileInputRefs.image2.current.click()}
//     >
//       Choose Flipbook PDFs
//     </Button>
//     {previews.image2.length > 0 && (
//       <div className="flex gap-2">
//         {previews.image2.map((url, index) => (
//           <a
//             key={index}
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
//           >
//             Flipbook PDF {index + 1}
//           </a>
//         ))}
//       </div>
//     )}
//   </Box>

//   <ResponsiveFashionButton
//     loading={loading}
//     digitalEditionId={digitalEditionId}
//     handleSubmit={handleSubmit}
//   />
// </form>
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity={snackbar.severity}
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </>
//   );
// };

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
import backendURL from "../../config";
import { IoArrowBack } from "react-icons/io5";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const DigitalEditionForm = () => {
  const { digitalEditionId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    authorId: "",
  });
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
    autoHideDuration: 2000,
  });
  const [navigateAfterSuccess, setNavigateAfterSuccess] = useState(false);
  const [fileInputs, setFileInputs] = useState({
    image1: null,
    image2: [],
  });
  const [previews, setPreviews] = useState({
    image1: null,
    image2: [],
  });

  const fileInputRefs = {
    image1: useRef(null),
    image2: useRef(null),
  };

  // Add effect to handle navigation after successful submission
  useEffect(() => {
    let navigationTimer;
    if (navigateAfterSuccess) {
      navigationTimer = setTimeout(() => {
        navigate("/DashBoard/Admin/DigialEditions");
      }, snackbar.autoHideDuration);
    }
    return () => {
      if (navigationTimer) {
        clearTimeout(navigationTimer);
      }
    };
  }, [navigateAfterSuccess, navigate, snackbar.autoHideDuration]);

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

  const fetchDigitalEdition = useCallback(async () => {
    if (digitalEditionId) {
      try {
        const response = await fetch(
          `${backendURL}/api/getDigitalEditionById/${digitalEditionId}`
        );
        const data = await response.json();
        if (data.success) {
          setFormData({
            title: data.data.title,
            category: data.data.category,
            authorId: data.data.authorId._id,
          });
          setPreviews({
            image1: data.data.image1
              ? `${backendURL}${data.data.image1}`
              : null,
            image2: data.data.image2.map((url) => `${backendURL}${url}`),
          });
        }
      } catch (error) {
        console.error("Error fetching digital edition data:", error);
        showSnackbar("Failed to fetch digital edition data", "error", 6000);
      }
    }
  }, [digitalEditionId]);

  useEffect(() => {
    fetchAuthors();
    fetchDigitalEdition();
  }, [fetchAuthors, fetchDigitalEdition]);

  const handleFileChange = (e, type) => {
    const files =
      type === "image2" ? Array.from(e.target.files) : [e.target.files[0]];
    const newPreviews = {};

    if (files.length > 0) {
      if (type === "image1") {
        const isValidImage = files[0].type.startsWith("image/");
        if (!isValidImage) {
          showSnackbar(
            "Please select only image files (JPEG, PNG, etc.)",
            "error",
            4000
          );
          return;
        }
        newPreviews.image1 = URL.createObjectURL(files[0]);
        setFileInputs((prev) => ({ ...prev, [type]: files[0] }));
      } else {
        const isValidPDF = files.every(
          (file) =>
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf")
        );
        if (!isValidPDF) {
          showSnackbar(
            "Please select only PDF files for flipbook",
            "error",
            4000
          );
          return;
        }
        newPreviews.image2 = files.map((file) => URL.createObjectURL(file));
        setFileInputs((prev) => ({ ...prev, [type]: files }));
      }
      setPreviews((prev) => ({ ...prev, ...newPreviews }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => {
        if (url && (typeof url === "string" ? url.startsWith("blob:") : true)) {
          if (typeof url === "string") {
            URL.revokeObjectURL(url);
          } else {
            url.forEach(URL.revokeObjectURL);
          }
        }
      });
    };
  }, [previews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showSnackbar = (message, severity, duration = 2000) => {
    setSnackbar({
      open: true,
      message,
      severity,
      autoHideDuration: duration,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const digitalEditionFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          digitalEditionFormData.append(key, value);
        }
      });

      if (fileInputs.image1 instanceof File) {
        digitalEditionFormData.append("image1", fileInputs.image1);
      }
      if (fileInputs.image2.length > 0) {
        fileInputs.image2.forEach((file) => {
          digitalEditionFormData.append("image2", file);
        });
      }

      const url = digitalEditionId
        ? `${backendURL}/api/updateDigitalEdition/${digitalEditionId}`
        : `${backendURL}/api/createDigitalEdition`;
      const method = digitalEditionId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: digitalEditionFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save digital edition");
      }

      await response.json();
      showSnackbar(
        digitalEditionId
          ? "Digital Edition updated successfully"
          : "Digital Edition created successfully",
        "success"
      );
      setNavigateAfterSuccess(true);
    } catch (error) {
      console.error("Error saving digital edition:", error);
      showSnackbar(
        error.message || "Failed to save digital edition",
        "error",
        6000
      );
      setNavigateAfterSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box className="p-3 max-w-3xl mx-auto min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          <IoArrowBack className="mr-2" size={24} />
          Back
        </button>
        <h1 className="text-center text-3xl my-7 font-semibold">
          {digitalEditionId ? "Edit Digital Edition" : "Create Digital Edition"}
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

          <Box className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "image1")}
              ref={fileInputRefs.image1}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              onClick={() => fileInputRefs.image1.current.click()}
            >
              Choose Cover Image
            </Button>
            {previews.image1 && (
              <img
                src={previews.image1}
                alt="Cover preview"
                className="h-20 w-auto object-contain"
              />
            )}
          </Box>

          <Box className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={(e) => handleFileChange(e, "image2")}
              ref={fileInputRefs.image2}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              onClick={() => fileInputRefs.image2.current.click()}
            >
              Choose Flipbook PDFs
            </Button>
            {previews.image2.length > 0 && (
              <div className="flex gap-2">
                {previews.image2.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  >
                    Flipbook PDF {index + 1}
                  </a>
                ))}
              </div>
            )}
          </Box>

          <ResponsiveFashionButton
            loading={loading}
            digitalEditionId={digitalEditionId}
            handleSubmit={handleSubmit}
          />
        </form>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={snackbar.autoHideDuration}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{
              width: "100%",
              "& .MuiAlert-message": {
                fontSize: "1rem",
                fontWeight: "500",
              },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

const ResponsiveFashionButton = ({
  loading,
  digitalEditionId,
  handleSubmit,
}) => {
  return (
    <div className="w-full flex justify-center mt-4 mb-8">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg 
                 transition-colors duration-200 min-w-[200px] max-w-full
                 whitespace-normal text-center disabled:bg-blue-300
                 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>{digitalEditionId ? "Update" : "Create"} Digital Edition</span>
        )}
      </button>
    </div>
  );
};

export default DigitalEditionForm;
