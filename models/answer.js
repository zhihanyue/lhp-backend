const db = require(':db');
let Answer = db.model('answer', {
    content: db.TEXT
}, {
    hooks: {
        afterUpdate(answer, options) {
            let forum = answer.getForum();
            forum.lastAnswerAt = new Date();
        }
    }
});

module.exports = Answer;
