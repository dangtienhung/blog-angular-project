import * as dotenv from 'dotenv';

import nodemailer from 'nodemailer';

dotenv.config();
// async..await is not allowed in global scope, must use a wrapper
export const sendVerificationEmail = async (user, linkToVerify) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'hungdang02042003@gmail.com',
        pass: 'hfrabpsrqupyzofd',
      },
    });

    const mailOptions = {
      from: 'hungdang02042003@gmail.com',
      to: user.email,
      subject: 'Xác thực tài khoản của bạn',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            /* Styles */
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Xác thực tài khoản của bạn</h1>
            <p>Chào mừng ${user.username} đến với trang web của chúng tôi. Vui lòng nhấp vào liên kết sau để xác thực tài khoản của bạn:</p>
            <p class="verification-link"><a href=${linkToVerify}>Verify Email</a></p>
            <div class="footer">
              <p>Xin cảm ơn,</p>
              <p>Trang web của bạn</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};
