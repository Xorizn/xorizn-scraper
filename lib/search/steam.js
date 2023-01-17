require('../../config')
const axios = require('axios');
const cheerio = require('cheerio');

function steam(querry) {
  return new Promise((resolve, reject) => {
    axios.get('https://store.steampowered.com/search/?term=' + querry)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        var hasil = []
        $('#search_resultsRows > a').each((a, b) => {
          link = $(b).attr('href')
          judul = $(b).find(`div.responsive_search_name_combined > div.col.search_name.ellipsis > span`).text()
          harga = $(b).find(`div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow `).text().replace(/ /g, '').replace(/\n/g, '')
          rating = $(b).find(`div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span`).attr('data-tooltip-html')
          img = $(b).find(`div.col.search_capsule > img`).attr('src')
          rilis = $(b).find(`div.responsive_search_name_combined > div.col.search_released.responsive_secondrow`).text()

          if (typeof rating === 'undefined') {
            var rating = 'no ratings'
          }
          if (rating.split('<br>')) {
            hhh = rating.split('<br>')
            var rating = `${hhh[0]} ${hhh[1]}`
          }
          hasil.push({
            judul: judul,
            img: img,
            link: link,
            rilis: rilis,
            harga: harga ? harga : 'no price',
            rating: rating
          })
        })
        if (hasil.every(x => x === undefined)) return resolve({ mess: 'No result found'})
        resolve(xoriznn(hasil))
      }).catch((err) => {
        resolve({
          creator: '@xorizn',
          mess: 'cant find games'
        })
      })
  })
}

function detailsteam(link) {
  return new Promise((resolve, reject) => {
    axios.get(link)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        let xorizn = []
        let img = $('#gameHeaderImageCtn > img').attr('src')
        $('div.game_area_sys_req.sysreq_content.active > div > ul > ul > li').each((u, i) => { xorizn.push($(i).text()) })
        let hasil = $('#genresAndManufacturer').html().replace(/\n/g, '').replace(/<br>/g, '\n').replace(/\t/g, '').replace(/<b>/g, '').replace(/<\/div>/g, '\n').replace(/ /g, '').replace(/<\/b>/g, ' ').replace(/<[^>]*>/g, '')
        let desc = $('div.game_description_snippet').text().replace(/\t/g, '').replace(/\n/g, '')
        resolve(xoriznn({
          desc: desc ? desc : 'Error',
          img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
          system: xorizn.join('\n') ? xorizn.join('\n') : 'Error',
          info: hasil
        }));
      }).catch((err) => {
        resolve({
          creator: '@xorizn',
          mess: `cant access ${link} game `
        })
      })
  })
}

module.exports = {
  steam,
  detailsteam
}