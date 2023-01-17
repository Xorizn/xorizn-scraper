"use strict";
const tt = require("../../lib/download/tiktok");
const { CloudeDown } = require("../../lib/search/soundcloude");
const { isUrl } = require('../../lib/functions');
const pin = require('../../lib/image/pinterest');
const down = require('../../lib/download/download');

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
module.exports.soundcloud = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    CloudeDown(link)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.tiktok = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    if (!link.includes('tiktok')) return resolve({ mess: `${link} not a tiktok link` });
    tt.tiktok(link)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.musically = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    if (!link.includes('tiktok')) return resolve({ mess: `${link} not a tiktok link` });
    tt.musically(link)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.instagram = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    //let match = link.match(/(\/p\/|\/reel\/)(\w+)(\/|\?)/);
    //let link_ = 'https://www.instagram.com'+match[0];
    down.instagram(link)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.facebook = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    down.fbdwn(link)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.twitter = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    down.twdwn(link)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.joox = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    down.joox(search)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.mediafire = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    if (!link.includes('mediafire')) return resolve({ mess: 'are you serious its a mediafire link?' });
    down.mediafire(link)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};