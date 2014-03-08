//
// minigit.js tests
//
var minigit = require('../minigit'),
    should = require('should'),
    gutil = require('gulp-util'),
    sh = require('shelljs'),
    path = require('path'),
    _ = require('lodash');

require('mocha');

var repoInit = function () {
    process.env['GIT_WORK_TREE'] = path.resolve(__dirname, 'repo');
    process.env['GIT_DIR'] = path.resolve(process.env['GIT_WORK_TREE'], '.git');

    // console.log('GIT_WORK_TREE:', process.env['GIT_WORK_TREE']);
    // console.log('GIT_DIR:', process.env['GIT_DIR']);

    sh.rm('-rf', process.env['GIT_WORK_TREE']);
    sh.mkdir('-p', process.env['GIT_WORK_TREE']);

    sh.cp('-Rf', mkPath('fixtures/repo/*'.split('/')), process.env['GIT_WORK_TREE']);

    sh.exec('git init', { silent: true });
    sh.exec('git config user.email qa@gulp-urlrevs.com', { silent: true });
    sh.exec('git config user.name QA', { silent: true });
    sh.exec('git add -A', { silent: true });
    sh.exec('git commit -am "initial commit"', { silent: false });
};

var repoEnv = function() {
    // console.log( sh.ls('-R', process.env['GIT_WORK_TREE']) );
    // console.log('GIT_WORK_TREE:', process.env['GIT_WORK_TREE']);
    // console.log('GIT_DIR:', process.env['GIT_DIR']);
};

var repoClean = function() {
    sh.rm('-rf', process.env['GIT_WORK_TREE']);
    delete process.env['GIT_WORK_TREE'];
    delete process.env['GIT_DIR'];
};

var mkPath = function(items) {
    items.unshift(__dirname);

    return items.join(path.sep);
};

var repoAdd = function(src, dst, opts) {
    var from = mkPath(src.split("/")),
        to = mkPath(dst.split("/"));

    // console.log( 'from: ' +  from);
    // console.log( 'to  : ' +  to );

    sh.mkdir('-p', to);
    sh.cp('-f', from, to);
};

describe('minigit', function() {
    // -
    var options = {
        filter: '\\.(png|jpg)',
        branch: 'HEAD',
        path: 'root/i',
        abbrev: 6
    };

    before(function(){
        // console.log( sh.exec('git --version', { silent: true }).output.split("\n")[0] );
    });

    describe('status()', function() {
        beforeEach(function(){
            repoInit();
            repoEnv();
        });

        afterEach(function(){
            repoClean();
        });

        it('should raise exception on unknown repository', function() {
            // setup bogus repo
            process.env['GIT_DIR'] = path.resolve(__dirname, 'bogus');

            minigit.status(options, function(err) {
                should.exist(err);
                err.should.be.an.Error;
                err.message.should.match(/^Unable to get repository status!/);
            });
        });

        it('should not return uncommited changes', function() {
            minigit.status(options, function(err, changed) {
                should.not.exist(err);
                changed.should.be.eql([]);
            });
        });

        it('should not return uncommited changes after foo.txt was added', function(){
            repoAdd("fixtures/foo.txt", "repo");

            minigit.status(options, function(err, changed) {
                should.not.exist(err);
                changed.should.be.eql([]);
            });
        });

        it('should return uncommited changes after bar.png was added', function(){
            repoAdd("fixtures/bar.png", "repo/" + options.path);

            minigit.status(options, function(err, changed) {
                // console.dir(changed);

                should.not.exist(err);
                changed.length.should.be.eql(1);
            });
        });

    });

    describe('lsTree()', function() {
        beforeEach(function(){
            repoInit();
        });

        afterEach(function(){
            repoClean();
        });

        it('should raise exception on unknown repository', function() {
            // setup bogus repo
            process.env['GIT_DIR'] = path.resolve(__dirname, 'bogus');

            minigit.lsTree(options, function(err) {
                should.exist(err);
                err.should.be.an.Error;
                err.message.should.match(/^Unable to get repository tree!/);
            });
        });

        it('should return a tree object on valid repository', function() {
            sh.exec('git log -1', { silent: false });

            minigit.lsTree(options, function(err, tree) {
                should.not.exist(err);
                tree.should.be.an.Object;
                tree.should.have.keys([ 'root/i/bar.jpg', 'root/i/foo.png' ]);
            });
        });
    });
});
