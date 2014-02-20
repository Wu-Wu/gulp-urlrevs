// gulp-urlrevs tests

var urlrevsPlugin = require('../'),
    should = require('should'),
    gutil = require('gulp-util');

require('mocha');

describe('gulp-urlrevs', function() {
    describe('urlrevsPlugin()', function() {
        it('should be okay', function() {
            (function() {
                urlrevsPlugin({});
            }).should.ok;
        });
    });
});
