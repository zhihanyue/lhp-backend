const Favorite = require(':models/favorite');
const User = require(':models/user');
const pick = require('~/utils/obj-util').pick;
const APIError = require('~/services/web/rest').APIError;
const db = require(':db');

module.exports = {
    async 'GET /api/favorites'(ctx, next) {
        let user = await User.findById(ctx.query.uid);
        let favorites = await user.getFavorites({
            attributes: ['page_id']
        });
        ctx.rest({
            results: favorites
        });
    },
    async 'POST /api/favorites'(ctx, next) {
        let user = await User.findById(ctx.request.body.uid);
        let favorites = await user.createFavorite({page_id: ctx.request.body.page_id});
        ctx.rest({});
    },
    async 'DELETE /api/favorites/a'(ctx, next) {
        let user = await User.findById(ctx.request.body.uid);
        await user.deleteFavorites({
            where: { page_id: ctx.request.body.page_id }
        });
        ctx.rest({});
    }
};
