import nodemailer from 'nodemailer';

// Create a reusable transporter object using SMTP transport
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f14f06c7856cf4",
    pass: "7b636128627fc3"
  }
});

export enum Type {
  EmailVerification = 'emailVerification',
  PasswordReset = 'passwordReset'
}

interface EmailOptions {
  username: string;
  email: string;
  verifyCode?: string;
  type: Type;
}

export async function sendVerificationEmail({ username, email, verifyCode, type }: EmailOptions) {
  let subject = "";
  let htmlContent = "";

  switch (type) {
    case Type.EmailVerification:
      subject = "Please verify your email address";
      htmlContent = `
        <html>
          <body>
            <h1>Welcome, ${username}!</h1>
            <p>Please click the following link to verify your email address:</p>
            <a href="http://localhost:3000/verify/${verifyCode}?type='email'">Verify Email</a>
            <p>or Copy and paste the following link to verify your email address: http://localhost:3000/verify/${verifyCode}?type='email' </p>
          </body>
        </html>
      `;
      break;

    case Type.PasswordReset:
      subject = "Reset your password";
      htmlContent = `
        <html>
          <body>
            <h1>Hi, ${username}!</h1>
            <p>We received a request to reset your password. Click the link below to reset your password:</p>
            <a href="http://localhost:3000/verify/${verifyCode}?type='password'">Reset Password</a>
            <p>or Copy and paste the following link to verify your email address: http://localhost:3000/verify/${verifyCode}?type='password' </p>
          </body>
        </html>
      `;
      break;

    default:
      throw new Error("Invalid email type");
  }

  try {
    const info = await transport.sendMail({
      from: 'Blogify <no-reply@blogify.com>',
      to: email,
      subject: subject,
      html: htmlContent,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
}
