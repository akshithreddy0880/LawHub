const {transporter} = require('./mail');

module.exports =  {
    sendEmail: (options) => {
        transporter.sendMail(options, (err, info) => {
            if(err) console.log(err);
            else console.log(`Email sent: ${info.response}`);
        });
    }
}