const Forum = require(':models/forum');
const APIError = require('~/services/web/rest').APIError;
const db = require(':db');

module.exports = {
    async 'GET /api/forums/:id'(ctx, next) {
        let forum = await Forum.findById(ctx.params.id);
        if(!forum)
            throw new APIError('forum:forum_not_found', 'forum not found by id');
        let answers = await forum.getAnswers({
            attributes: ['id']
        });
        ctx.rest({
            results: answers,
            last_answer_at: forum.last_answer_at
        });
    }
};
