require('../../config');
const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');

function CloudeSearch(xor) {
  return new Promise((resolve, reject) => {
    axios.get(`https://soundcloud.com/search?q=${xor}`)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        let ajg = []
        $('#app > noscript').each((u, i) => {
          ajg.push($(i).html())
        })
        const _$ = cheerio.load(ajg[1])
        let hasil = []
        _$('ul > li > h2 > a').each((i, u) => {
          if ($(u).attr('href').split('/').length === 3) {
            var linkk = $(u).attr('href')
            var judul = $(u).text()
            var link = linkk ? linkk : 'Tidak ditemukan'
            var jdi = `https://soundcloud.com${link}`
            var jadu = judul ? judul : 'Tidak ada judul'
            hasil.push({
              link: jdi,
              judul: jadu
            })
          }
        })
        if (hasil.every(x => x === undefined)) return resolve({ creator: '@xorizn', mess: `No Search Results Found` })
        resolve(xoriznn(hasil))
      })
      .catch((err) => {
        resolve({ creator: '@xorizn', mess: `maybe ${xor} search does not exist` })
      })
  })
}

function CloudeDown(xor) {
  return new Promise(async (resolve, reject) => {
    try {
      const getToken = await axios.get('https://soundcloudmp3.org/', {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
          "cookie": "XSRF-TOKEN=eyJpdiI6ImsrUTZJTVQxbWwwSGZHWkFVem16SkE9PSIsInZhbHVlIjoiMFA0RFk1ZFE0dzI4emJ0VWZFZGVSSGxwd3U2NkhzK2g5XC9xekFtNE1kajdGaVJvUHZMdUJ6SUR6XC9qQm55NUtaZGVlU0llSE5TRmtGM2xKOGRnYUJQZz09IiwibWFjIjoiY2YxNjQxOWRiNDNkODlmYzQ4M2Q0ZTdlNTUxNmQ0MDVhNTFkMGI0MTVlNzZlY2NlMDNhYTBkODg2MzE4YTk5YyJ9; laravel_session=eyJpdiI6Im8zbUk1UkRSOHpDanBXVzJpdmRNZXc9PSIsInZhbHVlIjoiWlNTRnVYZVwvb21PRjJhaU81UFRKRDRIb0dOUWRPSjAxcGV1MEhYV1NnbTA4M0FvT2lJQmQrb3JDRzh4Y3UxTkdlNFwvSlhLSnF4TmZUTHRUUVBPNGNTQT09IiwibWFjIjoiMDQwZTFlNDNkYzFlOWNhOTVlM2E3NDNlM2M5N2MyNTkyMTQ1ZTQwNGYwNGQ2ZDlhYTY0MTE4Nzc0M2UzMGEwMCJ9"
        }
      })
      let dom = new JSDOM(getToken.data).window.document
      let a = dom.querySelector('#conversionForm').innerHTML
      token = /<input name="_token" type="hidden" value="(.*?)">/g.exec(a)[1]
      let config = {
        _token: token,
        lang: "en",
        url: xor,
        submit: ''
      }
      axios('https://soundcloudmp3.org/converter', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
          "cookie": "XSRF-TOKEN=eyJpdiI6ImsrUTZJTVQxbWwwSGZHWkFVem16SkE9PSIsInZhbHVlIjoiMFA0RFk1ZFE0dzI4emJ0VWZFZGVSSGxwd3U2NkhzK2g5XC9xekFtNE1kajdGaVJvUHZMdUJ6SUR6XC9qQm55NUtaZGVlU0llSE5TRmtGM2xKOGRnYUJQZz09IiwibWFjIjoiY2YxNjQxOWRiNDNkODlmYzQ4M2Q0ZTdlNTUxNmQ0MDVhNTFkMGI0MTVlNzZlY2NlMDNhYTBkODg2MzE4YTk5YyJ9; laravel_session=eyJpdiI6Im8zbUk1UkRSOHpDanBXVzJpdmRNZXc9PSIsInZhbHVlIjoiWlNTRnVYZVwvb21PRjJhaU81UFRKRDRIb0dOUWRPSjAxcGV1MEhYV1NnbTA4M0FvT2lJQmQrb3JDRzh4Y3UxTkdlNFwvSlhLSnF4TmZUTHRUUVBPNGNTQT09IiwibWFjIjoiMDQwZTFlNDNkYzFlOWNhOTVlM2E3NDNlM2M5N2MyNTkyMTQ1ZTQwNGYwNGQ2ZDlhYTY0MTE4Nzc0M2UzMGEwMCJ9"
        }
      }).then(({ data }) => {
        let tot = []
        const $ = cheerio.load(data)
        let link = $('#ready-group > a').attr('href')
        let img = $('#preview > div.info.clearfix > img').attr('src')
        $('#preview > div.info.clearfix > p').each(function (i, u) { tot.push($(u).text().replace(':', ': ')) })
        resolve(xoriznn({
          title: tot[0],
          link: link ? link : 'err',
          img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
          cap: `├ ${tot.join("\n├ ")}`
        }))
      }).catch((err) => { resolve({ creator: '@xorizn', mess: `maybe ${xor} search does not exist` }) })
    } catch (e) {
      console.log(e)
    }
  })
}

module.exports = { CloudeDown, CloudeSearch }