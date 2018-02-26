const cwd = process.cwd();
require('best-require')(cwd, {
    models: cwd + '/models',
    controllers: cwd + '/controllers',
    views: cwd + '/views',
    db: cwd + '/services/db'
});
