require('../../config')
const axios = require('axios');
const cheerio = require('cheerio');

function playstore(xor) {
  return new Promise((resolve, reject) => {
    axios.get(`https://play.google.com/store/search?q=${xor}&c=apps`)
      .then(({ data }) => {
        var hasil = []
        const $ = cheerio.load(data)
        $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
          let linkk = $(u).attr('href')
          let nama = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text()
          let developer = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text()
          let img = $(u).find('.j2FCNc > img').attr('src')
          let rate = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label')
          let rate2 = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text()
          let link = `https://play.google.com${linkk}`

          hasil.push({
            link: link,
            nama: nama ? nama : 'No name',
            developer: developer ? developer : 'No Developer',
            img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
            rate: rate ? rate : 'No Rate',
            rate2: rate2 ? rate2 : 'No Rate',
            link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}`
          })
        })
        if (hasil.every(x => x === undefined)) return resolve({ mess: 'No result found' })
        resolve(xoriznn(hasil))
      }).catch((err) => {
        resolve({ creator: '@xorizn', mess: `maybe ${xor} search does not exist` })
      })
  })
}

module.exports.playstore = playstore