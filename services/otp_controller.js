// controllers/emailController.js
const axios = require('axios');


async function sendEmailOTP(toEmail, otp, toName, resend = false) {
    try {
        const apiKey = process.env.EMAIL_API_KEY;
        const url = 'https://api.sendinblue.com/v3/smtp/email';

        const headers = {
            'Content-Type': 'application/json',
            'api-key': apiKey,
        };

        const data = {
            sender: { name: 'Snapped Url', email: 'no-reply@snapped-url.com' },
            type: 'classic',
            htmlContent: `
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    padding: 20px;
                  }
                  .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                    color: #333;
                  }
                  p {
                    color: #666;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Email Verification</h1>
                  <p>Dear ${toName},</p>
                  <p>Your verification code is: <strong>${otp}</strong></p>
                  <p>If you didn't request this code, you can ignore this email.</p>
                </div>
              </body>
            </html>
          `,
            to: [
                {
                    email: toEmail,
                    name: toName,
                },
            ],
            subject: resend ? 'Email verification Resend' : 'Email verification',
        };

        const response = await axios.post(url, data, { headers });

        if (response.status === 201) {
            return "Success";
        } else {
            return "Failed";

        }



    } catch (error) {
        console.error('Error sending verification email:', error.message);
        return "Failed";

    }
}

module.exports = { sendEmailOTP };
