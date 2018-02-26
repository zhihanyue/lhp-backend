const Favorite = require(':models/favorite');
const User = require(':models/user');
const Page = require(':models/page');
const pick = require('~/utils/obj-util').pick;
const APIError = require('~/services/web/rest').APIError;
const db = require(':db');

module.exports = {
    async 'GET /api/favorites'(ctx, next) {
        let user = await User.findById(ctx.query.uid);
        if(!user) {
            throw new APIError('user:not_found', 'user not found by id');
        }
        let pages = await user.getPages({
            attributes: ['id']
        });
        pages = pages.map(function(t) {
            return pick(t, ['id']);
        });
        ctx.rest({
            results: pages
        });
    },
    async 'POST /api/favorites'(ctx, next) {
        let user = await User.findById(ctx.request.body.uid);
        let page = await Page.findById(ctx.request.body.page_id);
        let favorites = await user.addPage(page);
        ctx.rest({});
    },
    async 'DELETE /api/favorites/a'(ctx, next) {
        let user = await User.findById(ctx.request.body.uid);
        let page = await Page.findById(ctx.request.body.page_id);
        await user.removePage(page);
        ctx.rest({});
    }
};
