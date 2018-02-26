const md5 = require('md5');
const randomString = require('~/utils/random').randomString;
const db = require(':db');
const SALT_LENGTH = 12;
let User = db.model('user', {
    username: {
        type: db.STRING(30),
        validate: { notEmpty: true }
    },
    password_digest: {
        type: db.STRING(80),
        validate: { notEmpty: true }
    },
    email: db.STRING(50),
    phonenum: db.STRING(30),
    university: db.STRING(50),
    stu_num: db.STRING(30),
    role: {
        type: db.INTEGER,
        defaultValue: 3
    }
});

User.prototype.setPassword = function(pass) {
    const salt = randomString(SALT_LENGTH);
    this.password_digest = salt + md5(salt + md5(pass));
}

User.prototype.authenticate = function(pass) {
    const salt = this.password_digest.substring(0, SALT_LENGTH);
    return salt + md5(salt + md5(pass)) === this.password_digest;
}

module.exports = User;
