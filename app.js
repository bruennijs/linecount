/**
 * Created by bruentje on 14.10.13.
 */

var flib = require('./lib/filelib'),
    console = require('console');

process.argv.forEach(function (val, idx) {
  if (idx >= 2)
  {
    new flib.line.counter.create(val).getLineCount(function (count)
    {
      console.log(val + ' -> ' + count);
    });
  }
});
