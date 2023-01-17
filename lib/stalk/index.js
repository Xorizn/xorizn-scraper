"use strict";
const { ig_stalk } = require('../../lib/stalk/instagram');
const { github_stalk } = require('../../lib/stalk/github')
const { isUrl } = require('../../lib/functions');

module.exports.ig_stalk = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) return resolve({ mess: 'username parameters cannot be empty' });
    if (isUrl(username)) return resolve({ mess: 'not a link!' });
    ig_stalk(username)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
module.exports.github_stalk = (username) => {
  return new Promise((resolve, reject) => {
    if (!username) return resolve({ mess: 'username parameters cannot be empty' });
    if (isUrl(username)) return resolve({ mess: 'not a link!' });
    github_stalk(username)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};