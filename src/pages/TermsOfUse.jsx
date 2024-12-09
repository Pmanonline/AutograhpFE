import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";

const TermsOfUse = () => {
  return (
    <Container maxWidth="md" sx={{ padding: "2rem" }}>
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: "#2f4858" }} // Example color for the main heading
      >
        Terms of Use for Autograph Collections
      </motion.h1>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            1. ACCEPTANCE OF TERMS
          </Typography>
          <Typography paragraph>
            By accessing or using the Autograph Collections website or any of
            its related services (collectively, the "Site"), you agree to be
            bound by these Terms of Use. If you do not agree to these Terms of
            Use, please do not use the Site.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            2. USE OF THE SITE
          </Typography>
          <Typography paragraph>
            • <strong className="text-[#ee3767]">Permitted Use:</strong> You may
            use the Site for personal, non-commercial purposes.
          </Typography>
          <Typography paragraph>
            • <strong className="text-[#ee3767]">Prohibited Use:</strong> You
            may not:
          </Typography>
          <Typography paragraph>
            ◦ Use the Site to violate any laws or regulations.
          </Typography>
          <Typography paragraph>
            ◦ Engage in any activity that could damage, disable, overburden, or
            impair the Site.
          </Typography>
          <Typography paragraph>
            ◦ Attempt to gain unauthorized access to the Site or its systems.
          </Typography>
          <Typography paragraph>
            ◦ Use any automated means to access or scrape content from the Site.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            3. INTELLECTUAL PROPERTY
          </Typography>
          <Typography paragraph>
            All content on the Site, including text, images, logos, and
            trademarks, is the property of Autograph Collections or its
            licensors and is protected by copyright and other intellectual
            property laws. You may not reproduce, distribute, modify, or create
            derivative works based on the Site's content without our prior
            written consent.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            4. USER CONTENT
          </Typography>
          <Typography paragraph>
            You may be able to submit content to the Site, such as comments or
            reviews. By submitting content, you grant Autograph Collections a
            worldwide, royalty-free, perpetual, irrevocable, non-exclusive
            license to use, reproduce, modify, adapt, publish, translate, create
            derivative works from, distribute, and display such content in any
            media.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            5. DISCLAIMER OF WARRANTIES
          </Typography>
          <Typography paragraph>
            The Site is provided "as is" without any warranties, express or
            implied, including but not limited to warranties of merchantability,
            fitness for a particular purpose, or non-infringement.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            6. LIMITATION OF LIABILITY
          </Typography>
          <Typography paragraph>
            In no event shall Autograph Collections be liable for any direct,
            indirect, incidental, special, or consequential damages arising out
            of or in connection with your use of the Site. While we strive to
            ensure accuracy and quality, Autograph Collections makes no
            representations or warranties, express or implied, regarding the
            completeness, reliability, suitability, or availability of the
            website, its content, or services for any particular purpose.
          </Typography>
          <Typography paragraph>
            By accessing and using this website, you acknowledge and agree to
            the following:
          </Typography>
          <Typography paragraph>
            i.{" "}
            <strong className="text-[#ee3767]">
              {" "}
              NO LIABILITY FOR ERRORS OR OMISSIONS:
            </strong>{" "}
            Autograph Collections is not responsible for any errors,
            inaccuracies, or omissions in the content provided. Any reliance you
            place on such information is strictly at your own risk.
          </Typography>
          <Typography paragraph>
            ii.
            <strong className="text-[#ee3767]">
              NO RESPONSIBILITY FOR THIRD-PARTY CONTENT:
            </strong>
            Our website may include links or references to third-party websites,
            products, or services. Autograph Collections is not responsible for
            the content, accuracy, or reliability of any third-party materials
            and disclaims any liability arising from their use.
          </Typography>
          <Typography paragraph>
            iii.{" "}
            <strong className="text-[#ee3767]">
              EXCLUSION OF INDIRECT DAMAGES:
            </strong>{" "}
            To the maximum extent permitted by applicable law, Autograph
            Collections will not be liable for any indirect, incidental,
            special, consequential, or punitive damages, including but not
            limited to loss of profits, data, or goodwill, arising from your use
            of the website or inability to access it.
          </Typography>
          <Typography paragraph>
            iv.{" "}
            <strong className="text-[#ee3767]">
              LIMITATION ON DIRECT DAMAGES:
            </strong>{" "}
            In no event shall Autograph Collections' total liability to you for
            any claims arising out of or related to your use of the website
            exceed the amount you paid, if any, for accessing our services.
          </Typography>
          <Typography paragraph>
            v. <strong className="text-[#ee3767]">ASSUMPTION OF RISK:</strong>{" "}
            By using this website, you acknowledge and accept that the internet
            is not a completely secure environment. Autograph Collections is not
            liable for any damage caused by unauthorized access to or misuse of
            your personal information.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            7. MODIFICATIONS TO TERMS OF USE
          </Typography>
          <Typography paragraph>
            Autograph Collections reserves the right to modify these Terms of
            Use at any time. Your continued use of the Site after any such
            modifications constitutes your acceptance of the new Terms of Use.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            8. GOVERNING LAW
          </Typography>
          <Typography paragraph>
            These Terms of Use shall be governed by and construed in accordance
            with the laws of Nigeria without regard to its conflict of laws
            principles. By accessing or using the website, you agree to submit
            to alternative dispute resolution such as arbitration and mediation
            for the resolution of any disputes or claims. You waive any
            objection to the jurisdiction or venue of such arbitration or
            mediation panel on the grounds of convenience or any other basis.
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
            If you have any questions about these Terms of Use, please contact
            us at:
          </Typography>
          <Typography paragraph>Phone number: 07055566000</Typography>
          <Typography paragraph>E-mail: Essential@ooshmail.com</Typography>
          <Typography paragraph>
            Address: 24, Iyalla street, Beside Shoprite, Alausa, Ikeja, Lagos
            State
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TermsOfUse;
