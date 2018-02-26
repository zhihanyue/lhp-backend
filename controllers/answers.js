const Answer = require(':models/answer');
const pick = require('~/utils/obj-util').pick;
const APIError = require('~/services/web/rest').APIError;
const db = require(':db');

module.exports = {
    async 'POST /api/answers'(ctx, next) {
        let answer = await Answer.create(pick(ctx.request.body, ['content', 'forum_id']));
        ctx.rest({
            answer_id: answer.id
        });
    },
    async 'POST /api/answers/:id'(ctx, next) {
        let answer = await Answer.findById(ctx.params.id);
        ctx.rest(pick(answer, ['user_id', 'content', 'last_answer_at', 'forum_id']));
    }
};
