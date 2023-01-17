require("../../config");
const axios = require("axios");
const cheerio = require("cheerio");

function covidWorld() {
  return new Promise((resolve, reject) => {
    axios.get('https://www.worldometers.info/coronavirus/')
      .then(({ data, status }) => {
        if (status !== 200) return resolve({ mess: 'No result found' })
        const $ = cheerio.load(data);
        let _data = [];
        let _case = [];
        let lastUp
        $('.maincounter-number').each((i, e) => {
          _data.push($(e).text().trim());
        });
        $('.number-table-main').each((i, e) => {
          _case.push($(e).text().trim());
        });
        lastUp = $('div[style="font-size:13px; color:#999; margin-top:5px; text-align:center"]').text();
        let hasil = {
          total_cases: _data[0],
          recovered: _data[2],
          deaths: _data[1],
          active_cases: _case[0],
          closed_cases: _case[1],
          last_update: lastUp.replace('Last updated: ', '').replace(', 17:50 GMT', '').trim(),
        };
        resolve(xoriznn(hasil));
      }).catch(err => {
        resolve({ mess: 'Server is busy' });
      });
  });
};

module.exports.covidWorld = covidWorld