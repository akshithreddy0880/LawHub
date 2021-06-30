const bcrypt = require('bcryptjs');

module.exports = {
    hashPassword: (password) => {
        let rounds = parseInt(process.env.SALT_ROUNDS);
        let salt = bcrypt.genSaltSync(rounds);
        return bcrypt.hashSync(password, salt);
    }
}