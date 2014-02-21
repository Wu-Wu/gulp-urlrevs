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

};

module.exports.create = function (options) {
    return new UrlRevs(options);
};
