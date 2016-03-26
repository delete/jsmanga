
module.exports = (mangaData, chapter) => {
  'use strict';

  const request = require('request');
  const cheerio = require('cheerio');
  const fs = require('fs');
  
  //Starts everythink
  (() => {
    generate_mainUrl(chapter);
    listAllChapters();
  })();
  
  function generate_mainUrl (chapter) {
    // The URL will be: Ex for chapter 800
    // http://mangaop.info/capitulos/800#1
    mangaData.url += chapter + '#1'
  }
  
  function listAllChapters(){
    let options = {
      url: mangaData.url,
    };
    console.log(mangaData.url)
    function callback (error, response, body) {
      if (!error) {
        let number_of_chapters = getChapters(body);

        if(!number_of_chapters) { number_of_chapters = 0 }

        console.log("Número de páginas: " + number_of_chapters);

        for (let i = 1; i <= number_of_chapters; i++) {
          download_image(chapter, i);
        }
      }  
    }
    request(options, callback);
  };

  function getChapters(body){
    let $ = cheerio.load(body);
    let chapters = $("#capPages").text().replace("\t", " ").trim().split("\t");

    //Return the last one
    return chapters[chapters.length - 1];
  };

  function download_image(chapter, number){
    const imageUrl = generate_imageUrl(chapter, number);
    const  options = {
      url: imageUrl
     ,headers: mangaData.headers
    };

    const filename = 'capitulo-' + number + '.jpg';

    let dir = createFolder('capitulo-' + chapter);
    let path_to_save = dir + filename;
    
    function callback(){
      console.log('Arquivo salvo ' + filename)
    }    
    request(options).pipe(fs.createWriteStream(path_to_save)).on('close', callback);
  };

  function generate_imageUrl(chapter, number){
    if ( number < 10 ) {
      number = '0' + number
    }
    return mangaData.imageUrl + chapter + '-' + number + '.jpg';
  };

  function createFolder(path) {
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
    return path + '/'
  }
};