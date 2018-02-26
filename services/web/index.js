const path = require('path');

module.exports = {
    start: function() {
        const conf = require('~/config');

        const Koa = require('koa');
        const bodyParser = require('koa-bodyparser');
        const logger = require('./logger')
        const controllersRouter = require('./controllers-router');
        const assetsRouter = require('./assets-router');
        const rest = require('./rest');
        const renderMounter = require('./render-mounter');
        
        const isProduction = (process.env.NODE_ENV === 'production');
        
        console.log('Initialize Koa...');
        const app = new Koa();
        
        app.use(logger());
        app.use(assetsRouter(conf.web.staticFilesUriPerfix));
        app.use(renderMounter({
            cache: isProduction,
            debug: !isProduction
        }));
        app.use(rest.restMounter(conf.web.restUriPerfix));
        app.use(bodyParser());
        app.use(controllersRouter());
        
        app.listen(conf.web.port);
        console.log(`App started at port ${conf.web.port}...`);
        return app;
    }
}
