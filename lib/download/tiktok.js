require('../../config');
const axios = require("axios");
const cheerio = require("cheerio");
const { JSDOM } = require('jsdom');
const until = require('util')

async function shortener(url) {
  return url;
}
const clear = (data) => {
  try {
    let regex = /(<([^>]+)>)/gi;
    data = data.replace(/(<br?\s?\/>)/gi, " \n");
    return data.replace(regex, "");
  } catch (e) {
    console.log(e)
  }
}
async function tiktok(url) {
  return new Promise((resolve, reject) => {
    let config = { query: url }
  axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries(config)),
  })
    .then(async({ data }) => {
      if (data.mess) return resolve({ mess: data.mess })
      let ar = []
      let aud = []
      let wm = []
      let nowm = await shortener((data.play_url || "").replace("https", "http"))
      let res = {
        thumb: data.cover,
        v_id: data.vid,
        desc: data.desc ? data.desc : 'No desc',
        nowm: nowm,
        author: {
          author: data.author,
          author_name: data.author_name,
          author_profile: data.author_a,
        }
      }
      for (let i of data.links) {
        let link = await shortener((i.a || "").replace("https", "http"))
        if (i.t === '<b> MP4</b>') {
          ar.push(link)
          res.other_video_link = ar
        } else if (i.s === 'Watermarked') {
          res.wm = link
        } else if (i.t === '<b>♪ MP3 Audio</b>') {
          aud.push({
            link: link,
            title: i.s
          })
          res.audio = aud[0]
        }
      }
      resolve(xoriznn(res))
    }).catch((e) => { resolve({ mess: 'Error server is busy' }) })
  })
};

function musically(URL) {
  return new Promise((resolve, rejecet) => {
    axios.get('https://musicaldown.com/id', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0'
      }
    }).then(res => {
      const $ = cheerio.load(res.data)
      const url_name = $("#link_url").attr("name")
      const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
      const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
      const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
      let data = {
        [`${url_name}`]: URL,
        [`${token_name}`]: token_,
        verify: verify
      }
      axios.request({
        url: 'https://musicaldown.com/id/download',
        method: 'post',
        data: new URLSearchParams(Object.entries(data)),
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
          'cookie': res.headers["set-cookie"]
        }
      }).then(respon => {
        const ch = cheerio.load(respon.data)
        axios.request({
          url: 'https://musicaldown.com/id/mp3',
          method: 'post',
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0',
            'cookie': res.headers["set-cookie"]
          }
        }).then(resaudio => {
          let vdlk = ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)').attr('href')
          if (typeof vdlk === 'undefined') return resolve({ mess: 'Infalid link, no result found'})
          const hc = cheerio.load(resaudio.data)
          const result = {
            user: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div.col.s12 > h2.white-text').find('b').text(),
            desk: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div.col.s12 > h2.white-text:nth-child(3)').text(),
            profile: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div.col.s12 > div.img-area > img').attr('src'),
            video: vdlk,
            audio: hc('body > div.welcome.section > div.container > div:nth-child(2) > div.col.s12.l4 > audio > source').attr('src'),
            video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)').attr('href')
          }
          resolve(xoriznn(result))
        }).catch((error) => {
          resolve({ mess: 'Error, no result found'})
        })
      }).catch((error) => {
        resolve({ mess: 'Error, no result found'})
      })
    }).catch((error) => {
      resolve({ mess: 'Server is busy'})
    })
  })
}
module.exports = {
  tiktok,
  musically
}