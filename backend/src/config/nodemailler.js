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
              .container {
                max-width: 400px;
                margin: 0 auto;
                text-align: center;
                padding: 20px;
                background-color: #f2f2f2;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
            
              h1 {
                font-size: 24px;
                margin-bottom: 10px;
              }
            
              p {
                font-size: 16px;
                margin-bottom: 20px;
              }
            
              .verify-button {
                padding: 10px 20px;
                font-size: 18px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
              }
            
              .verify-button:hover {
                background-color: #0056b3;
                color:white;
              }
            </style>
          </head>
          <body>
            <div class="container">
                <h1>Xác thực tài khoản của bạn</h1>
                <p>Chào mừng ${user.username} đến với trang web của chúng tôi. Vui lòng nhấp vào liên kết sau để xác thực tài khoản của bạn:</p>
                <a href="${linkToVerify}" class="verify-button">Verify Email</a>
            </div>
            <div class="footer">
                <p>Xin cảm ơn,</p>
                <p>Trang web của bạn</p>
            </div>
          </body>
          </html>
      `,
      icalEvent: {
        method: 'CANCEL',
        href: linkToVerify,
      },
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};
