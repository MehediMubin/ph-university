import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: config.node_env === "production",
      auth: {
         // TODO: replace `user` and `pass` values from <https://forwardemail.net>
         user: config.email,
         pass: config.email_password,
      },
   });

   await transporter.sendMail({
      from: config.email, // sender address
      to: to, // list of receivers
      subject: "Change Your Password!", // Subject line
      text: "Hey, I've Heard that you just forgot your password. I will give you a reset link to help you reset your password.", // plain text body
      html: html, // html body
   });
};
