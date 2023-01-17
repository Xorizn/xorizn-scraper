"use strict";
const txt = require('../../lib/textpro/textpro');
const { isUrl } = require('../../lib/functions');

module.exports.textpro = (url, text) => {
  return new Promise((resolve, reject) => {
    if (!url) return resolve({ mess: 'url parameters cannot be empty' });
    if (!isUrl(url)) return resolve({ mess: 'insert a link!' });
    if (!text) return resolve({ mess: 'text parameters cannot be empty' });
    txt.textpro(url, text)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};