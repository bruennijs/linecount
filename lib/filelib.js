/**
 * Created by bruentje on 20.10.13.
 */

var FileLineCounter = require('./filelib/FileLineCounter');

module.exports = {
  line: {
    counter: {
      create: function () {
        return new FileLineCounter('');
      },

      create2: function (path) {
        return new FileLineCounter(path);
      }
    }
  }
};
