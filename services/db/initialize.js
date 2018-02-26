require('../../as-entry');

(async() => {
    const fs = require('fs');
    const db = require('.');
    
    // [TODO] 多级目录model支持
    let models = fs.readdirSync('models')
                  .filter((f) => f.endsWith('.js'))
                  .map((f) => require(':models/' + f));
    await db.dbSync();
    
    for(let m of models) {
        if(typeof m._seeds === 'function') {
            await m._seeds();
        }
    }
    console.log('Init db ok.');
    process.exit(0);
})();
