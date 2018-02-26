const db = require(':db');
let Favorite = db.model('favorite', {});

module.exports = Favorite;