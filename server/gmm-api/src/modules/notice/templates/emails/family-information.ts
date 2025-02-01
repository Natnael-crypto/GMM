module.exports = {
  subject: 'Family Information Details',
  message: (familyInfo) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Family Information Details</title>
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
                font-size: 16px;
                margin: 20px 0;
                background-color: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
            }
            .details p {
                margin: 10px 0;
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
                <p>Dear ${familyInfo.recipientName},</p>
                <p>The family information of ${familyInfo.matchedUserName} has been shared.</p>
                <div class="details">
                    <p><strong>Guardian Full Name:</strong> ${familyInfo.guardianFirstName} ${familyInfo.guardianLastName}</p>
                    <p><strong>Relationship to Guardian:</strong> ${familyInfo.relationshipToGuardian}</p>
                    <p><strong>Guardian Phone Number:</strong> ${familyInfo.guardianPhoneNumber}</p>
                    <p><strong>Guardian Email:</strong> ${familyInfo.guardianEmail}</p>                    
                </div>
                <p>Please ensure that the information provided is accurate and up-to-date. If you have any questions or need to make changes, feel free to contact us.</p>
                <p>Thank you for trusting Guardian Wali with your family information.</p>
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
