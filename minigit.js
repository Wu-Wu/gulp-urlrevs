/*
 * gulp-urlrevs: minigit
 * https://github.com/Wu-Wu/gulp-urlrevs
 *
 * Copyright (c) 2014 Anton Gerasimov
 * Licensed under the MIT license.
 */

'use strict';

var Shell = require('shelljs'),
    _ = require('lodash');

var MiniGit = function () {
};

// run any sync command and return result
MiniGit.prototype.run = function (cmd) {
    return Shell.exec(cmd.join(" "), { silent: true });
};

// repository "git status"
MiniGit.prototype.status = function (params, cb) {
    var regex = new RegExp(params.filter, 'i'),
        selected = [],
        status = {};

    status = this.run(
        [ 'git', 'status', '--porcelain', '--untracked-files=all' ]
    );

    if (status.code !== 0) {
        return cb(new Error('Unable to get repository status!'));
    }

    console.log( 'regex:', regex );
    console.log( 'output:', status.output.split("\n") );

    // select certain untracked items only
    selected = _.filter(status.output.split("\n"), function (filename) {
        return regex.test(filename);
    });

    return cb(null, selected);
};

// repository "git ls-tree"
MiniGit.prototype.lsTree = function(params, cb) {
    var tree = {},
        status = {};

    status = this.run(
        [ 'git', 'ls-tree', '-r', '--abbrev=12', params.branch, params.path ]
    );

    // shit happened?
    if (status.code !== 0) {
        return cb(new Error('Unable to get repository tree!'), {});
    }

    // or not
    _.forEach(status.output.split("\n"), function (item) {
        if (item !== '') {
            var fields = item.split(/\s+/);
            tree[ fields[3].replace(params.prefix, '') ] = fields[2].substring(0, params.abbrev);
        }
    });

    return cb(null, tree);
};

// repository "git add"
MiniGit.prototype.add = function(params, cb) {
    var status = {};

    status = this.run(
        [ 'git', 'add', params.path ]
    );

    // shit happened?
    if (status.code !== 0) {
        return cb(new Error('Unable to add files to repository!'));
    }

    return cb(null);
};

// repository "git commit"
MiniGit.prototype.commit = function(params, cb) {
    var status = {},
        self = this;

    // trying to add files
    this.add(params, function(err) {
        if (err) {
            // oops!
            return cb(err);
        }

        // now commiting changes..
        status = self.run(
            [ 'git', 'commit', '-m "' + params.message + '"' ]
        );

        if (status.code !== 0) {
            return cb(new Error('Unable to commit changes!'))
        }

        return cb(null);
    });
};

module.exports = new MiniGit();
