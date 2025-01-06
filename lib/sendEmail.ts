import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

interface User {
  _id: string;
  email: string;
}

const sendVerificationEmail = async (user: User): Promise<void> => {
  try {
    // Ensure environment variables are defined
    if (!process.env.JWT_SECRET || !process.env.BASE_URL || !process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('Missing required environment variables for email functionality.');
    }

    // Create a transporter instance
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // Ensure port is a number
      secure: false, // If using STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Generate verification link
    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${token}`;

    // Email content
    const emailContent = `
      <p>Thank you for signing up! Please click the link below to verify your email address:</p>
      <a href="${verificationLink}" target="_blank" style="color: #1a73e8;">Verify Email</a>
      <p>If you did not sign up for this account, you can safely ignore this email.</p>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"App Name" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Verify Your Email',
      html: emailContent,
    });

    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email.');
  }
};

export default sendVerificationEmail;


// // export default sendEmail;

// import nodemailer from 'nodemailer';

// const sendVerificationEmail = async (user: { _id: any; email: any; }) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//         },
//     });

//     const verificationLink = `${process.env.BASE_URL}/verify-email?token=${user._id}`;
//     await transporter.sendMail({
//         from: `"App Name" <${process.env.SMTP_USER}>`,
//         to: user.email,
//         subject: 'Verify Your Email',
//         html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
//     });
// };

// export default sendVerificationEmail;

