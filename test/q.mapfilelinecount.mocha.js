/**
 * Created by bruentje on 23.10.13.
 */

var mocha = require('mocha'),
  Q = require('q'),
  filelib = require('./../lib/filelib'),
  console = require('console');

describe('Q promise based map methods', function () {
  it('#map file names to promisses not to the line count itself', function () {
    var paths = ['./test/filereader.two_crlf.testfile', './test/filereader.3_crlf.testfile'];

    paths.map(function (path) {
      var q = Q.defer();

      var counter = new filelib.line.counter.create();
      counter.getLineCount(path, function (count) {
        q.resolve(count);
      });

      return q.promise;
    });
  });

  it('#map file names by creating a q by using nfcall', function () {

    var paths = ['./test/filereader.two_crlf.testfile', './test/filereader.3_crlf.testfile'];

    var promisesMap = paths.map(function (path) {
      var counter = new filelib.line.counter.create();
      return Q.nfcall(counter.getLineCount, path);
    });

    var promiseAll = Q.all(promisesMap);

    promiseAll.done(function (counts) {
      counts.forEach(function (count) {
        console.log("line count " + count);
      });
    });
  });

  it('#linecount with then and cfcall', function () {
    var counter = new filelib.line.counter.create();
    var promise = Q.nfcall(counter.getLineCount, './filereader.two_crlf.testfile');
    promise.then(function (count) {
      console.log('promise then result: ' + count);
    });
  });
});
