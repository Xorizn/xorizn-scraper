const sharp = require('sharp');
const fs = require('fs');
const { TelegraPh } = require('../../lib/uploader');
const request = require('request-promise');
const ribet_ajg = async (img_link) => {
  return new Promise((resolve, reject) => {
    request(img_link, { encoding: null })
      .then(buff => {
        return sharp(buff)
          .metadata()
          .then(metadata => {
            let nowm = metadata.height - 180
            return sharp(buff)
              .extract({
                left: 0,
                top: 0,
                width: metadata.width,
                height: nowm
              })
              .toBuffer()
          })
      })
      .then(img => {
        fs.writeFileSync('image.jpg', img)
        TelegraPh('image.jpg')
          .then(res => {
            resolve(res)
            fs.unlinkSync('image.jpg')
          })
      })
      .catch(err => reject(err));
  });
};

module.exports.ribet_ajg = ribet_ajg