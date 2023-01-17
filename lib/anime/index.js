"use strict";
const { MalTopAiring, MalTopAnime, MalSearchAnime, MalSearchManga, MalSearchCharacter } = require('../../lib/anime/malnime');
const { isUrl } = require('../../lib/functions');

/**
 * 
 * @returns 
 */
module.exports.mal_top_airing = () => {
  return new Promise((resolve, reject) => {
    MalTopAiring()
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
module.exports.mal_top_anime = () => {
  return new Promise((resolve, reject) => {
    MalTopAnime()
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
module.exports.mal_search_anime = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    MalSearchAnime(search)
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
module.exports.mal_search_manga = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    MalSearchManga(search)
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
module.exports.mal_search_character = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return resolve({ mess: 'search parameters cannot be empty' });
    if (isUrl(search)) return resolve({ mess: 'not a link!' });
    MalSearchCharacter(search)
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      reject(error);
    });
  });
};