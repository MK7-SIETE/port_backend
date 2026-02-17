require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Contact route
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Create email transporter using Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

  try {
    // Email 1: Notification to YOU with visitor's message
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Website Message: ${subject}`,
      html: `
        <h3>New Website Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Email 2: Auto-reply to the visitor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Betsaleel Mukuba</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); min-height: 100vh;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); padding: 40px 20px;">
    <tr>
      <td align="center">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;">

          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); padding: 40px 30px; text-align: center;">
              <img src="cid:profileImage" alt="Betsaleel Mukuba" style="width: 120px; height: 120px; border-radius: 50%; border: 5px solid #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.2); margin-bottom: 20px; object-fit: cover;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Thank You, ${name}!</h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your message has been received</p>
            </td>
          </tr>

          <!-- MAIN CONTENT -->
          <tr>
            <td style="padding: 40px 30px;">

              <!-- Thank you message -->
              <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 25px; border-radius: 15px; border-left: 5px solid #001f3f; margin-bottom: 30px;">
                <p style="margin: 0 0 15px; color: #2d3748; font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
                <p style="margin: 0 0 15px; color: #2d3748; font-size: 16px; line-height: 1.6;">
                  Thank you for getting in touch! I have received your message regarding <strong>"${subject}"</strong> and truly appreciate you taking the time to reach out.
                </p>
                <p style="margin: 0; color: #2d3748; font-size: 16px; line-height: 1.6;">
                  I will review your message and get back to you <strong>within 24-48 hours</strong>. Looking forward to connecting with you!
                </p>
              </div>

              <!-- Portfolio button -->
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="https://betsamukuba.netlify.app/" style="display: inline-block; background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 50px; font-size: 16px; font-weight: 600; box-shadow: 0 10px 25px rgba(0,31,63,0.4);">
                  View My Portfolio
                </a>
              </div>

              <!-- GET IN TOUCH section -->
              <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 20px; color: #1a202c; font-size: 18px; font-weight: 600; text-align: center;">Get In Touch</h3>

                <!-- Email row -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 14px;">
                  <tr>
                    <td style="width: 50px; vertical-align: middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #001f3f, #003d7a); border-radius: 10px; text-align: center; vertical-align: middle;">
                            <img src="https://img.icons8.com/ios-filled/20/ffffff/new-post.png" width="20" height="20" alt="Email" style="display: block; margin: 10px auto;" />
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="vertical-align: middle; padding-left: 12px;">
                      <div style="color: #718096; font-size: 12px; margin-bottom: 2px;">Email</div>
                      <a href="mailto:mukuba950@gmail.com" style="color: #001f3f; text-decoration: none; font-size: 15px; font-weight: 500;">mukuba950@gmail.com</a>
                    </td>
                  </tr>
                </table>

                <!-- Phone row -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 14px;">
                  <tr>
                    <td style="width: 50px; vertical-align: middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #001f3f, #003d7a); border-radius: 10px; text-align: center; vertical-align: middle;">
                            <img src="https://img.icons8.com/ios-filled/20/ffffff/phone.png" width="20" height="20" alt="Phone" style="display: block; margin: 10px auto;" />
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="vertical-align: middle; padding-left: 12px;">
                      <div style="color: #718096; font-size: 12px; margin-bottom: 2px;">Phone</div>
                      <a href="tel:+260969508654" style="color: #001f3f; text-decoration: none; font-size: 15px; font-weight: 500;">+260 96 950 8654</a>
                    </td>
                  </tr>
                </table>

                <!-- Location row -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="width: 50px; vertical-align: middle;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #001f3f, #003d7a); border-radius: 10px; text-align: center; vertical-align: middle;">
                            <img src="https://img.icons8.com/ios-filled/20/ffffff/marker.png" width="20" height="20" alt="Location" style="display: block; margin: 10px auto;" />
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="vertical-align: middle; padding-left: 12px;">
                      <div style="color: #718096; font-size: 12px; margin-bottom: 2px;">Location</div>
                      <span style="color: #4a5568; font-size: 15px; font-weight: 500;">Lusaka, Zambia</span>
                    </td>
                  </tr>
                </table>

              </div>

              <!-- CONNECT WITH ME - social icons -->
              <div style="text-align: center; margin-top: 25px;">
                <p style="margin: 0 0 15px; color: #4a5568; font-size: 14px; font-weight: 600;">Connect with me</p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                  <tr>
                    <!-- LinkedIn -->
                    <td style="padding: 0 6px;">
                      <a href="https://linkedin.com/in/betsaleel-mukuba" style="display: inline-block; width: 46px; height: 46px; background: #0077b5; border-radius: 12px; text-align: center;">
                        <img src="https://img.icons8.com/ios-filled/24/ffffff/linkedin.png" width="24" height="24" alt="LinkedIn" style="display: block; margin: 11px auto;" />
                      </a>
                    </td>
                    <!-- GitHub -->
                    <td style="padding: 0 6px;">
                      <a href="https://github.com/MK7-SIETE" style="display: inline-block; width: 46px; height: 46px; background: #333333; border-radius: 12px; text-align: center;">
                        <img src="https://img.icons8.com/ios-filled/24/ffffff/github.png" width="24" height="24" alt="GitHub" style="display: block; margin: 11px auto;" />
                      </a>
                    </td>
                    <!-- WhatsApp -->
                    <td style="padding: 0 6px;">
                      <a href="https://wa.me/260969508654" style="display: inline-block; width: 46px; height: 46px; background: #25D366; border-radius: 12px; text-align: center;">
                        <img src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png" width="24" height="24" alt="WhatsApp" style="display: block; margin: 11px auto;" />
                      </a>
                    </td>
                    <!-- Facebook -->
                    <td style="padding: 0 6px;">
                      <a href="https://facebook.com/betsa.mukuba" style="display: inline-block; width: 46px; height: 46px; background: #1877f2; border-radius: 12px; text-align: center;">
                        <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" width="24" height="24" alt="Facebook" style="display: block; margin: 11px auto;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background: #f8fafc; padding: 30px; text-align: center; border-top: 3px solid #e2e8f0;">
              <p style="margin: 0 0 5px; color: #718096; font-size: 14px;">Best regards,</p>
              <p style="margin: 0 0 5px; color: #001f3f; font-size: 20px; font-weight: 700;">Betsaleel Mukuba</p>
              <p style="margin: 0 0 20px; color: #718096; font-size: 13px;">Developer | Tech Enthusiast | Problem Solver</p>
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">This is an automated response. I will personally reply to your message soon!</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
      attachments: [
        {
          filename: "profile-pic.png",
          path: path.join(__dirname, "assets", "profile-pic.png"),
          cid: "profileImage",
        },
      ],
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Email sending failed." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
