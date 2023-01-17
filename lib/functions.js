const util = require('util')

/**
 * 
 * @param {*} url 
 * @returns 
 */
const isUrl = (url) => {
  try {
    if (typeof url !== 'string') throw new Error('url is a string!');
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'));
  } catch(err) {
    console.log(util.format(err))
  };
};

module.exports = {
  isUrl
};