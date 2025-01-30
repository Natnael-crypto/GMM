module.exports = {
  subject: 'Your Subscription Has Been Renewed',
  message: (
    userFirstName,
    planName,
    renewalDate,
    amount,
    numMatches,
    domain,
  ) => `
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
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }
                .header img {
                    width: 200px;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .details {
                    font-size: 18px;
                    margin: 20px 0;
                    text-align: left;
                    background: #f0f8f3;
                    padding: 15px;
                    border-radius: 8px;
                }
                .button {
                    display: inline-block;
                    width: 220px;
                    padding: 12px;
                    font-size: 18px;
                    font-weight: bold;
                    color: white !important;
                    background-color: #197149;
                    border-radius: 5px;
                    text-align: center;
                    text-decoration: none;
                    margin-top: 20px;
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
                    <img src="https://gmm-assets.s3.us-east-1.amazonaws.com/guardian-logo.png" alt="Guardian Muslim Marriage Logo">
                </div>
                <div class="content">
                    <h2>Subscription Renewed Successfully</h2>
                    <p>Dear <strong>${userFirstName}</strong>,</p>
                    <p>Your subscription has been successfully renewed.</p>
                    <div class="details">
                        <p><strong>Plan Name:</strong> ${planName}</p>
                        <p><strong>Renewal Date:</strong> ${renewalDate}</p>
                        <p><strong>Amount Charged:</strong> $${amount}</p>
                        <p><strong>Your Match Balance:</strong> ${numMatches}</p>
                    </div>
                    <p>Thank you for continuing your journey with Guardian Muslim Marriage. Your subscription ensures uninterrupted access to our premium guided matchmaking services.</p>
                    <p>You can update your subscription or manage auto-renewal settings in your account.</p>
                    
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
