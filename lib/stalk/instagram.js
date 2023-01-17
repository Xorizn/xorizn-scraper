require('../../config');
const axios = require("axios");
const cheerio = require("cheerio");
const { JSDOM } = require('jsdom');
const anya = {
  headers: {
    accept: '*/*',
    'cookie': 'ab_tests=%7B%7D',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0'
  }
}

function ig_stalk(username){
  return new Promise((resolve, reject) => {
    axios.get('https://storiesig.me/api/profile/info?username='+username,anya)
    .then(({ data }) => {
      if (data.statusCode === 400) return resolve({ mess: 'No result found'});
      if (!data) return resolve({ mess: 'No result found'});
      let avtr = 'https://storiesig.me'+data.avatar;
      var rapih = {};
      rapih.id = data.id;
      rapih.username = data.username;
      rapih.avatar = avtr;
      rapih.isPrivate = data.isPrivate ? 'private' : 'not private';
      rapih.name = data.name;
      rapih.bio = data.bio;
      rapih.publication = data.publication;
      rapih.subscriber = data.subscriber;
      rapih.subscription = data.subscription;
      if (data.isPrivate === true){
        rapih.story = { mess: 'Private acount?' };
      } else {
        axios.get('https://storiesig.me/api/profile/stories?username='+username,anya)
        .then(({ data }) => {
          if (data.statusCode === 400) return resolve({ mess: 'No result found'});
          if (!data) return resolve({ mess: 'No result found'});
          let arr = [];
          for (let i of data){
            if (i.id) {
              if (i.type === 'video'){
                arr.push({ url: 'https://storiesig.me'+i.url, type: i.type });
              } else {
                arr.push({
                  url: 'https://storiesig.me'+i.url,
                  url_original: 'https://storiesig.me'+i.originalUrl,
                  type: i.type
                });
              };
            };
          };
          rapih.story = arr;
          resolve(xoriznn(rapih));
        })
        .catch((err) => {
          resolve({ mess: 'Server is busy'});
        });
      };
    })
    .catch((err) => {
      resolve({ mess: 'Server is busy'});
    });
  });
};
module.exports = { ig_stalk }