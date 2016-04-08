'use strict';

module.exports = (mangaName, chapter) => {

  const formatedName = require('./textFormating')(mangaName);
  
  require('./spiders/animeOnlineSpider.js')(formatedName, chapter);

}