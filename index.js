'use strict';

let argv = require('yargs')
  .usage('Usage: $0 --manga [string] --chapter [num]')  
  .demand(['manga', 'chapter'])
  .argv;

(() => {
  require('./src/factory')(argv.manga, argv.chapter);
})();
