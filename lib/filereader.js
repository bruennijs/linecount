/**
 * Created by bruentje on 14.10.13.
 */

var fs = require('fs'),
    events = require('events'),
    util = require('util'),
    S = require('string');

function filereader(filename) {
  var that = this;
  this.filename = filename;

  /* private methods */
  this.openFile = function() {
    fs.open(that.filename, 'r', function(err, fd) {
      if (err != null)
      {
        that.emit('error', err);
      }
      else
      {
        that.fd = fd
      }
    }.bind(that));
  };

  this.ifIsNotOpen = function () {
    return (that.fd === null);
  };
};

filereader.prototype.getLineCount = function(callback) {
  var that = this;

  if (this.ifIsNotOpen())
  {
    this.openFile();
  }

  fs.readFile(this.filename, function(err, data) {
    if (err) this.emit('error', err);


    var dataStr = new S(data);
    that.callback(dataStr.count('\r\n'));
  });
}

filereader.prototype.dispose = function() {
  if (!this.isNotOpen())
  {
    fs.close(this.fd);
  }
}

util.inherits(filereader, events.EventEmitter);

module.exports = filereader;
