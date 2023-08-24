const nodemailer = require('nodemailer');

exports.handler = async(event, context) => {
    try {
        const data = JSON.parse(event.body);

        // Set up your transporter (SMTP settings)
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com', // Microsoft 365 SMTP server
            port: 587, // Port for TLS/STARTTLS
            secure: false, // TLS requires secure false
            auth: {
                user: 'escaner@fixsell.com', // Your Microsoft 365 email
                pass: 'Fixsell.1432*', // Your Microsoft 365 email password
            },
        });

        // Construct email
        const mailOptions = {
            from: formData.email,
            to: 'escaner@fixsell.com',
            subject: 'Contacto de Fixsell',
            text: `
        Name: ${data.name}
        Phone Number: ${data.number}
        Email: ${data.email}
        Message: ${data.message}
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred' }),
        };
    }
};