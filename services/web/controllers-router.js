function addMapping(router, mapping) {
    for(var url in mapping) {
        if(url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if(url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if(url.startsWith('DELETE ')) {
            let path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else if(url.startsWith('PUT ')) {
            let path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    const path = require('path');
    const fs = require('fs');
    var files = fs.readdirSync('controllers/');

    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for(var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(path.join('~/controllers/', f));
        addMapping(router, mapping);
    }
}

module.exports = function(dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}
