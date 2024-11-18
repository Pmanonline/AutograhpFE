// import React, { useState } from "react";
// import emailjs from "emailjs-com";
// import {
//   Mail,
//   MessageSquare,
//   User,
//   Send,
//   Phone,
//   HelpCircle,
// } from "lucide-react";
// import { Snackbar, Alert } from "@mui/material";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     message: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       fullName: "",
//       email: "",
//       message: "",
//     });
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   const sendEmail = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const templateParams = {
//         to_name: "Credulen",
//         from_name: formData.fullName,
//         message: formData.message,
//         reply_to: formData.email,
//       };

//       await emailjs.send(
//         "service_mfruavt",
//         "template_cst1uc9",
//         templateParams,
//         "9Tp4XEvOsWGi69ktz"
//       );
//       setSnackbar({
//         open: true,
//         message: "Message sent successfully! 📧",
//         severity: "success",
//       });
//       resetForm();
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: "Failed to send message. Please try again.",
//         severity: "error",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const contactMethods = [
//     {
//       icon: Mail,
//       href: "mailto:contact@example.com",
//       label: "Email us",
//     },
//     {
//       icon: Phone,
//       href: "tel:+1234567890",
//       label: "Call us",
//     },
//     {
//       icon: MessageSquare,
//       href: "https://wa.me/1234567890",
//       label: "Chat with us",
//     },
//   ];

//   const InputField = ({ icon: Icon, id, type = "text", ...props }) => (
//     <div className="w-full">
//       <label htmlFor={id} className="sr-only">
//         {props.placeholder}
//       </label>
//       <div className="relative group">
//         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 group-hover:text-btColour">
//           <Icon className="h-5 w-5 text-gray-400 group-hover:text-btColour transition-colors duration-200" />
//         </div>
//         <input
//           id={id}
//           type={type}
//           value={formData[id]}
//           onChange={handleChange}
//           className="appearance-none block w-full h-[50px] px-4 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm hover:border-btColour transition-all duration-200"
//           required
//           {...props}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
//       <div className=" max-w-xl mid:px-8 mid:mx-6 w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div className="text-center space-y-4">
//           <div className="flex justify-center">
//             <HelpCircle className="h-12 w-12 text-btColour animate-pulse" />
//           </div>
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             Have any Questions?
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Get in touch with us and we'll help you out
//           </p>
//           <div className="flex justify-center space-x-6">
//             {contactMethods.map((method, index) => {
//               const Icon = method.icon;
//               return (
//                 <a
//                   key={index}
//                   href={method.href}
//                   className="group relative"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Icon className="h-6 w-6 text-gray-500 hover:text-btColour transition-colors duration-200 transform hover:scale-110" />
//                   <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-gray-500">
//                     {method.label}
//                   </span>
//                 </a>
//               );
//             })}
//           </div>
//         </div>

//         <form className="mt-12 space-y-6" onSubmit={sendEmail}>
//           <div className="space-y-6">
//             <InputField
//               icon={User}
//               id="fullName"
//               placeholder="What's your full name?"
//             />
//             <InputField
//               icon={Mail}
//               id="email"
//               type="email"
//               placeholder="Your email address?"
//             />
//             <div className="w-full">
//               <label htmlFor="message" className="sr-only">
//                 Message
//               </label>
//               <div className="relative group">
//                 <div className="absolute top-4 left-4 pointer-events-none transition-colors duration-200 group-hover:text-btColour">
//                   <MessageSquare className="h-5 w-5 text-gray-400 group-hover:text-btColour transition-colors duration-200" />
//                 </div>
//                 <textarea
//                   id="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="appearance-none block w-full h-[120px] px-4 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-btColour focus:border-btColour focus:z-10 sm:text-sm hover:border-btColour transition-all duration-200"
//                   placeholder="Type your question or request!"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#1e293b] to-btColour hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-btColour transition-all duration-300 ease-in-out disabled:opacity-70 transform hover:scale-[1.02]"
//           >
//             {isLoading ? (
//               "Sending..."
//             ) : (
//               <>
//                 Send Message
//                 <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
//               </>
//             )}
//           </button>
//         </form>
//       </div>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//           variant="filled"
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Mail, MessageSquare, User, Send, Phone, MapPin } from "lucide-react";
import { Snackbar, Alert } from "@mui/material";
import Map from "../assets/images/contactMap.png";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      message: "",
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const templateParams = {
        to_name: "Credulen",
        from_name: formData.fullName,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(
        "service_mfruavt",
        "template_cst1uc9",
        templateParams,
        "9Tp4XEvOsWGi69ktz"
      );
      setSnackbar({
        open: true,
        message: "Message sent successfully! 📧",
        severity: "success",
      });
      resetForm();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      text: "+1 (555) 000-0000",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: Mail,
      title: "Email",
      text: "info@example.com",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      icon: MapPin,
      title: "Location",
      text: "123 Street Name, City, Country",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  const InputField = ({ icon: Icon, id, type = "text", ...props }) => (
    <div className="w-full">
      <label htmlFor={id} className="sr-only">
        {props.placeholder}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          type={type}
          value={formData[id]}
          onChange={handleChange}
          className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition duration-150 ease-in-out"
          required
          {...props}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            {/* Map and Contact Info */}
            <div className="bg-gray-50 px-10 Nlg:hidden ">
              <div className="mb-12">
                <img
                  src={Map}
                  alt="Location Map"
                  className="w-full h-[35rem] object-cover rounded-md shadow-md"
                />
              </div>
            </div>
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                Send us a message
              </h3>

              <form onSubmit={sendEmail} className="space-y-10">
                <InputField
                  icon={User}
                  id="fullName"
                  placeholder="Full Name"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-HeroClr focus:border-HeroClr text-base"
                />

                <InputField
                  icon={Mail}
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-HeroClr focus:border-HeroClr text-base"
                />

                <div className="w-full">
                  <div className="relative">
                    <div className="absolute top-3 left-4 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-HeroClr focus:border-HeroClr text-base min-h-[150px]"
                      placeholder="Your Message"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-end py-3 px-6 border border-gray-300 rounded-lg text-white bg-HeroClr hover:bg-transparent hover:text-HeroClr hover:border hover:border-HeroClr focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-HeroClr text-base font-medium transition duration-150 ease-in-out"
                  >
                    {isLoading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl text-center transition-transform duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-3 ">
                  <div
                    className={`p-3 rounded-full ${item.iconColor} bg-white shadow-2xl shadow-HeroClr`}
                  >
                    <item.icon className="h-6 w-6 text-HeroClr shadow-2xl shadow-HeroClr" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactUs;
