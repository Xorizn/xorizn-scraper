"use strict";
const filmm = require('../../lib/search/film');
const play = require("../../lib/search/playstore");
const stem = require('../../lib/search/steam')
const { JadwalSepak, JadwalTv, AcaraNow } = require("../../lib/search/jadwal");
const { lirik } = require("../../lib/search/lirik");
const { CloudeDown, CloudeSearch } = require("../../lib/search/soundcloude");
const { isUrl } = require('../../lib/functions');
const { bokep } = require('../../lib/search/xpanas');
const { bukalapak } = require('../../lib/search/bukalapak');
const ttv = ['gtv', 'antv', 'indosiar', 'inewstv', 'kompastv', 'metrotv', 'mnctv', 'moji', 'nettv', 'rcti', 'rtv', 'sctv', 'trans7', 'transtv', 'tvone', 'tvri']

/**
 * 
 * @param {*} search 
 * @returns 
 */
module.exports.film = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    filmm.film(search)
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
 * @returns 
 */
module.exports.jadwal_sepakbola = () => {
  return new Promise((resolve, reject) => {
    JadwalSepak()
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
 * @returns 
 */
module.exports.acara_now = () => {
  return new Promise((resolve, reject) => {
    AcaraNow()
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
module.exports.jadwal_tv = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    if (!ttv.includes(search)) return resolve({ mess: `no channel with ${search} name` });
    JadwalTv(search)
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
module.exports.playstore = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    play.playstore(search)
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
module.exports.soundcloud_search = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    CloudeSearch(search)
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
module.exports.lyrics = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    lirik(search)
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
module.exports.steam_search = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    stem.steam(search)
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
module.exports.bukalapak = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    bukalapak(search)
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
module.exports.steam_detail = (link) => {
  return new Promise((resolve, reject) => {
    if (!link) return resolve({ mess: 'link parameters cannot be empty' });
    if (!isUrl(link)) return resolve({ mess: 'insert a link!' });
    stem.detailsteam(link)
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
module.exports.xpanas = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    bokep(search)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};