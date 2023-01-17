require('../../config')
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * 
 * @param {*} xor || undefined
 * @returns 
 */
function wallpaper(xor = undefined) {
  return new Promise((resolve, reject) => {
    try {
      if (xor === undefined) {
        var link = 'https://wall.alphacoders.com/by_category.php?id=3&name=Anime+Wallpapers&filter=4K+Ultra+HD'
      } else {
        var link = 'https://wall.alphacoders.com/search.php?search=' + xor
      }
      axios.get(link)
        .then(({ data }) => {
          const $ = cheerio.load(data)
          let anime = []
          $('div.thumb-container-big > .thumb-container > .boxgrid > a > picture > img').each((u, i) => {
            let ajg = $(i).attr('src')
            if (typeof ajg === 'undefined') return
            anime.push($(i).attr('src'))
          })
          resolve(xoriznn(anime))
        }).catch((err) => { resolve({ creator: '@xorizn', mess: `No Search Results Found` }) })
    } catch (e) { console.log(e) }
  })
}

module.exports.wallpaper = wallpaper