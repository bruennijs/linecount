/**
 * Created by bruentje on 20.10.13.
 */

var mocha = require('mocha'),
    async = require('asyncjs'),
    flib = require('./../lib/filelib'),
    console = require('console');

describe('async.map', function () {
  it('#should call the map of path -> line count', function () {
    async.map(['C:\\Temp\\two.txt'], function (path, onComplete) {
      new flib.line.counter.create(path).getLineCount(function (count) {
        onComplete(null, count);
      });
    }, function (err, result) {
      result.forEach(function (item) {
        console.log(item);
      });
    });
  });
});
