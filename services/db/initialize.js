require('../../as-entry');

(async() => {
    const fs = require('fs');
    const db = require('.');

    const models = require(':models/_relationships').models;
    await db.dbSync();
    
    for(let name in models) {
        if(typeof models[name]._seeds === 'function') {
            await models[name]._seeds();
        }
    }
    console.log('Init db ok.');
    process.exit(0);
})();
