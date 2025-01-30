module.exports = {
  subject: 'Guardian Request',
  message: (userName, relationship, domain, token) => `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Guardian Registration Request</title>
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
              .message {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
              .button {
                  display: inline-block;
                  width: 300px;
                  margin: 20px auto;
                  padding: 12px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #fff !important;
                  background-color: #197149;
                  border-radius: 5px;
                  text-align: center;
                  text-decoration: none;
              }
              .button:hover {
                  background-color: #145a37;
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
                  <h2>Guardian Registration Request</h2>
                  <p class="message"><strong>${userName}</strong> has invited you as their <strong>${relationship}</strong> on the Guardian Muslim Marriage platform.</p>
                  <p class="message">Click the button below to join:</p>
                  <a href="${domain}/en/register-via-link?token=${token}" class="button" style="color: #fff !important;">Join Guardian Muslim Marriage</a>
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
