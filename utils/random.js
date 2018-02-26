function randomString(length) {
    var str = Math.random().toString(36).substr(2);
    if (str.length >= length) {
        return str.substr(0, length);
    }
    str += randomString(length - str.length);
    return str;
}

module.exports = {
    randomString
};
