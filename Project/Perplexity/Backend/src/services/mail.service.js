import nodemailer from "nodemailer";

let transporter;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GOOGLE_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }
        });

        transporter.verify()
            .then(() => {
                console.log("Email transporter is ready to send mail.");
            })
            .catch((err) => {
                console.log('Email transporter verification failed:', err);
            });
    }
    return transporter;
};

export async function sendEmail({ to, subject, html, text }) {
    const t = getTransporter();
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };
    const details = await t.sendMail(mailOptions);
    console.log("Email sent: ", details);
}