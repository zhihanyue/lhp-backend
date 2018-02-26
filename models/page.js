const db = require(':db');
let Page = db.model('page', {
    type: db.STRING(20),
    pv: db.INTEGER,
    content: db.TEXT,
    info: db.TEXT
});

module.exports = Page;
