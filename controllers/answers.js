const Answer = require(':models/answer');
const pick = require('~/utils/obj-util').pick;
const APIError = require('~/services/web/rest').APIError;
const db = require(':db');

module.exports = {
    async 'POST /api/answers'(ctx, next) {
        let obj = pick(ctx.request.body, ['content', 'forum_id']);
        obj.user_id = ctx.request.body.uid;
        let answer = await Answer.create(obj);
        ctx.rest({
            answer_id: answer.id
        });
    },
    async 'GET /api/answers/:id'(ctx, next) {
        let answer = await Answer.findById(ctx.params.id);
        let obj = pick(answer, ['user_id', 'content', 'last_answer_at', 'forum_id']);
        obj.last_answer_at = answer.updated_at;
        ctx.rest(obj);
    }
};
