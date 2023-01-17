require('../../config');
const axios = require('axios');
const cheerio = require('cheerio');

function bokep(search) {
  return new Promise((resolve, reject) => {
    var scr = '?id=indonesia'
    if (search) { var scr = '?id=' + search }
    axios.get('http://164.68.127.15/' + scr)
      .then(async ({ data, headers }) => {
        const $ = cheerio.load(data)
        let ajg = []
        $('#content > .mozaique.thumbs-5 > center > .thumb-block > .thumb-inside > .thumb > a').each((i, u) => {
          ajg.push({
            nonton: 'https://164.68.127.15' + $(u).attr('href'),
            img: $(u).find('img').attr('data-src'),
            title: $(u).find('img').attr('title')
          })
        })
        if (ajg.every(x => x === undefined)) return resolve({ mess: 'No result found' })
        resolve(xoriznn(ajg))
      }).catch((err) => {
        resolve({ mess: 'Server is busy'})
      })
  })
}

module.exports.bokep = bokep