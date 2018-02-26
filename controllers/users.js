const User = require(':models/user');
const pick = require('~/utils/obj-util').pick;
const APIError = require('~/services/web/rest').APIError;

module.exports = {
    async 'POST /api/users'(ctx, next) {
        let user = User.build( pick(ctx.request.body, ['username', 'email', 'phonenum', 'university', 'stu_num']) );
        user.setPassword(ctx.request.body.password);
        await user.save();
        ctx.rest({uid: user.id});
    },
    async 'GET /api/users/:id'(ctx, next) {
        let user = await User.findById(ctx.params.id);
        if(!user) {
            throw new APIError('user:not_found', 'user not found by id');
        }
        ctx.rest({
            info: pick(user, ['email', 'phonenum', 'university', 'stu_num'])
        });
    },
    async 'PUT /api/users/:id'(ctx, next) {
        let user = await User.findById(ctx.params.id);
        if(!user) {
            throw new APIError('user:not_found', 'user not found by id');
        }
        user.set(pick(ctx.request.body.info, ['email', 'phonenum', 'university', 'stu_num']));
        await user.save();
        ctx.rest({});
    }
}
