const db = require(':db');
let Swiper = db.model('swiper', {
    title: db.STRING(50),
    image_url: db.STRING(100)
});

module.exports = Swiper;
