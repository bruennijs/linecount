/**
 * Created by bruentje on 14.10.13.
 */

var ass = require('assert'),
    filereader = require('./../lib/filereader');

describe('filereader', function() {
  describe('#getLineCount', function() {
    it('should return correct lines on read', function() {

      var fr = new filereader('./filereader.two_crlf.testfile');
      fr.getLineCount(function(count) {
        ass.equal(count, 2);
      })

    })
  })

  describe('#proivate methods not public', function() {
    var fr = new filereader('./filereader.two_crlf.testfile');
    ass.equal(typeof fr.ifIsNotOpen, 'function');
  })
})
