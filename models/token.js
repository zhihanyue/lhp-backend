const randomString = require('~/utils/random').randomString;
const db = require(':db');
let Token = db.model('token', {
    value: {
        type: db.STRING(50),
        defaultValue(){return randomString(32);}
    }
});

module.exports = Token;
