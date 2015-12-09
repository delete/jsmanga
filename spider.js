var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var MAIN_URL = 'http://mangaop.info/capitulos/'

var IMAGE_URL = 'http://mangas2014.centraldemangas.com.br/one_piece/one_piece'

//These headers are used just when is downloading an image.
var HEADER_ONE_PIECE = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:42.0) Gecko/20100101 \
                   Firefox/42.0',
    'Host': 'mangas2014.centraldemangas.com.br',
    'Accept': 'image/png,image/*;q=0.8,*/*;q=0.5',
    'Accept-Language': 'pt-BR,en;q=0.5',
    'Referer': 'http://mangaop.info/capitulos/747'
}

function main () {
	var args = process.argv.slice(2);
	download_chapter(args[0]);
}


function download_chapter (chapter) {

	var url = generate_mainUrl(chapter);

	var options = {
		url : url,
	};

	function callback(error, response, body) {
		if (!error) {
			number_of_chapters = get_chapters(body);

			if(!number_of_chapters){ number_of_chapters = 0 }
			
			console.log("Número de páginas: " + number_of_chapters);

			for (var i = 1; i <= number_of_chapters; i++) {
				download_image(chapter, i);
			};
		}
	}

	request(options, callback);

}


function generate_mainUrl (chapter) {
	// The URL will be: Ex for chapter 800
	// http://mangaop.info/capitulos/800#1
	return MAIN_URL + chapter + '#1'
}


function get_chapters (body) {
	var $ = cheerio.load(body);

	var chapters = $("#capPages").text().replace("\t", " ").trim().split("\t");

	// Return the last one.
	return chapters[chapters.length - 1];
}


function download_image (chapter, number) {

	var imageUrl = generate_imageUrl(chapter, number);

	var options = {
		url : imageUrl,
		headers: HEADER_ONE_PIECE
	};

	var filename = 'capitulo-' + number + '.jpg';

	var dir = create_folder(chapter)
	var path_to_save = dir + filename

	request(options).pipe(fs.createWriteStream(path_to_save)).on('close', callback);

	function callback () {
		console.log('Arquivo salvo ' + filename)
	}
}


function generate_imageUrl (chapter, number) {
	// The URL will be: Ex for chapter 800 and number 1
	// http://mangas2014.centraldemangas.com.br/one_piece/one_piece800-01.jpg
	if (number < 10) {
		number = '0' + number
	}
	return IMAGE_URL + chapter + '-' + number + '.jpg' 
}


function create_folder(chapter) {
	var dir = 'capitulo-' + chapter;

	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}
	return dir + '/'
}


// Starts everything
main();