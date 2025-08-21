import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "https://themagicbox.tv",
        methods: ["POST"],
        credentials: true,
    })
);

app.post("/send-email", async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "prajwal@abcdesigns.in",
                pass: "ciqf hedx noqj npfe",
            },
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: ["prajwal@abcdesigns.in", "harshvardhan@abcdesigns.in"],
            cc: ["zakir@abcdesigns.in"],
            bcc: ["gesfkhdghkm@gmail.com"],
            subject: "New Enquiry Received - Magic Box Website",
            html: `
        <h2>New Enquiry Submission from Magic Box Website</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
      `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send email." });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
