const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (options) => {
    let mailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'evelyn.parisian35@ethereal.email',
            pass: 'RuR3StbUbvgY5UJSfP'
        }
    });

    let mailDetails = {
        from: 'nwadiaromiraclechukwuma@gmail.com',
        to: "nwadiaromiracle@yahoo.com",
        subject: options.subject,
        text: options.message
    };

    await mailTransporter.sendMail(mailDetails);

}
const sendEmail2 = async (options) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const mailTransporter2 = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        auth: {
            user: 'apikey',
            pass: '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'
        }
    });
    const msg = {
        to: 'nwadiaromiracle@yahoo.com', // Change to your recipient
        from: 'nwadiaromiraclechukwuma@gmail.com', // Change to your verified sender
        subject: options.subject,
        text: options.message,
        //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    await mailTransporter2.sendMail(msg);
};
module.exports = sendEmail