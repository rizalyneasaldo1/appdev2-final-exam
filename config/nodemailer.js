const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = async function sendConfirmationEmail(email, event) {
    const html = pug.renderFile(path.join(__dirname, '../emails/eventCreated.pug'), event);
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Event Created Successfully!',
        html
    });
};
