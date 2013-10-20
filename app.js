/**
 * Created by bruentje on 14.10.13.
 */

var flib = require('./lib/filelib'),
    console = require('console'),
    future = require('future'),
    Join = require('join');


var nameCountMap = process.argv.slice(2).map(function (path) {
  var lineCount;
  var joiner = Join.create();
  var cb = joiner.add();
  new flib.line.counter.create(path).getLineCount(function (count)
  {
    lineCount = count;
    cb(count);
  });

  joiner.when(function(arg) {});
  return lineCount;
});

nameCountMap.reduce(function (item) {
  console.log(' -> ');
})
