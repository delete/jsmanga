'use strict';

module.exports = (mangaName, chapter) => {

  const fs = require('fs');

  const formatedName = require('./textFormating')(mangaName);
  const mangaPath = `./src/modules/${formatedName}.json`;
  
  try {
    const mangaData = JSON.parse(fs.readFileSync(mangaPath, 'utf8')); 
    require('./spider')(mangaData, chapter);
  }
  catch (e) {
    console.log('Manga não encontrado.');
  }
}