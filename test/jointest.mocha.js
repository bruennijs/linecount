/**
 * Created by bruentje on 20.10.13.
 */

var Join = require('join'),
  mocha = require('mocha'),
  sync = Join(),
  fs = require('fs'),
  console = require('console');

describe("sync with async system callback", function () {
  it ('#readdir synchronizer', function () {

    var joinCb = sync.add();

    fs.readdir('C:\\Temp', function (data) {
      console.log('readdir callback!');
      joinCb(data);
    });

    console.log('before sync.when');

    sync.when(function (data) {
      console.log(data);
    })

    console.log('after sync.when');
  })
})
