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
            htmlContent: `Dear ${toName}, your verification code is ${otp}.`,
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
