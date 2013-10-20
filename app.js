/**
 * Created by bruentje on 14.10.13.
 */

var flib = require('./lib/filelib'),
    console = require('console'),
    future = require('future'),
    Join = require('join');


var nameCountMap = process.argv.slice(2).map(function (filepath) {
  var lineCount;
  var join = Join.create();
  var cb = join.add();
  new flib.line.counter.create(filepath).getLineCount(function (count)
  {
    lineCount = count;
    cb(count);
  });

  join.when(function(arg1) {
    console.log('count in joiner callback arg1 : ' + arg1);
  });

  return {path: filepath, count: lineCount };
});

nameCountMap.forEach(function (item) {
  console.log(item.path + ' -> ' + item.count);
})
