const fs = require('fs');

let files = fs.readdirSync('models');
let models = {};
files.forEach((f) => {
    if(!f.startsWith('_') && f.endsWith('.js')) {
        let name = f.substring(0, f.length - 3);
        name = name.split('-').map((f) => {
            return f.substring(0, 1).toUpperCase() + f.substring(1).toLowerCase();
        }).join('');
        models[name] = require(':models/' + f);
    }
});

const {User, Token, Answer, Forum, Swiper, Page, Favorite} = models;

User.hasMany(Token);
Token.belongsTo(User);

Page.hasOne(Swiper);
Swiper.belongsTo(Page);

User.belongsToMany(Page, {through: Favorite});
Page.belongsToMany(User, {through: Favorite});

Forum.hasOne(Page);
Page.belongsTo(Forum);

Forum.hasMany(Answer);
Answer.belongsTo(Forum);

User.hasMany(Answer);
Answer.belongsTo(User);
