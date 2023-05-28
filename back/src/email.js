const nodeMailer = require('nodemailer')
let config = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
}

const transport = nodeMailer.createTransport(config)

const sendEmail = (email, subject, text, html) => {
    const mailOptions = {
        from:    process.env.EMAIL_ACCOUNT,
        to:      email,
        subject: subject,
        text:    text,
        html:    html
    }
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent: ', info.response)
        }
    })
}

module.exports = {sendEmail}