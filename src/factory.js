'use strict';

module.exports = (mangaName, chapter) => {

  const fs = require('fs');

  const formatedName = textFormating(mangaName);
  const mangaPath = `./src/modules/${formatedName}.json`;
  const mangaData = JSON.parse(fs.readFileSync(mangaPath, 'utf8'));

  require('./spider')(mangaData, chapter);
  
  function textFormating(string) {
    return string.toLowerCase().split(' ').join('-');
  }
}