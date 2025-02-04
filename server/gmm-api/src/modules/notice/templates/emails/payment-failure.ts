module.exports = {
  subject: 'Payment Failed – Action Required',
  message: (paymentAmount, paymentMethod, numMatches) => `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Payment Failed – Action Required</title>
              <style>
                * {
                      margin: 0;
                      padding: 0;
                      box-sizing: border-box;
                  }
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
                  .failure-reason {
                      font-size: 20px;
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
                      <p>Unfortunately, your payment attempt for your recent order has failed. Below are the details:</p>
                      <ul>
                          <li><strong>Payment Amount:</strong> $${paymentAmount}</li>
                          <li><strong>Payment Method:</strong> ${paymentMethod}</li>
                          <li><strong>Matches Included:</strong> ${numMatches}</li>
                      </ul>
                      <p>The reason for the failure is as follows:</p>
                      <p>Don't worry, you can easily resolve this issue by updating your payment method:</p>
                      <ul>
                          <li><strong>Log into your account</strong> and update your payment information.</li>
                          <li><strong>Try again</strong> once your payment method is updated.</li>
                      </ul>
                      <p>If you have any questions, please don't hesitate to reach out to our support team. We're here to help!</p>
                      <p>Thank you for choosing Guardian Wali. We value your business!</p>
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
