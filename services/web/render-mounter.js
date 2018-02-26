const ejs = require('ejs');
const util = require('util');
const path = require('path');
const LRU = require('lru-cache');

module.exports = (opts) => {
    if(opts.cache) ejs.cache = LRU(100);
    return async (ctx, next) => {
        ctx.render = async (view, model) => {
            ctx.response.body = await util.promisify(ejs.renderFile)(
                            path.join('views', view),
                            Object.assign({}, model || {}, ctx.state || {}),
                            opts);
            ctx.response.type = 'text/html';
        };
        await next();
    };
};
