require('../../config');
const axios = require('axios');
const cheerio = require('cheerio');

function MalTopAiring(){
  return new Promise((resolve, reject) => {
    axios.get('https://myanimelist.net/topanime.php?type=airing')
    .then(({ data }) => {
      let results = []
      var $ = cheerio.load(data)
      $('div.pb12 > table.top-ranking-table').each((i ,u) => {
        for(let i = 0; i < 10; i++){
          let b = $(u).find('tr.ranking-list > td.ac')
          let c = $(u).find('tr.ranking-list > td.title')[i]
          let d = $(u).find('tr.ranking-list > td.score')[i]
          results.push({
            rank: i + 1,
            thumbnail: $(c).find('a.hoverinfo_trigger > img').attr('data-src'),
            title: $(c).find('div.detail > div.clearfix > h3 > a').text().trim(),
            score: $(d).find('span').text().trim(),
            link: $(c).find('a.hoverinfo_trigger').attr('href')
          })
        }
      })
      if (results.every(x => x === undefined)) return resolve({ mess: 'No result found'})
      resolve(xoriznn(results))
    })
    .catch(error => {
      resolve({ creator: '@xorizn', mess: `Bad request`, status: 400 })
    })
  })
}

function MalTopAnime(){
  return new Promise((resolve, reject) => {
    axios.get('https://myanimelist.net/topanime.php?type=airing')
    .then(({ data }) => {
      let results = []
      var $ = cheerio.load(data)
      $('div.pb12 > table.top-ranking-table').each((i ,u) => {
        for(let i = 0; i < 10; i++){
          let b = $(u).find('tr.ranking-list > td.ac')
          let c = $(u).find('tr.ranking-list > td.title')[i]
          let d = $(u).find('tr.ranking-list > td.score')[i]
          results.push({
            rank: i + 1,
            thumbnail: $(c).find('a.hoverinfo_trigger > img').attr('data-src'),
            title: $(c).find('div.detail > div.clearfix > h3 > a').text().trim(),
            score: $(d).find('span').text().trim(),
            link: $(c).find('a.hoverinfo_trigger').attr('href')
          })
        }
      })
      if (results.every(x => x === undefined)) return resolve({ mess: 'No result found'})
      resolve(xoriznn(results))
    })
    .catch(error => {
      resolve({ creator: '@xorizn', mess: `Bad request`, status: 400 })
    })
  })
}

function MalSearchAnime(anime){
  return new Promise(async(resolve, reject) => {
    if(!anime) return resolve({ mess: 'Masukkan Querry'})
    axios.get('https://myanimelist.net/anime.php?q='+anime+'&cat=anime')
    .then(({ data }) => {
      let results = []
      var $ = cheerio.load(data)
      $('div.js-categories-seasonal > table').each((u, l) => {
        for(let i = 1; i < 10; i++){
          let b = $(l).find('td.borderClass > div.title')[i]
          let c = $(l).find('td.borderClass > div.picSurround > a.hoverinfo_trigger')[i]
          let d = $(l).find('td.ac:nth-child(3)')[i]
          let e = $(l).find('td.ac:nth-child(4)')[i]
          let f = $(l).find('td.ac:nth-child(5)')[i]
          let url = $(b).find('a.hoverinfo_trigger').attr('href')
          if (typeof url === 'undefined') return
          results.push({
            title: $(b).find('a.hoverinfo_trigger').text(),
            thumbnail: $(c).find('img').attr('data-src'),
            url: url,
            type: $(d).text().trim().replace('\n'),
            episode: $(e).text().trim().replace('\n'),
            score: $(f).text().trim().replace('\n'),
          })
        }
      })
      if (results.length < 1) return resolve({ mess: `result ${anime} not found`, status: 404 })
      resolve(xoriznn(results))
    })
    .catch(err => {
      resolve({ creator: '@xorizn', mess: `result ${anime} not found/bad request`, status: 400 })
    })
  })
}

function MalSearchManga(manga){
  return new Promise(async(resolve, reject) => {
    if(!manga) return resolve({ mess: 'Masukkan Querry'})
    axios.get('https://myanimelist.net/manga.php?q='+manga+'&cat=manga')
    .then(({ data }) => {
      let results = []
      var $ = cheerio.load(data)
      $('div.js-categories-seasonal > table').each((i, u) => {
        for(let i = 1; i < 10; i++){
          let b = $(u).find('td.borderClass:nth-child(2)')[i]
          let c = $(u).find('td.borderClass:nth-child(3)')[i]
          let d = $(u).find('td.borderClass:nth-child(4)')[i]
          let e = $(u).find('td.borderClass:nth-child(5)')[i]
          let f = $(u).find('td.borderClass:nth-child(1)')[i]
          let link = $(b).find('a:nth-child(2)').attr('href')
          if (typeof link === 'undefined') return
          results.push({
            title: $(b).find('a.hoverinfo_trigger > strong').text(),
            type: $(c).text().trim(),
            vol: $(d).text().trim(),
            score: $(e).text().trim(),
            link: link,
            thumbnail: $(f).find('a.hoverinfo_trigger > img').attr('data-src')
          })
        }
      });
      if (results.length < 1) return resolve({ mess: `result ${manga} not found`, status: 404 })
      resolve(xoriznn(results))
    })
    .catch(err => {
      resolve({ creator: '@xorizn', mess: `result ${manga} not found/bad request`, status: 400 })
    })
  })
}

function MalSearchCharacter(character){
  return new Promise(async(resolve, reject) => {
    if(!character) return resolve({ mess: 'Masukkan Querry'})
    axios.get('https://myanimelist.net/character.php?q='+character+'&cat=character')
    .then(({ data }) => {
      let results = []
      var $ = cheerio.load(data)
      $('table').each((i, u) => {
        for(let i = 0; i < 10; i++){
          let b = $(u).find('tr > td.borderClass:nth-child(2)')[i]
          let c = $(u).find('tr > td.borderClass:nth-child(1)')[i]
          let d = $(u).find('tr > td.borderClass:nth-child(3)')[i]
          let name = $(b).find('a').text().trim()
          let alias_name = $(b).find('small').text().trim()
          let url = $(b).find('a').attr('href')
          let thumbnail = $(c).find('a > img').attr('data-src')
          let anime = $(d).find('small > a:nth-child(1)').text().trim()
          let manga = $(d).find('small > a:nth-child(2)').text().trim()
          if (typeof url === 'undefined') return 
          results.push({
            name: name ? name : 'No Name',
            alias_name: alias_name ? alias_name : 'No Alias',
            url: url ? url : 'No Url',
            thumbnail: thumbnail ? thumbnail : 'https://i.ibb.co/G7CrCwN/404.png',
            anime: anime ? anime : 'No In Anime',
            manga: manga ? manga : 'No In Manga'
          })
        }
      })
      if (results.length < 1) return resolve({ mess: `result ${character} not found`, status: 404 })
      resolve(xoriznn(results))
    })
    .catch(error => {
      console.log(error)
      resolve({ creator: '@xorizn', mess: `result ${character} not found/bad request`, status: 400 })
    })
  })
}

module.exports = {
  MalTopAiring,
  MalTopAnime,
  MalSearchAnime,
  MalSearchManga,
  MalSearchCharacter
}