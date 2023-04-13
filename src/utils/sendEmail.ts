const sendEmail = (email: string, text: string, message: string) => {
  console.log(email, text, message);
  return true;
};
export default sendEmail;

// import nodemailer from 'nodemailer';

// const sendEmail2 = async (to: string, subject: string, body: string) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html: body,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Email sent: ${info.messageId}`);
//     return true;
//   } catch (error) {
//     console.error(`Error sending email: ${error}`);
//     return false;
//   }
// };
