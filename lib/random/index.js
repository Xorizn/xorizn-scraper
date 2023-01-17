"use strict";
const {
  waifu,
  waifu_nsfw,
  waifu_sfw
} = require('../../lib/random/anime');
const { dark_jokes } = require('../../lib/random/darkjokes')
const { discord_nekopoi_video } = require('../../lib/random/discord_nekopoi_video')
const { isUrl } = require('../../lib/functions');

module.exports.waifu = (type) => {
  return new Promise((resolve, reject) => {
    if (!type) return resolve({ mess: 'select one of the type' });
    if (isUrl(type)) return resolve({ mess: 'not a link!' });
    waifu(type)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.waifu_nsfw = (category) => {
  return new Promise((resolve, reject) => {
    if (!category) return resolve({ mess: 'select one of the categories' });
    if (isUrl(category)) return resolve({ mess: 'not a link!' });
    waifu_nsfw(category)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.waifu_sfw = (category) => {
  return new Promise((resolve, reject) => {
    if (!category) return resolve({ mess: 'select one of the categories' });
    if (isUrl(category)) return resolve({ mess: 'not a link!' });
    waifu_sfw(category)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.dark_jokes = () => {
  return new Promise((resolve, reject) => {
    dark_jokes()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.discord_nekopoi_video = () => {
  return new Promise((resolve, reject) => {
    discord_nekopoi_video()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};