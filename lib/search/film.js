require('../../config');
const axios = require('axios');
const cheerio = require('cheerio');

function film(xor) {
  return new Promise((resolve, reject) => {
    axios.get(`http://167.99.31.48/?s=${xor}`)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        const anjay = []
        $('#content > div > div.los').each(function (a, b) {
          $(b).find('article').each(function (c, d) {
            let title = $(d).find('div > a > div.addinfox > header > h2').text();
            let quality = $(d).find('div > a > div > div > span').text();
            let type = $(d).find('div > a > div.addinfox > div > i.type').text();
            let upload = $(d).find('div > a > div.addinfox > div > span').text();
            let link = $(d).find('div > a').attr('href');
            let thumbnail = $(d).find('div > a > div > img').attr('src');
            let result = {
              title: title,
              quality: quality,
              type: type,
              upload: upload,
              link: link,
              thumbnail: thumbnail,
            };
            anjay.push(result)
          })
        })
        if (anjay.every(x => x === undefined)) return resolve({ creator: '@xorizn', mess: `No Search Results Found` })
        resolve(xoriznn(anjay))
      }).catch(error => {
        resolve({ creator: '@xorizn', mess: `Bad request`, status: 400 })
      })
  })
}

module.exports.film = film