const {transporter} = require('./mail');

module.exports =  {
    sendEmail: (options) => {
        transporter.sendMail(options, (err, info) => {
            if(err) {
                console.log(err);
                next(createError('Something went wrong'));
            }
            else console.log(`Email sent: ${info.response}`);
        });
    }
}