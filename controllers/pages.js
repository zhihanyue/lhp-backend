const Page = require(':models/page');
const pick = require('~/utils/obj-util').pick;
const APIError = require('~/services/web/rest').APIError;
const db = require(':db');

module.exports = {
    async 'GET /api/pages/:type(activities|lectures|courses|subjects|questions)'(ctx, next) {
            let pages = await Page.findAll({
                where: { type: ctx.params.type },
                attributes: ['id']
            });
            ctx.rest({
                results: pages
            });
    },
    async 'GET /api/pages/:type(activities|lectures|courses|subjects|questions)/search'(ctx, next) {
        let pages = await Page.findAll({
            where: {
                type: ctx.params.type,
                content: {
                    [db.Op.like]: `%${ctx.query.keyword || ''}%`
                }
            },
            attributes: ['id']
        });
        ctx.rest({ results: pages });
    },
    async 'GET /api/pages/:id(\\d+)'(ctx, next) {
        let page = await Page.findById(ctx.params.id);
        if(!page)
            throw new APIError('page:page_not_found', 'page not found by id');
        let res = pick(page, ['type', 'pv', 'content']);
        res.info = JSON.parse(page.info);
        res.forum_id = page.forum_id || -1;
        ctx.rest(res);
        page.pv = page.pv + 1;
        page.save();
    },
    async 'GET /api/pages/:id(\\d+)/basic'(ctx, next) {
        let page = await Page.findById(ctx.params.id);
        if(!page)
            throw new APIError('page:page_not_found', 'page not found by id');
        let res = pick(page, ['type', 'pv']);
        res.info = JSON.parse(page.info);
        res.forum_id = page.forum_id || -1;
        ctx.rest(res);
    }
};
