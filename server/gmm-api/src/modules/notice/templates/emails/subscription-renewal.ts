module.exports = {
  subject: 'Your Subscription Has Been Renewed',
  message: (userFirstName, planName, renewalDate, amount, numMatches) => `
              <!DOCTYPE html>
              <html>
              <head>
                  <meta charset="UTF-8">
                  <title>Subscription Auto-Renewal Confirmation</title>
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
                      .details {
                          font-size: 18px;
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
                          <p>Dear ${userFirstName},</p>
                          <p>We wanted to let you know that your subscription has been successfully renewed.</p>
                          <div class="details">
                              <p><strong>Plan Name:</strong> ${planName}</p>
                              <p><strong>Renewal Date:</strong> ${renewalDate}</p>
                              <p><strong>Amount Charged:</strong> $${amount}</p>
                              <p><strong>Your Match Balance:</strong> ${numMatches}</p>
                          </div>
                          <p>Thank you for continuing your journey with Guardian Muslim Marriage. Your subscription ensures uninterrupted access to our premium guided matchmaking services. If you ever decide to modify your subscription or prefer to manage auto-renewal settings, you can easily update your preferences in your account billing settings.</p>
                          <p>If you have any other questions or need assistance, please feel free to contact us at info@guardianmuslimmarriage.com.</p>
                      </div>
                      <div class="footer">
                          &copy; ${new Date().getFullYear()} Guardian/Wali - Premium Guided Matchmaking
                          For Sunni Muslims with Revert Care.
                      </div>
                  </div>
              </body>
              </html>
            `,
};
