const db = require(':db');
let Answer = db.model('answer', {
    content: db.TEXT
}, {
    hooks: {
        async afterSave(answer, options) {
            let forum = await answer.getForum();
            forum.last_answer_at = new Date();
            forum.save();
        }
    }
});

module.exports = Answer;
