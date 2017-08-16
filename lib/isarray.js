module.exports = function isArray(v){
    return Object.prototype.toString.call(v) === '[object Array]';
};
