const Sequelize = require('sequelize');
const dbconf = require('~/config').database;

console.log('Init sequelize...');
let sequelize = new Sequelize(dbconf.dbname, dbconf.username, dbconf.password,
    {
        host: dbconf.host,
        dialect: dbconf.dialect,
        port: dbconf.port,
        define: {
            underscored: true
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        operatorsAliases: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

module.exports = {
    model: function(name, attributes, options) {
        if(sequelize.isDefined(name))
            return sequelize.model(name);
        var attrs = {};
        for(let key in attributes) {
            let value = attributes[key];
            if(typeof value === 'object' && value['type']) {
                value.allowNull = value.allowNull || false;
                attrs[key] = value;
            } else {
                attrs[key] = { type: value, allowNull: false };
            }
        }
        return sequelize.define(name, attrs, options);
    },
    dbSync: async() => {
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    },
    Op: Sequelize.Op,
    ... Sequelize.DataTypes
};

require(':models/_relationships');
