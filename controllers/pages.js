const Page = require(':models/page');
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
    async 'GET /api/pages/:id(\\d)'(ctx, next) {
        
    }
};
