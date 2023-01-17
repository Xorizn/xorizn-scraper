require("../../config");
const axios = require("axios");
const cheerio = require("cheerio");

const get = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        resolve($)
      }).catch((err) => {
        resolve({ mess: 'Server is busy' })
      })
  })
}

function RumahKeadilan() {
  return new Promise(async (resolve, reject) => {
    let _data = []
    var res = await get('https://rumahkeadilan.co.id/')
    if (res.mess) return resolve(res)
    res('div.site div.content-area article').each((i, u) => {
      var hasil = {
        judul: res(u).find('div.inside-article header h2').text(),
        penulis: res(u).find('div.inside-article header span').first().text().replace('by', ''),
        deskripsi: res(u).find('div.inside-article div.entry-summary p').text().replace('Baca Selengkapnya', ''),
        tautan: res(u).find('div.inside-article div.post-image a').attr('href'),
        thumbnail: res(u).find('div.inside-article div.post-image a img').attr('data-lazy-src')
      }
      _data.push(hasil)
    })
    if (_data.every(x => x === undefined)) return resolve({ mess: 'No result found' })
    resolve(xoriznn(_data))
  })
}

module.exports.RumahKeadilan = RumahKeadilan