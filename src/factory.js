module.exports = (mangaName, chapter) => {
  'use strict';

  const fs = require('fs');

  // Modules
  const one_piece = JSON.parse(fs.readFileSync('./src/modules/one_piece.json', 'utf8'));
  const bleach = JSON.parse(fs.readFileSync('./src/modules/bleach.json', 'utf8'));
  const dragon_ball_super = JSON.parse(fs.readFileSync('./src/modules/dragon-ball-super.json', 'utf8'));

  const name = mangaName.toLowerCase();

  if (name == 'one piece'){
    require('./spider')(one_piece, chapter);
  } else if (name == 'bleach'){
    require('./spider')(bleach, chapter); 
  } else if (name == 'dragon ball super'){
    require('./spider')(dragon_ball_super, chapter); 
  } else {
    console.log("Nenhum manga com esse encontrado.");
  }
}