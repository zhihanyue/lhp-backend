const Swiper = require(':models/swiper');
const APIError = require('~/services/web/rest').APIError;

module.exports = {
    async 'GET /api/swipers'(ctx, next) {
        let swipers = await Swiper.findAll({
            attributes: ['title', 'image_url', 'page_id']
        });
        ctx.rest({
            results: swipers
        });
    }
};
