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

function cnbc(ktgr) {
  return new Promise(async (resolve, reject) => {
    let _ktgr = ktgr.toLowerCase()
    let list = ['news', 'market', 'investment', 'entrepreneur', 'syariah', 'tech', 'lifestyle'];
    if (!list.includes(_ktgr)) return resolve({ mess: `select one of the categories\n\navailable:\n${list.join('\n')}` })
    let _data = []
    let link
    if (/news/.test(_ktgr)) link = 'https://www.cnbcindonesia.com/news'
    if (/market/.test(_ktgr)) link = 'https://www.cnbcindonesia.com/market'
    if (/investment/.test(_ktgr)) link = 'https://www.cnbcindonesia.com/investment'
    if (/entrepreneur/.test(_ktgr)) link = 'https://www.cnbcindonesia.com/entrepreneur'
    if (/syariah/.test(_ktgr)) link = 'https://www.cnbcindonesia.com/syariah'
    if (/tech/.test(_ktgr)) link = 'https://www.cnbcindonesia.com/tech'
    if (/lifestyle/.test(_ktgr)) link = 'https://www.cnbcindonesia.com/lifestyle'
    var res = await get(link)
    if (res.mess) return resolve(res)
    res('article').each((i, u) => {
      let link = res(u).find('a').attr('href')
      let title = res(u).find('a').attr('dtr-ttl')
      let time = res(u).find('a > .box_text > .date').text()
      let img = res(u).find('a > .box_img > .lqd > img').attr('src')
      if (typeof link === 'undefined') return
      let hasil = {
        waktu: time,
        title: title,
        img: img,
        link: link
      }
      _data.push(hasil)
    })
    if (_data.every(x => x === undefined)) return resolve({ mess: 'No result found' })
    resolve(xoriznn(_data))
  })
}

module.exports.cnbc = cnbc