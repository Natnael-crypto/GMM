module.exports = {
  subject: 'Your Subscription Auto-Renewal is Coming Soon',
  message: (userFirstName, renewalDate, daysUntilRenewal) => `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Subscription Auto-Renewal Notification</title>
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
                  <p>We wanted to remind you that your subscription will be automatically renewed in <strong>${daysUntilRenewal} days</strong>, on <strong>${renewalDate}</strong>.</p>
                  <p>Thank you for being a valued member of Guardian Wali! We appreciate your continued trust in our services. You can always manage your subscription settings, including auto-renewal preferences, directly from your account.</p>
                  <p>If you have any questions or need assistance, please feel free to reach out to us at info@guardianmuslimmarriage.com.</p>
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
