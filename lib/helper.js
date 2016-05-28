'use strict';

const fs = require('fs');

module.exports = {
  readFile(filePath, message) {
    let content = null
    try {
      fs.accessSync(filePath, fs.F_OK);
      content = require(filePath);
    } catch (err) {
      message ? console.log(message) : console.log(err);
      process.exit(1);
    }
    return content;
  }
};
