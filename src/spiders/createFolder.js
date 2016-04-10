'use strict';

module.exports = (path) => {
  const fs = require('fs');

  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
  return path + '/'
  
}