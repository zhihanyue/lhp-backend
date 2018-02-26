const User = require(':models/user');
const Token = require(':models/token');
const APIError = require('~/services/web/rest').APIError;

module.exports = {
    async 'POST /api/tokens'(ctx, next) {
        let user = await User.findOne({
            where: { username: ctx.request.body.username }
        });
        if(!user) {
            throw new APIError('user:not_found', 'user not found by id');
        }
        if(!user.authenticate(ctx.request.body.password)) {
            throw new APIError('user:incorrect_password', 'incorrect password');
        }
        let token = await Token.create();
        user.addToken(token);
        ctx.rest({
            uid: user.id,
            token: token.value,
            role: user.role
        });
    },
    async 'GET /api/tokens/:token'(ctx, next) {
        let user = await User.findById(ctx.query.uid);
        if(!user) {
            throw new APIError('user:not_found', 'user not found by id');
        }
        let token = await user.getTokens({
            where: { value: ctx.params.token }
        });
        if(token.length) {
            ctx.rest({
                status: true,
                role: user.role
            });
        } else {
            ctx.rest({
                status: false
            });
        }
    }
};
