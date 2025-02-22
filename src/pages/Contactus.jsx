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
      text: "08055556666",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Mail,
      title: "Email",
      text: "essentials23@gmail.com",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-500",
    },
    {
      icon: MapPin,
      title: "Location",
      text: "Address: 24, Iyalla Street, Beside Shoprite, Alausa, Lagos State.",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
  ];

  const InputField = ({ icon: Icon, id, type = "text", ...props }) => (
    <div className="w-full group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-xl  transition-opacity duration-300" />
      <div className="relative z-10">
        <label htmlFor={id} className="sr-only">
          {props.placeholder}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            id={id}
            type={type}
            value={formData[id]}
            onChange={handleChange}
            className="block w-full pl-12 pr-4 py-4 border-1 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm placeholder-gray-500 text-gray-900 focus:ring-2  focus:ring-btColour focus:bg-white/80 transition-all duration-300"
            required
            {...props}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Contact Form */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-white via-white/90 to-white/80">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Get in Touch
              </h2>
              <p className="text-gray-500 mb-8">
                We'd love to hear from you! Drop us a message below.
              </p>

              <form onSubmit={sendEmail} className="space-y-6">
                <InputField icon={User} id="fullName" placeholder="Full Name" />

                <InputField
                  icon={Mail}
                  id="email"
                  type="email"
                  placeholder="Email Address"
                />

                <div className="w-full group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full pl-12 pr-4 py-4 border-1 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-btColour focus:bg-white/80 transition-all duration-300 min-h-[150px]"
                        placeholder="Your Message"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-8 bg-gradient-to-r from-red-500 to-purple hover:from-red-700 hover:to-purple text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/50 rounded-full animate-spin border-t-transparent" />
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 p-8 lg:p-12">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${item.bgColor}`}>
                            <item.icon
                              className={`h-6 w-6 ${item.iconColor}`}
                            />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-white/90">
                              {item.title}
                            </h4>
                            <p className="text-sm text-white/70">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto border-t border-white/10 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={Map}
                      alt="Location Map"
                      className="w-full h-64 object-cover"
                    />
                    <div className="bg-white/90 backdrop-blur-sm p-4">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-purple-500" />
                        Our headquarters location
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark semi-transparent background
          borderRadius: "8px",
          padding: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Soft shadow for depth
        }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            bgcolor:
              snackbar.severity === "success"
                ? "rgba(56, 189, 248, 0.2)" // Light blue background
                : "rgba(239, 68, 68, 0.2)", // Light red background
            color: snackbar.severity === "success" ? "#0ea5e9" : "#ef4444",
            border: "1px solid",
            borderColor:
              snackbar.severity === "success"
                ? "rgba(14, 165, 233, 0.5)"
                : "rgba(239, 68, 68, 0.5)",
            borderRadius: "6px",
            backdropFilter: "blur(6px)", // Slight blur effect
          }}
          icon={false}>
          <div className="flex items-center gap-3">
            {snackbar.severity === "success" ? (
              <div className="h-6 w-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Send className="h-4 w-4 text-blue-500" />
              </div>
            ) : (
              <div className="h-6 w-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
            {snackbar.message}
          </div>
        </Alert>
      </Snackbar>
      ;
    </div>
  );
};

export default ContactUs;
