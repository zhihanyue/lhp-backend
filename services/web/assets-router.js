const path = require('path');
const fs = require('fs');
const util = require('util');
const mime = require('mime');

module.exports = (uri) => {
    return async (ctx, next) => {
        let reqPath = ctx.request.path;
        if(reqPath.startsWith(uri)) {
            let filePath = path.join('./assets/', reqPath.substring(uri.length));
            try {
                ctx.response.body = await util.promisify(fs.readFile)(filePath);
                ctx.response.type = mime.getType(reqPath);
            } catch(e) {
                ctx.response.status = 404;
            }
        } else await next();
    };
};
