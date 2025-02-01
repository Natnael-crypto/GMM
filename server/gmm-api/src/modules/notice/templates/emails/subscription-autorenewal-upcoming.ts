module.exports = {
  subject: 'Your Subscription Auto-Renewal is Coming Soon',
  message: (userFirstName) => `
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
                    background-color: #f6fdf7;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 650px;
                    margin: 20px auto;
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
                    <img src="https://gmm-assets.s3.us-east-1.amazonaws.com/guardian-logo.png" width=340 height=50 alt="Guardian Muslim Marriage Logo">
                </div>
                <div class="content">
                    <h2>Subscription Auto-Renewal Notice</h2>
                    <p>Dear <strong>${userFirstName}</strong>,</p>
                    <p>We wanted to remind you that your subscription will be automatically renewed when your match balance runs out to ensure uninterrupted access to your matches.</p>
                    <p><strong>You currently have only 2 matches left.</strong></p>
                    <p>Thank you for being a valued member of Guardian Muslim Marriage! We appreciate your continued trust in our services.</p>
                    <p>You can manage your subscription settings, including auto-renewal preferences, from your account billing setting.</p>
                    <p>If you have any questions, feel free to contact us at <a href="mailto:info@guardianmuslimmarriage.com">info@guardianmuslimmarriage.com</a>.</p>
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
