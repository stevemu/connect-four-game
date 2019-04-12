'use strict';

let chai = require('chai'),
  sinon = require('sinon'),
  expect = chai.expect;

chai.should();

describe('sinon tests', function () {
  let student;

  beforeEach(function () {
    student = {
      dropClass: function (classId, cb) {
        cb();
      }
    };

  });


  describe('student.dropClass', function () {
    it('should call the callback', function () {
      const spy = sinon.spy();
      student.dropClass('', spy);
      spy.called.should.be.true;
    });
  });

  describe('test spy', function () {
      const spy = sinon.spy();
      spy();
      spy.called.should.be.true;

  });


});
