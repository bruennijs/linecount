/**
 * Created by bruentje on 23.10.13.
 */

var mocha = require('mocha'),
  Q = require('q'),
  filelib = require('./../lib/filelib'),
  console = require('console'),
  should = require('should');

describe('Q promise based map methods', function () {

  it('#getLineCount promise and then assert in then callback', function () {
    var path = './test/filereader.3_crlf.testfile';

    var sut = new filelib.line.counter.create();
    var p = sut.getLineCountP(path);
    p.done(function (count) {
      count.should.be.equal(3);
    });
  });

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

    var promisesMap = paths.map(function (fpath) {
      var counter = new filelib.line.counter.create();
      return counter.getLineCountP(fpath).then(function (c) {
        return { path: fpath, count: c };
      });
    });

    var promiseAll = Q.all(promisesMap);

    promiseAll.done(function (maps) {
      maps.forEach(function (map) {
        console.log(map.path + ":" + map.count);
      });
    });
  });

  it('#linecount with then and nfcall', function () {
    var counter = new filelib.line.counter.create();
    var promise = Q.nfcall(counter.getLineCount, './test/filereader.two_crlf.testfile');
    promise.then(function (count) {
      console.log('promise then result: ' + count);
    });
  });
});
