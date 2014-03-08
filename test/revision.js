//
// revision.js tests
//
var revision = require('../revision'),
    should = require('should');

require('mocha');

describe('revision', function() {

    describe('chop()', function() {
        it('should not cut anything if no revision', function() {
            var url = '/img/foo.png';

            revision.chop(url).should.be.eql(url);
        });

        it('should cut annexed revision', function() {
            var url = '/img/foo.png?DEADBEEF';

            revision.chop(url).should.be.eql('/img/foo.png');
        });

        it('should cut implanted revision', function() {
            var url = '/img/bar.~DEADBEEF.png';

            revision.chop(url).should.be.eql('/img/bar.png');
        });

        it('should not care about revision case-sensitivity', function() {
            var url = {
                i: '/img/baz.~DeAdBeEf.png',
                a: '/img/bar.png?DeAdBeEf'
            };

            revision.chop(url.i).should.be.eql('/img/baz.png');
            revision.chop(url.a).should.be.eql('/img/bar.png');
        });

        it('should not care about revision length', function() {
            var url = {
                i: '/img/baz.~DEADBEEF01AB.png',
                a: '/img/bar.png?DEADBEEF01AB'
            };
            revision.chop(url.i).should.be.eql('/img/baz.png');
            revision.chop(url.a).should.be.eql('/img/bar.png');
        });
    });

    describe('implant()', function() {
        it('should implant revision into the url', function() {
            var url = '/img/baz.png';

            revision.implant(url, '27e2c99').should.be.eql('/img/baz.~27e2c99.png');
            revision.implant(url, '08C1F4A0C').should.be.eql('/img/baz.~08C1F4A0C.png');
        });
    });

    describe('annex()', function() {
        it('should annex revision to the url', function() {
            var url = '/img/foo.png';

            revision.annex(url, '27e2c99').should.be.eql('/img/foo.png?27e2c99');
            revision.annex(url, '08C1F4A0C').should.be.eql('/img/foo.png?08C1F4A0C');
        });
    });

    describe('merge()', function() {
        it('should annex revision to the url', function() {
            var url = '/img/quux.png';

            revision.merge(url, 'f2dc7f8').should.be.eql('/img/quux.png?f2dc7f8');
            revision.merge(url, 'f2dc7f8', { implant: false }).should.be.eql('/img/quux.png?f2dc7f8');
        });

        it('should implant revision into the url', function() {
            var url = '/img/baz.png';

            revision.implant(url, '9a86f23', { implant: true }).should.be.eql('/img/baz.~9a86f23.png');
        });
    });

});
