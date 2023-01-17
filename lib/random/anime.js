require('../../config');
const axios = require('axios');

function waifu(type = 'sfw') {
  return new Promise((resolve, reject) => {
    let tpe = ['nsfw', 'sfw'];
    if (!tpe.includes(type)) return resolve({ mess: 'type?', type: tpe });
    axios(`https://api.waifu.pics/many/${type}/waifu`, {
      method: 'post',
      data: new URLSearchParams(Object.entries({ "exclude": [] }))
    })
      .then(({ data }) => {
        resolve(xoriznn({ random: data.files }));
      })
      .catch(err => reject(err));
  });
};

function waifu_nsfw(category = 'waifu') {
  return new Promise((resolve, reject) => {
    let ctgr = ['waifu', 'neko', 'trap', 'blowjob'];
    if (!ctgr.includes(category)) return resolve({ mess: 'category?', category: ctgr });
    axios.get(`https://api.waifu.pics/nsfw/` + category)
      .then(({ data }) => {
        resolve(xoriznn(data))
      })
      .catch(err => reject(err));
  });
};

function waifu_sfw(category = 'waifu') {
  return new Promise((resolve, reject) => {
    let ctgr = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'];
    if (!ctgr.includes(category)) return resolve({ mess: 'category?', category: ctgr });
    axios.get(`https://api.waifu.pics/sfw/` + category)
      .then(({ data }) => {
        resolve(xoriznn(data))
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  waifu,
  waifu_nsfw,
  waifu_sfw
}