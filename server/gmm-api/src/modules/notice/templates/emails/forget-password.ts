module.exports = {
  subject: 'Password Reset Request',
  message: (token, domain) => `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Password Reset Request</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: rgb(246, 253, 247);
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
                    border-radius: 10px;
                    text-align: center;
                }
                .header {
                    text-align: center;
                    background-color: #0b3e27;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 15px;
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
                }
                .reset-button {
                    display: block;
                    width: 200px;
                    margin: 20px auto;
                    padding: 12px;
                    font-size: 16px;
                    font-weight: bold;
                    color: white;
                    background-color: #197149;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                }
                .reset-button:hover {
                    background-color: #145c37;
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
                    <h2>Password Reset Request</h2>
                    <p>You have requested to reset your password. Please click the button below to reset your password:</p>
                    <a href="${domain}/en/auth/password-reset?token=${token}">
                        <button class="reset-button">Reset Your Password</button>
                    </a>
                    <p>This link is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
                </div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} Guardian Muslim Marriage - Premium Guided Matchmaking for Sunni Muslims with Revert Care.
                </div>
            </div>
        </body>
        </html>
      `,
};
