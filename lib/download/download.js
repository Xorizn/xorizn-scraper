require('../../config');
const axios = require("axios");
const cheerio = require("cheerio");
const { JSDOM } = require('jsdom');

async function instagram(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let config = {
        'url': url,
        'submit': ''
      }
      axios('https://downloadgram.org/', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46",
          "cookie": "_ga=GA1.2.2121395638.1671172225; _gid=GA1.2.519005301.1671172225; __gads=ID=e8410c1ba2d24a2d-22a64184ebd800f4:T=1671172219:RT=1671172219:S=ALNI_Mb1AgoUIMTEUaH7QfenBiIcWRELPg; __gpi=UID=00000b914d13b7b4:T=1671172219:RT=1671172219:S=ALNI_MZgo_0w4Isg0hciJVVVjg4RKcl1Pg; __atuvc=5%7C50; __atuvs=639c1080f62ec79d004; _gat_gtag_UA_142480840_1=1; FCNEC=%5B%5B%22AKsRol_PHRocR55hohw-JKbsqqpOx2xRcc645IImzRbkPjvUNzvwUqhcVVIfIDT7C6K_uwGWhqhVk-bAQC0bdKMBlkhj2nhPpDB5sjKqbw8fGdof8FkpatvwsibBPVnx1ekvZnLk29coUmy59u5TSez4HH8_1SNv1Q%3D%3D%22%5D%2Cnull%2C%5B%5D%5D"
        }
      })
        .then(({ data }) => {
          const $ = cheerio.load(data)
          let hasil = []
          $('#downloadhere > a').each(function(i,u){
            hasil.push($(u).attr('href'))
          })
          if (hasil.every(x => x === undefined)) return resolve({ mess: 'No result found', link: 'https://i.ibb.co/G7CrCwN/404.png', slide: ['https://i.ibb.co/G7CrCwN/404.png'] })
          resolve(xoriznn({
            link: hasil[0],
            slide: hasil,
            slide_length: hasil.length
          }))
        }).catch((error) => {
          resolve({ mess: 'Server is busy' })
        })
    } catch (error) {
      resolve(error);
    }
  })
}

async function fbdwn(link) {
  return new Promise(async (resolve, reject) => {
    try {
      let config = {
        'id': link,
        'locale': 'id'
      }
      axios('https://getmyfb.com/process', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          "cookie": "PHPSESSID=914a5et39uur28e84t9env0378; popCookie=1; prefetchAd_4301805=true"
        }
      })
        .then(({ data }) => {
          const $ = cheerio.load(data)
          let thumb = $('div.container > div.results-item > div.results-item-image-wrapper').find('img').attr('src')
          let desc = $('div.container > div.results-item > div.results-item-text').text().trim()
          let video_hd = $('div.container > div.results-download > ul > li:nth-child(1) > a').attr('href')
          let video_sd = $('div.container > div.results-download > ul > li:nth-child(2) > a').attr('href')
          resolve(xoriznn({
            desc: desc,
            thumb: thumb,
            video_sd: video_sd,
            video_hd: video_hd
          }))
        }).catch((e) => {
          console.log(e)
          resolve({ creator: '@xorizn', mess: `Server is busy` })
        })
    } catch (error) {
      console.log(error);
    }
  })
}
async function twdwn(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let config = {
        'URL': url
      }
      axios('https://twdown.net/download.php', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          "cookie": "PHPSESSID=914a5et39uur28e84t9env0378; popCookie=1; prefetchAd_4301805=true"
        }
      })
        .then(({ data }) => {
          const $ = cheerio.load(data)
          let thumb = $('img.img-thumbnail').attr('src')
          let author = $('div[style="overflow-wrap: break-word;"].col-md-6 > h4').text()
          let link = $('div[style="overflow-wrap: break-word;"].col-md-6 > p').text()
          let hasil = []
          $('div.col-md-8.col-md-offset-2 > table > tbody > tr > td').each(function (a, b) {
            let xor = $(b).find('a').attr('href')
            if (typeof xor === 'undefined' || xor.startsWith('#')){
            } else {
              hasil.push($(b).find('a').attr('href'))
            }
          })
          resolve(xoriznn({
            thumb: thumb,
            author: author,
            id_link: link,
            video: hasil[0],
            audio: `https://twdown.net/${hasil.pop()}`
          }))
        }).catch((error) => {
          resolve({ creator: '@xorizn', mess: `Server is busy` })
          console.error(error)
        })
    } catch (error) {
      console.log(error)
    }
  })
}
function joox(query) {
  return new Promise((resolve, reject) => {
    const time = Math.floor(new Date() / 1000)
    axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
      .then(({ data }) => {
        let result = []
        let hasil = []
        let promoses = []
        let ids = []
        data.itemlist.forEach(result => {
          ids.push(result.songid)
        });
        for (let i = 0; i < data.itemlist.length; i++) {
          const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
          promoses.push(
            axios.get(get, {
              headers: {
                Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
              }
            })
              .then(({ data }) => {
                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                hasil.push({
                  lagu: res.msong,
                  album: res.malbum,
                  penyanyi: res.msinger,
                  publish: res.public_time,
                  img: res.imgSrc,
                  mp3: res.mp3Url
                })
                Promise.all(promoses).then(() => resolve(xoriznn(hasil))).catch((error) => {
                  resolve({ mess: 'Error, no result found' })
                })
              }).catch((error) => {
                resolve({ mess: 'Error, no result found'})
              })
          )
        }
      }).catch((error) => {
        resolve({ mess: 'Server is busy' })
      })
  })
}

function mediafire(link) {
  return new Promise((resolve, reject) => {
    axios.get(link)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        let name = $('.dl-info > div > div.filename').text();
        let link = $('#downloadButton').attr('href');
        let det = $('ul.details').text();
        let type = $('.dl-info > div > div.filetype').text();
        if (typeof link === undefined) return resolve({ mess: 'No result found' })
        let hasil = {
          filename: name,
          filetype: type,
          link: link,
          detail: det
        };
        resolve(xoriznn(hasil));
      })
      .catch((err) => {
        resolve({ mess: 'Not found'})
      });
  });
};

module.exports = {
  instagram,
  fbdwn,
  twdwn,
  joox,
  mediafire
}