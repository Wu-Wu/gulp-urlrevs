//
// minigit.js tests
//
var minigit = require('../minigit'),
    should = require('should'),
    gutil = require('gulp-util');

require('mocha');

describe('minigit', function() {
    describe('instance', function() {
        it('should be okay', function() {
            minigit.should.be.ok;
        });
    });
});
