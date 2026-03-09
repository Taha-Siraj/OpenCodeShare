import { supabase } from "../config/supabaseClient.js";
import nodemailer from "nodemailer";

const blockedDomains = [
  "tempmail.com", "guerrillamail.com", "mailinator.com", "throwaway.email",
  "temp-mail.org", "fakeinbox.com", "sharklasers.com", "guerrillamailblock.com",
  "grr.la", "dispostable.com", "yopmail.com", "trashmail.com", "maildrop.cc",
  "10minutemail.com", "minutemail.com", "tempail.com", "mohmal.com",
  "getnada.com", "emailondeck.com", "33mail.com", "mailnesia.com",
  "tempmailaddress.com", "burnermail.io", "inboxkitten.com", "mytemp.email",
  "tempmailo.com", "emailfake.com", "crazymailing.com", "tmail.ws",
  "tmpmail.net", "tmpmail.org", "bupmail.com", "discard.email",
];

const allowedDomains = [
  "gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com",
  "live.com", "msn.com", "aol.com", "protonmail.com", "zoho.com",
  "mail.com", "gmx.com", "yandex.com",
];

const validateEmail = (email) => {
  if (!email) return { valid: false, msg: "Email is required" };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return { valid: false, msg: "Invalid email format" };

  const domain = email.split("@")[1].toLowerCase();

  if (blockedDomains.includes(domain)) {
    return { valid: false, msg: "Temporary/disposable emails are not allowed. Use a real email (Gmail, Outlook, etc.)" };
  }

  if (!allowedDomains.includes(domain)) {
    return { valid: false, msg: `Only real email providers are allowed (Gmail, Outlook, Yahoo, etc.). "${domain}" is not accepted.` };
  }

  return { valid: true };
};

const createTransporter = () => {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn("⚠️  SMTP credentials not configured. Emails will not be sent.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Please select a rating (1-5)" });
    }

    if (email) {
      const check = validateEmail(email);
      if (!check.valid) {
        return res.status(400).json({ error: check.msg });
      }
    }

    const { data, error: dbError } = await supabase
      .from("feedback")
      .insert({
        name: name?.trim() || "Anonymous",
        email: email?.trim() || null,
        message: message.trim(),
        rating: parseInt(rating),
      })
      .select()
      .single();

    if (dbError) {
      console.error("Feedback DB error:", dbError.message);
      return res.status(500).json({ error: "Failed to save feedback" });
    }

    const transporter = createTransporter();
    if (transporter && process.env.NOTIFY_EMAIL) {
      const stars = "⭐".repeat(rating);
      const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

      const mailOptions = {
        from: `"OpenCodeShare Feedback" <${process.env.SMTP_EMAIL}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `${stars} New Feedback (${ratingLabels[rating]}) — OpenCodeShare`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
            <div style="background: linear-gradient(135deg, #10b981, #0d9488); padding: 24px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-size: 18px;">📬 New Feedback Received</h1>
            </div>
            <div style="padding: 24px;">
              <div style="background: #f9fafb; border-radius: 10px; padding: 16px; margin-bottom: 16px;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Rating</p>
                <p style="margin: 0; font-size: 22px;">${stars} <span style="font-size: 14px; color: #374151;">${ratingLabels[rating]}</span></p>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; width: 80px;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 500;">${name || "Anonymous"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${email || "Not provided"}</td>
                </tr>
              </table>
              <div style="margin-top: 16px;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                <div style="background: #f9fafb; border-radius: 8px; padding: 14px; color: #374151; font-size: 14px; line-height: 1.6;">
                  ${message.trim()}
                </div>
              </div>
              <p style="margin: 20px 0 0; color: #9ca3af; font-size: 11px; text-align: center;">
                Sent from OpenCodeShare · ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Feedback email sent to", process.env.NOTIFY_EMAIL);
      } catch (emailErr) {
        console.error("Email send error:", emailErr.message);
      }
    }

    res.json({ message: "Feedback submitted successfully!", id: data?.id });
  } catch (err) {
    console.error("Feedback error:", err.message || err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
