require('../../config')
const axios = require('axios');
const cheerio = require('cheerio');

function bukalapak(search) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, {
      headers: {
        "user-agent": 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0'
      }
    })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        let dat = [];
        let b = $('a.slide > img').attr('src');
        $('div.bl-flex-item.mb-8').each((i, u) => {
          let a = $(u).find('observer-tracker > div > div');
          let img = $(a).find('div > a > img').attr('src');
          if (typeof img === 'undefined') return

          let link = $(a).find('.bl-thumbnail--slider > div > a').attr('href');
          let title = $(a).find('.bl-product-card__description-name > p > a').text().trim();
          let harga = $(a).find('div.bl-product-card__description-price > p').text().trim();
          let rating = $(a).find('div.bl-product-card__description-rating > p').text().trim();
          let terjual = $(a).find('div.bl-product-card__description-rating-and-sold > p').text().trim();

          let dari = $(a).find('div.bl-product-card__description-store > span:nth-child(1)').text().trim();
          let seller = $(a).find('div.bl-product-card__description-store > span > a').text().trim();
          let link_sel = $(a).find('div.bl-product-card__description-store > span > a').attr('href');

          let res = {
            title: title,
            rating: rating ? rating : 'No rating yet',
            terjual: terjual ? terjual : 'Not yet bought',
            harga: harga,
            image: img,
            link: link,
            store: {
              lokasi: dari,
              nama: seller,
              link: link_sel
            }
          };

          dat.push(res);
        })
        if (dat.every(x => x === undefined)) return resolve({ mess: 'No result found' });
        resolve(xoriznn(dat));
      }).catch(err => reject(err));
  });
};

module.exports.bukalapak = bukalapak