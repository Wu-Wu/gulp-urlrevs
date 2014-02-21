/*
 * gulp-urlrevs
 * https://github.com/Wu-Wu/gulp-urlrevs
 *
 * Copyright (c) 2014 Anton Gerasimov
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash'),
    minigit = require('./minigit'),
    gutil = require('gulp-util'),

    PLUGIN_NAME = 'gulp-urlrevs';


var raiseError = function (err) {
    return new gutil.PluginError(PLUGIN_NAME, err);
};

var UrlRevs = function (options) {

    // merge with defaults
    this.options = _.extend({
        abbrev      : 6,
        branch      : 'HEAD',
        filter      : '\\.(png|jpg|jpeg|gif)',
        path        : 'root/i',
        prefix      : 'root',
        valid       : [ '^\\/' ],
        skip        : [ '^https?:\\/\\/', '^\\/\\/', '^data:image\\/(sv|pn)g', '^%23' ],
        implant     : true,
        upcased     : true,
        autocommit  : true,
        message     : 'Wave a magic wand (by urlrevs)'
    }, options);

    // tree container
    this.tree = {};

    // regexes
    this.reFilter = null;   // ..images
    this.reValid  = [];     // ..allowed urls
    this.reSkip   = [];     // ..skipped urls

    this.buildTree();

    this.compileRegexes();
};

// build revision's tree
UrlRevs.prototype.buildTree = function() {
    // body...
};

// compile some regexes..
UrlRevs.prototype.compileRegexes = function(first_argument) {
    var reCreateNew = function (re) {
        return new RegExp(re, 'i');
    };

    this.reFilter = reCreateNew(this.options.filter);
    this.reValid  = _.map(this.options.valid, reCreateNew);
    this.reSkip   = _.map(this.options.skip, reCreateNew);
};

// process url()
UrlRevs.prototype.processURL = function() {
    // body...
};

module.exports.create = function (options) {
    return new UrlRevs(options);
};
