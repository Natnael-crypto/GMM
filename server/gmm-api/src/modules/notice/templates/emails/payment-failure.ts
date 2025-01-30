module.exports = {
  subject: 'Payment Failed – Action Required',
  message: (paymentAmount, paymentMethod, numMatches, domain) => `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <title>Payment Failed – Action Required</title>
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
                  .failure-reason {
                      font-size: 20px;
                      font-weight: bold;
                      color: #e74c3c;
                      text-align: center;
                      padding: 10px;
                      border: 1px dashed #e74c3c;
                      margin: 20px 0;
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
                      <h2>Payment Failed – Action Required</h2>
                      <p>Unfortunately, your recent payment attempt has failed. Please find the details below:</p>
                      <ul style="text-align: left; display: inline-block;">
                          <li><strong>Payment Amount:</strong> $${paymentAmount}</li>
                          <li><strong>Payment Method:</strong> ${paymentMethod}</li>
                          <li><strong>Matches Included:</strong> ${numMatches}</li>
                      </ul>
                      <p class="failure-reason">Your payment could not be processed. Please update your payment details to continue using our services.</p>
                      <p>To resolve this issue, please update your payment method and try again.</p>
                      <a href="${domain}/en/payment/update" class="button">Update Payment Method</a>
                      <p>If you need assistance, feel free to contact our support team.</p>
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
