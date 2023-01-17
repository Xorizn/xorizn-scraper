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

function kompas(ktgr) {
  return new Promise(async (resolve, reject) => {
    let _ktgr = ktgr.toLowerCase();
    let list = ['terpopuler', 'terkini', 'global'];
    if (!list.includes(_ktgr)) return resolve({ mess: `select one of the categories\n\navailable:\n${list.join('\n')}`})
    let _data = []
    if (ktgr === 'terpopuler') {
      var res = await get('https://indeks.kompas.com/terpopuler')
      if (res.mess) return resolve(res)
      res('div.col-bs10-7 div.latest--indeks div.article__list').each((i, u) => {
        var hasil = {
          judul: res(u).find('div.article__list__title h3').text(),
          tanngal: res(u).find('div.article__list__info div.article__date').text(),
          img: res(u).find('div.article__list__asset div.article__asset img').attr('src'),
          link: res(u).find('div.article__list__title h3 a').attr('href')
        }
        _data.push(hasil)
      })
    } else if (ktgr === 'terkini') {
      var res = await get('https://news.kompas.com/')
      if (res.mess) return resolve(res)
      res('div.col-bs10-7 div.latest div.ga--latest div.row div.col-bs9-3').each((i, u) => {
        var hasil = {
          judul: res(u).find('div.article__grid div.article__box h3.article__title a').text(),
          deskripsi: res(u).find('div.article__grid div.article__box div.article__lead').text(),
          tanggal: res(u).find('div.article__grid div.article__box div.article__date').text(),
          artikel: res(u).find('div.article__grid div.article__boxsubtitle h2').text().trim(),
          img: res(u).find('div.article__grid div.article__asset a img').attr('data-src'),
          link: res(u).find('div.article__grid div.article__asset a').attr('href')
        }
        _data.push(hasil)
      })
    } else if (ktgr === 'global') {
      var res = await get('https://www.kompas.com/global')
      if (res.mess) return resolve(res)
      res('div.row div.col-bs10-7 div.trenLatest div.trenLatest__item').each((i, u) => {
        var hasil = {
          judul: res(u).find('div.trenLatest__box h3.trenLatest__title').text().trim(),
          tanggal: res(u).find('div.trenLatest__box div.tren__date').text(),
          img: res(u).find('div.trenLatest__img a img').attr('src'),
          link: res(u).find('div.trenLatest__img a').attr('href')
        }
        _data.push(hasil)
      })
    } else {
      resolve({ mess: `Select an available category!!` })
    }
    if (_data.every(x => x === undefined)) return resolve({ mess: 'No result found' })
    resolve(xoriznn(_data))
  })
}

module.exports.kompas = kompas