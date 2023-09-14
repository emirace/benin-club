import nodemailer from "nodemailer";
const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  attachments?: Buffer
) => {
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Benin Club <${process.env.EMAIL_USER}>`,
    // from: process.env.EMAIL_USER,
    to,
    subject,
    html: body,
    attachments: [
      {
        filename: "Newsletter",
        content: attachments,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    return false;
  }
};

export default sendEmail;
