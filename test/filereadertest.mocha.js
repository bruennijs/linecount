/**
 * Created by bruentje on 14.10.13.
 */

var assert = require('assert'),
    should = require('should'),
    FileLineCounter = require('./../lib/filelib/FileLineCounter'),
    console = require('console');

describe('FileLineCounter', function () {
  describe('#getLineCount', function () {
    it('should return correct lines on read', function (done) {

      var fr = new FileLineCounter('./test/filereader.two_crlf.testfile');
      fr.getLineCount(function (count) {
        count.should.be.equal(2);
        done();
      });
    });

    it('should emit error when file not available', function (done) {
      var sut = new FileLineCounter('./test/notpresent.txt');
      sut.on('error', function (err) {
        err.should.not.empty;
        done();
      })

      sut.getLineCount();
    });

    it ('should check whether private method defined', function () {
      var fr = new FileLineCounter('./filereader.two_crlf.testfile');
      assert.equal(typeof fr.ifIsNotOpen, 'function');
    })
  });
})
