module.exports = (mangaName, chapter) => {
  'use strict';

  const fs = require('fs');

  // Modules
  const one_peace = JSON.parse(fs.readFileSync('./src/modules/one_peace.json', 'utf8'));

  const name = mangaName.toLowerCase();

  if (name == 'one peace'){
    require('./spider')(one_peace, chapter);
  }
  else {
    console.log("Nenhum manga com esse encontrado.");
  }
}