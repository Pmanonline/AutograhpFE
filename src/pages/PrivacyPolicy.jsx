import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ padding: "2rem" }}>
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: "#2f4858" }} // Example color for the main heading
      >
        Privacy Policy for Autograph Collections
      </motion.h1>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            YOUR PRIVACY IS IMPORTANT TO US
          </Typography>
          <Typography paragraph>
            At Autograph Collections, we are committed to protecting your
            privacy. This Privacy Policy outlines how we collect, use, disclose,
            and safeguard your personal information when you visit our website
            and use our services.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            INFORMATION WE COLLECT
          </Typography>
          <Typography paragraph>
            We may collect the following types of personal information:
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]"> • Personal Information:</strong>{" "}
            This includes information you voluntarily provide, such as your
            name, email address, and other contact details when you subscribe to
            our newsletter, participate in contests, or contact our customer
            support.
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]"> • Usage Data:</strong> We may
            collect information about how you interact with our website, such as
            your IP address, browser type, device information, and pages you
            visit.
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]">
              • Cookies and Tracking Technologies:
            </strong>{" "}
            We may use cookies and similar tracking technologies to collect
            information about your browsing behavior and preferences.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            HOW WE USE YOUR INFORMATION
          </Typography>
          <Typography paragraph>
            We may use your personal information for the following purposes:
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]">
              • To provide and improve our services:
            </strong>{" "}
            We use your information to deliver content, respond to your
            inquiries, and enhance your overall experience on our website.
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]">
              {" "}
              • To communicate with you:
            </strong>{" "}
            We may send you newsletters, updates, and promotional offers. You
            can opt out of these communications at any time.
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]">
              • To analyze website usage:
            </strong>{" "}
            We analyze website traffic and user behavior to improve our services
            and content.
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]">
              • To comply with legal obligations:
            </strong>{" "}
            We may use your information to comply with applicable laws and
            regulations.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            SHARING YOUR INFORMATION
          </Typography>
          <Typography paragraph>
            We may share your personal information with:
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]"> • Service Providers:</strong> We
            may share your information with third-party service providers who
            assist us in operating our website and providing our services.
          </Typography>
          <Typography paragraph>
            <strong className="text-[#ee3767]"> • Legal Authorities:</strong> We
            may disclose your information to law enforcement agencies or other
            authorities if required by law or to protect our rights.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            DATA SECURITY
          </Typography>
          <Typography paragraph>
            We implement reasonable security measures to protect your personal
            information from unauthorized access, use, disclosure, alteration,
            or destruction. However, please note that no security measure is
            perfect, and we cannot guarantee the absolute security of your
            information.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            YOUR RIGHTS
          </Typography>
          <Typography paragraph>
            You may have certain rights regarding your personal information,
            such as the right to access, correct, or delete your information.
            You can exercise these rights by contacting us using the information
            provided below.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            CHANGES TO THIS PRIVACY POLICY
          </Typography>
          <Typography paragraph>
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting a notice on our website or
            by sending you a direct notification.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            CONTACT US
          </Typography>
          <Typography paragraph>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </Typography>
          <Typography paragraph>
            Email: Essential@autographcollections.com
          </Typography>
          <Typography paragraph>
            Website: http://theautographcollections.com
          </Typography>
          <Typography paragraph>
            By using our website, you agree to the terms of this Privacy Policy.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PrivacyPolicy;
