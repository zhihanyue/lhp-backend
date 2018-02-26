const db = require(':db');
let Forum = db.model('forum', {
    last_answer_at: db.DATE
});

module.exports = Forum;
