"use strict";
const pin = require('../../lib/image/pinterest')
const { wallpaper } = require('../../lib/image/wallpaper')
const { JadiAnime } = require('../../lib/image/ai-manga')
const { isUrl } = require('../../lib/functions');

/**
 * 
 * @param {*} search 
 * @returns 
 */
module.exports.pinterest = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    pin.pinterest(search)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * 
 * @param {*} link 
 * @returns 
 */
module.exports.pinterest_video = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    pin.pinvid(link)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * 
 * @param {*} search 
 * @returns 
 */
module.exports.pinterest_video_search = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    pin.pinvids(search)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * 
 * @param {*} search
 * @returns 
 */
module.exports.wallpaper_anime_desktop = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    wallpaper(search)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * 
 * @param {*} image imgBuf | imgUrl | imgPath | imgBase64
 * @returns 
 */
module.exports.jadi_anime = (image) => {
  return new Promise((resolve, reject) => {
    if (!image) return resolve({ mess: 'image parameters cannot be empty' });
    JadiAnime(image)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};