module.exports = {
    pick(source, arr) {
        return  arr.reduce( (iter, val) => {
                    if(val in source)
                        iter[val] = source[val]
                    return iter;
                }, {});
    },
    rename(source, obj) {
        let res = {};
        for(name in source) {
            res[name in obj ? obj[name] : name] = source[name];
        }
        return res;
    },
    union(source, obj) {
        return Object.assign({}, source, obj);
    }
};
