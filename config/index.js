const fs = require('fs');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const defaultConfig = './default';
const envFolder = './environments/';

let config = null;

console.log(`Load ${defaultConfig}...`);
config = require(defaultConfig);

try {
    let envConfig = envFolder + process.env.NODE_ENV;
    console.log(`Load ${envConfig}...`);
    Object.assign(config, require(envConfig));
} catch (err) {
    console.error(`Cannot load environment config.`);
}

module.exports = config;
