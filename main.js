"use strict";
const { textpro } = require('./lib/textpro/index')
module.exports.search = require('./lib/search/index'); //11 cek list
module.exports.image = require('./lib/image/index'); //5 cek list
module.exports.download = require('./lib/download/index'); //9 cek list
module.exports.anime = require('./lib/anime/index'); //5 gak peduli
module.exports.news = require("./lib/news/index"); //5 cek list
module.exports.textpro = textpro//1 ceklist
module.exports.stalk = require('./lib/stalk/index') //2 ceklist
module.exports.random = require('./lib/random/index') //4 ceklist