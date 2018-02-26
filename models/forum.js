const db = require(':db');
let Forum = db.model('forum', {
    last_answer_at: {
        type: db.DATE,
        allowNull: true
    }
});

module.exports = Forum;
