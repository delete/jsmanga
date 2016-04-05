'use strict';
module.exports = (string) => {
    return string.toLowerCase().split(' ').join('-');
}