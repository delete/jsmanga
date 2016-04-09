'use strict';

module.exports = (name, chapter) => {

  const request = require('request');
  const cheerio = require('cheerio');
  const fs = require('fs');

  const MAIN_URL = "http://mangaonline.com.br";
  
  let MANGA_DATA = {
    "name": name,
    "url": `${MAIN_URL}/capitulo.php?act=getImg&anime=${name}&capitulo=${chapter}`,
    "imageUrl": `${MAIN_URL}/images/mangas/`
  };

  //Starts everythink
  (() => {
    listAllChapters();
  })();
  
  function listAllChapters(){
    let options = {
      url: MANGA_DATA.url,
    };
    function callback (error, response, body) {
      if (!error) {
        let number_of_chapters = getChaptersAndMangaNumbers(body);

        if(!number_of_chapters) { number_of_chapters = 0 }

        console.log("Número de páginas: " + number_of_chapters);

        for (let i = 1; i <= number_of_chapters; i++) {
          downloadImage(chapter, i);
        }
      }  
    }
    request(options, callback);
  };

  function getChaptersAndMangaNumbers(body){
    // TODO: Improve this function, it is difficult to read.
    let $ = cheerio.load(body);
    let chapters = $('.text-destaque').text().replace("\t", " ").trim().split("\t");

    chapters = chapters[chapters.length - 1].split(' ');

    // Get the manga number, to create the imageUrl.
    let mangaNumber = $('.imagemCapitulo').attr('src').split('/')[5];

    MANGA_DATA.imageUrl += mangaNumber + '/';
    
    //Return the last one
    return chapters[chapters.length - 1];
  };

  function downloadImage(chapter, number){
    const imageUrl = generateImageUrl(chapter, number);
    const  options = {
      url: imageUrl
     ,headers: MANGA_DATA.headers
    };

    const filename = 'capitulo-' + number + '.jpg';

    let dir = createFolder(MANGA_DATA.name + '-' + chapter);
    let path_to_save = dir + filename;
    
    function callback(){
      console.log('Arquivo salvo ' + filename)
    }    
    request(options).pipe(fs.createWriteStream(path_to_save)).on('close', callback);
  };

  function generateImageUrl(chapter, number){
    if ( number < 10 ) {
      number = '0' + number
    }
    return MANGA_DATA.imageUrl + chapter + '/' + number + '.jpg';
  };

  function createFolder(path) {
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
    return path + '/'
  }
};
