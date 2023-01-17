require('../../config')
const axios = require('axios');
const cheerio = require('cheerio');

function JadwalTv(xor) {
  return new Promise((resolve, reject) => {
    try {
      let xr = xor.toLowerCase()
      axios.get('https://www.jadwaltv.net/channel/' + xr)
        .then(({ data }) => {
          const $ = cheerio.load(data)
          let tv = []
          $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
            an = $(i).text().split('WIB')
            tv.push(`${an[0]} - ${an[1]}`)
          })
          if (tv.every(x => x === undefined)) return resolve({ mess: 'No result found' })
          resolve(xoriznn(tv.join('\n')))
        }).catch((err) => { resolve({ creator: '@xorizn', mess: `${xor} channel does not exist` }) })
    } catch (e) { console.log(e) }
  })
}

function AcaraNow() {
  return new Promise((resolve, reject) => {
    try {
      axios.get('https://www.jadwaltv.net/channel/acara-tv-nasional-saat-ini')
        .then(({ data }) => {
          const $ = cheerio.load(data)
          let tv = []
          $('table.table.table-bordered > tbody > tr').each((u, i) => {
            an = $(i).text().split('WIB')
            if (an[0] === 'JamAcara') return
            if (typeof an[1] === 'undefined') return tv.push('\n' + '*' + an[0] + '*')
            tv.push(`${an[0]} - ${an[1]}`)
          })
          if (tv.every(x => x === undefined)) return resolve({ mess: 'No result found' })
          resolve(xoriznn(tv.join('\n').trim()))
        }).catch((err) => { resolve({ creator: '@xorizn', mess: `Missing channel` }) })
    } catch (e) { console.log(e) }
  })
}

function JadwalSepak() {
  return new Promise((resolve, reject) => {
    try {
      axios.get('https://www.jadwaltv.net/jadwal-sepakbola')
        .then(({ data }) => {
          const $ = cheerio.load(data)
          let tv = []
          $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
            an = $(i).html().replace(/<td>/g, '').replace(/<\/td>/g, ' - ')
            tv.push(`${an.substring(0, an.length - 3)}`)
          })
          if (tv.every(x => x === undefined)) return resolve({ mess: 'No result found' })
          resolve(xoriznn(tv.join('\n')))
        }).catch((err) => { resolve({ creator: '@xorizn', mess: `No match` }) })
    } catch (e) { console.log(e) }
  })
}

module.exports = { JadwalSepak, JadwalTv, AcaraNow }