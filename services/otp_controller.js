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
            sender: { name: 'Duty Doc', email: 'no-reply@doc-chat.com' },
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

        console.log("[BODY]:", response.data);

        if (response.status === 201) {
            console.log('Verification Email Sent To Your Email');
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
