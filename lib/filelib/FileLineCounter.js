/**
 * Created by bruentje on 14.10.13.
 */

var fs = require('fs'),
    events = require('events'),
    util = require('util'),
    S = require('string'),
    Q = require('q');

function FileLineCounter(filename) {
  var that = this;
  this.filename = filename;

  /* private methods */
  this.openFile = function () {
    fs.open(this.filename, 'r', function (err, fd) {
      if (err !== null)
        this.emit('error', err);
      else {
        this.fd = fd;
      }
    }.bind(this));
  };

  this.ifIsNotOpen = function () {
    return (this.fd === null);
  }
}

util.inherits(FileLineCounter, events.EventEmitter);

FileLineCounter.prototype.getLineCountP = function (path) {
  var that = this;

  var readFile = Q.denodeify(fs.readFile);
  return readFile(path).then(function (data) {
    var dataStr = new S(data);
    return dataStr.count('\r\n');
  });
};

FileLineCounter.prototype.getLineCount = function (callback) {
  var that = this;

  if (this.ifIsNotOpen())
  {
    this.openFile();
  }

  fs.readFile(this.filename, function (err, data) {
    if (err)
    {
      this.emit('error', err);
    }
    else
    {
      var dataStr = new S(data);
      callback(dataStr.count('\r\n'));
    }
  }.bind(this));
};

FileLineCounter.prototype.getLineCount = function (path, callback) {
  var that = this;

  fs.readFile(path, function (err, data) {
    if (err)
    {
      this.emit('error', err);
    }
    else
    {
      var dataStr = new S(data);
      callback(dataStr.count('\r\n'));
    }
  }.bind(this));
};

FileLineCounter.prototype.dispose = function() {
  if (!this.ifIsNotOpen())
  {
    fs.close(this.fd);
  }
};

module.exports = FileLineCounter;
