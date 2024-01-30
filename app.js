import express, { json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import nodemailer from 'nodemailer';


const app = express();
app.use(cors());
app.use(json());
app.use(express.static('Public'));

let APIKEY = process.env;

app.post('/send', (req, res) =>{
    const output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Capital Digital Marketing Group Inc.</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 30px auto;
                background: #fff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #086ad8;
                color: #ffffff;
                padding: 10px 20px;
                text-align: center;
            }
            .body {
                padding: 20px;
                line-height: 1.6;
                color: #555555;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Contact Info</h2>
            </div>
            <div class="body">
                <p>Dear ${req.body.name},</p>
                <p>This is a confirmation that Capital Digital Marketing Group recieved your contact request</p>
                <p> We appreciate your interest in our products/services, and we're committed to providing you with the information and 
                assistance you need. Our team will review your inquiry carefully and respond to you as soon as possible. 
                If you have any further questions or require immediate assistance, please feel free to contact us. 
                We look forward to assisting you and serving your needs.</p>
                <p></p>
                <p>Best regards,</p>
                <p>Admin Team<br>Marketing Company<br>Capital Digital Marketing Group Inc. </p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>`;

        // Replace with your email service details and credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Outlook SMTP server
        port: 587, // Port for TLS
        secure: false, // Use TLS
        auth: {
            user: APIKEY.EMAIL_USER,
            pass: APIKEY.EMAIL_PASS
        },
    });

    const mailOptions = {
        from: '"Capital Digital Marketing Group Inc." <support@cdmgcorp.com>',
        to: req.body.email,
        subject: 'Contact Information',
        html: output
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    });
});

app.post('/recieve', (req, res) =>{
    const output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Capital Digital Marketing Group Inc.</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 30px auto;
                background: #fff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #086ad8;
                color: #ffffff;
                padding: 10px 20px;
                text-align: center;
            }
            .body {
                padding: 20px;
                line-height: 1.6;
                color: #555555;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Contact Info</h2>
            </div>
            <div class="body">
                <p>New contact</p>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <p><strong>Phone:</strong> ${req.body.phone}</p>
                <p>==== Message =====</p>
                <p>${req.body.message}<p/>
                <p>Admin Team<br>Capital Digital Marketing Group Inc.</p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>`;

        // Replace with your email service details and credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Outlook SMTP server
        port: 587, // Port for TLS
        secure: false, // Use TLS
        auth: {
            user: APIKEY.EMAIL_USER,
            pass: APIKEY.EMAIL_PASS
        },
    });

    const mailOptions = {
        from: '"Capital Digital Marketing Group Inc." <support@cdmgcorp.com>',
        to: APIKEY.EMAIL_USER,
        subject: req.body.message,
        html: output
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    });
});

// Start server
// Démarrage du serveur
app.listen(APIKEY.PORT);
