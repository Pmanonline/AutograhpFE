// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import { registerUser } from "../features/auth/authActions";
// import { resetSuccess, resetError } from "../features/auth/authSlice";
// import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
// import AutographLogo from "../assets/images/autograghLogo.png";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const RegisterUser = () => {
//   const { loading, userInfo, error, success } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const password = watch("password");
//   const confirmPassword = watch("confirmPassword");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     if (success) {
//       setSnackbarMessage("Registered successfully. You can now log in.");
//       setSnackbarSeverity("success");
//       setOpenSnackbar(true);

//       const timer = setTimeout(() => {
//         navigate("/login");
//         dispatch(resetSuccess());
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [success, navigate, dispatch]);

//   useEffect(() => {
//     if (error) {
//       setSnackbarMessage(error);
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//       dispatch(resetError());
//     }
//   }, [error, dispatch]);

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setOpenSnackbar(false);
//   };

//   const submitForm = (data) => {
//     if (data.password !== data.confirmPassword) {
//       setSnackbarMessage("Passwords do not match!");
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//       return;
//     }

//     data.email = data.email.toLowerCase();
//     dispatch(registerUser(data));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div className="text-center">
//           <img src={AutographLogo} alt="Autograph Logo" />

//           <p className="mt-2  font-bold text-lg text-gray-600">
//             Register Account
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="username"
//                   className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
//                   placeholder="Username"
//                   {...register("username", {
//                     required: "Username is required",
//                   })}
//                 />
//                 {errors.username && (
//                   <p className="mt-1 text-sm text-red -600">
//                     {errors.username.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
//                   placeholder="Email address"
//                   {...register("email", { required: "Email is required" })}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
//                   placeholder="Password"
//                   {...register("password", {
//                     required: "Password is required",
//                   })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="sr-only">
//                 Confirm password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   id="confirmPassword"
//                   className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
//                   placeholder="Confirm password"
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                   })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="text-sm">
//               <Link
//                 to="/login"
//                 className="font-medium text-btColour hover:text-blue-500"
//               >
//                 Already have an account?
//               </Link>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#1e293b] to-btColour hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus :ring-offset-2 focus:ring-btColour transition-all duration-200 ease-in-out"
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
//               ) : (
//                 "Sign Up"
//               )}
//             </button>
//           </div>
//         </form>

//         <Snackbar
//           open={openSnackbar}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//         >
//           <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </div>
//     </div>
//   );
// };

// export default RegisterUser;
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import AutographLogo from "../assets/images/autograghLogo.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Cookies from "js-cookie";
import backendURL from "../config";
import edirectURL from "../config2";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Define validation schema using yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterUser = () => {
  const navigate = useNavigate();
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const showAlertMessage = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const submitForm = async (data) => {
    setIsLoading(true);
    try {
      // Primary registration
      const response = await axios.post(
        `${backendURL}/api/register`,
        {
          email: data.email.toLowerCase(),
          password: data.password,
          username: data.username,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      // Store tokens and user info in cookies
      if (typeof window !== "undefined") {
        Cookies.set("userToken", response.data.token, {
          expires: 7,
          sameSite: "strict",
          secure: true,
        });
        Cookies.set("userInfo", JSON.stringify(response.data.user), {
          expires: 7,
          sameSite: "strict",
          secure: true,
        });
      }

      // Show success message
      showAlertMessage("Registered successfully! You can now log in.");

      // Attempt secondary directory registration
      try {
        const secondResponse = await fetch(`${edirectURL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.username,
            email: data.email.toLowerCase(),
            password: data.password,
            password_confirmation: data.confirmPassword,
            role: "user",
          }),
        });

        if (secondResponse.ok) {
          setShowDirectoryModal(true);
        }
      } catch (error) {
        console.error("Directory registration failed:", error);
      }

      // Navigate after delay
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      // Handle error response
      showAlertMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <img src={AutographLogo} alt="Autograph Logo" />

          <p className="mt-2 font-bold text-lg text-gray-600">
            Register Account
          </p>
        </div>

        <form onSubmit={handleSubmit(submitForm)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                  placeholder="Password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-btColour hover:text-blue-500">
                Already have an account?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#1e293b] to-btColour hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btColour transition-all duration-200 ease-in-out">
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Directory Registration Modal */}
        {showDirectoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Directory Registration</h3>
              <p className="mb-4">
                You've also been registered on our Directory platform. Please
                check your email to verify your Directory account.
              </p>
              <button
                onClick={() => setShowDirectoryModal(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterUser;
