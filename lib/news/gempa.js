require("../../config");
const axios = require("axios");
const cheerio = require("cheerio");

function Gempa() {
  return new Promise((resolve, reject) => {
    axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg')
      .then(({ data }) => {
        const $ = cheerio.load(data);
        let gempa = $('table.table-hover.table-striped');
        let map = $(gempa).find('tbody > tr > td:nth-child(6) > a').attr('data-target').replace().replace(/#/g, '');
        for (let i = 0; i < gempa.length; i++) {
          let _gempa = $(gempa[i]).find('tbody')[0];
          if (_gempa) {
            let _url = $(_gempa).find('tr')[0];
            let tanggal = $(_url).find('td')[1];
            let letak = $(_url).find('td')[2];
            let magnitudo = $(_url).find('td')[3];
            let kedalaman = $(_url).find('td')[4];
            let wilayah = $(_url).find('td')[5];
            let lintang = $(letak).text().split(' ')[0];
            let bujur = $(letak).text().split(' ')[2];
            let hasil = {
              waktu: $(tanggal).text(),
              lintang: lintang,
              bujur: bujur,
              magnitudo: $(magnitudo).text(),
              kedalaman: $(kedalaman).text().replace(/\t/g, '').replace(/I/g, ''),
              wilayah: $(wilayah).text().replace(/\t/g, '').replace(/I/g, '').replace('-', '').replace(/\r/g, '').split('\n')[0],
              img_map: `https://ews.bmkg.go.id/TEWS/data/${map}.mmi.jpg`,
              google_map: `https://www.google.com/maps/place/${lintang}%C2%B0S+${bujur}%C2%B0E`
            };
            resolve(xoriznn(hasil));
          };
        };
      }).catch(err => reject(err));
  });
};

module.exports.Gempa = Gempa