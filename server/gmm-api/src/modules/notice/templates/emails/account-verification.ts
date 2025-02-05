module.exports = {
  subject: 'Verify Your Guardian Muslim Marriage Account',
  message: (otp) => `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>Verify Your Guardian Muslim Marriage Account</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      color: #333;
                      background-color:rgb(246, 253, 247);
                      margin: 0;
                      padding: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                  }
                  .container {
                      width: 100%;
                      max-width: 650px;
                      margin: 0 auto;
                      background-color: #fff;
                      padding: 20px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                      text-align: center;
                      padding: 15px;
                      background-color: #0b3e27;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      border-top-left-radius: 10px;
                      border-top-right-radius: 10px;
                  }
                  .header img {
                      color: transparent;
                      width: auto;
                      max-width: 100%;
                      height: 50px;
                      display: block;
                      margin: auto;
                  }
                  .content {
                      padding: 20px;
                      text-align: center;
                  }
                  .otp {
                      font-size: 24px;
                      font-weight: bold;
                      color: #197149;
                      text-align: center;
                      padding: 15px;
                      margin: 20px 0;
                  }
                  .footer {
                      font-size: 12px;
                      color: #999;
                      text-align: center;
                      padding-top: 20px;
                      border-top: 1px solid #eee;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <img src="https://gmm-assets.s3.us-east-1.amazonaws.com/guardian-logo.png" width=340 height=50 alt="Guardian Muslim Marriage Logo">
                  </div>
                  <div class="content">
                      <p>To verify your email address, please use the following One Time Password (OTP):</p>
                      <div class="otp">${otp}</div>
                      <p>Do not share this OTP with anyone. Guardian Muslim Marriage takes your account security very seriously. Guardian Muslim Marriage Customer Service will never ask you to disclose or verify your Guardian Muslim Marriage password, OTP, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to Guardian Muslim Marriage for investigation.</p>
                      <p>Thank you for choosing Guardian Muslim Marriage! We hope to see you again soon.</p>
                  </div>
                  <div class="footer">
                      &copy; ${new Date().getFullYear()} Guardian Muslim Marriage - Premium Guided Matchmaking
          For Sunni Muslims with Revert Care.
                  </div>
              </div>
          </body>
          </html>
        `,
};
