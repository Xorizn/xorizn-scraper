require('../../config')
const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const google = require('google-it');

const link = (text) => {
  return new Promise((resolve, rejects) => {
    google({ 'query': text })
      .then(res => {
        if (res.every((x) => x === undefined)) return resolve({  mess: `Cannot find ${text} song` })
        for (let g of res) {
          if (g.link.startsWith('https://genius.com')) return resolve({ link: g.link })
          if (!g.link.startsWith('https://genius.com')) return resolve({ mess: `Cannot find ${text} song` })
        }
      }).catch(errr => {
        rejects(errr)
      })
  })
}

async function lirik(xor) {
  return new Promise(async (resolve, rejects) => {
    let input = await link(`lyrics ${xor} genius`)
    if(!input.link) return resolve({  mess: `Cannot find ${xor} song` })
    axios.get(input.link, {
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    })
      .then(({ data }) => {
        const $ = cheerio.load(data)
        const lk = $('div.Lyrics__Container-sc-1ynbvzw-6.YYrds').html()
        if (lk === undefined || lk === null) {
          resolve({ mess: `Cannot find ${xor} song` })
        } else {
          resolve(xoriznn(lk.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '')));
        }
      })
      .catch((err) => {
        console.error(err)
        resolve({
          creator: '@xorizn',
          mess: `Cannot find ${xor} song`
        })
      })
  })
}

module.exports.lirik = lirik