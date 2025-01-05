module.exports = {
  subject: 'Verify Your Guardian / Wali Account',
  message: (otp) => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Verify Your Guardian / Wali Account</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding-bottom: 20px;
                }
                .header img {
                    width: 150px;
                }
                .content {
                    padding: 20px;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #e74c3c;
                    text-align: center;
                    padding: 10px;
                    border: 1px dashed #e74c3c;
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
                    <img src="/assets/guardian-logo-color.png" alt="Guardian Wali Logo">
                </div>
                <div class="content">
                    <p>To verify your email address, please use the following One Time Password (OTP):</p>
                    <div class="otp">${otp}</div>
                    <p>Do not share this OTP with anyone. Guardian Wali takes your account security very seriously. Guardian Wali Customer Service will never ask you to disclose or verify your Guardian Wali password, OTP, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to Guardian Wali for investigation.</p>
                    <p>Thank you for choosing Guardian Wali! We hope to see you again soon.</p>
                </div>
                <div class="footer">
                    &copy; ${(new Date().getFullYear())} Guardian Wali. All rights reserved.
                </div>
            </div>
        </body>
        </html>
      `,
};
