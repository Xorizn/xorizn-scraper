"use strict";
const { cnbc } = require('../../lib/news/cnbc');
const { covidWorld } = require('../../lib/news/covid');
const { Gempa } = require('../../lib/news/gempa')
const { kompas } = require('../../lib/news/kompas');
const { RumahKeadilan } = require('../../lib/news/rumah-keadilan');
const { isUrl } = require('../../lib/functions');

module.exports.cnbc = (kategori) => {
  return new Promise((resolve, reject) => {
    if (!kategori) return resolve({ mess: 'select one of the categories' });
    if (isUrl(kategori)) return resolve({ mess: 'not a link!' });
    cnbc(kategori)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.covid_world = () => {
  return new Promise((resolve, reject) => {
    covidWorld()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.gempa = () => {
  return new Promise((resolve, reject) => {
    Gempa()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.kompas = (kategori) => {
  return new Promise((resolve, reject) => {
    if (!kategori) return resolve({ mess: 'select one of the categories' });
    if (isUrl(kategori)) return resolve({ mess: 'not a link!' });
    kompas(kategori)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.rumah_keadilan = () => {
  return new Promise((resolve, reject) => {
    RumahKeadilan()
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};