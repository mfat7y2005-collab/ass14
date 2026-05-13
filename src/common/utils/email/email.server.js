import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html } = {}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "m.fath7y2005@gmail.com",
            pass: "m123456789" 
        }
    });

    const info = await transporter.sendMail({
        from: '"Saraha App" <m.fat7y2o005@gmail.com>',
        to,
        subject,
        html
    });
    return info;
};