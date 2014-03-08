/*
 * gulp-urlrevs: revision
 * https://github.com/Wu-Wu/gulp-urlrevs
 *
 * Copyright (c) 2014 Anton Gerasimov
 * Licensed under the MIT license.
 */

'use strict';

var Revision = function () {
    // some regexes
    this.regexAnnexed = /(\?(.*))/g;
    this.regexImplanted = /\.(~[0-9A-F]*\.)/ig;
    this.regexFilename = /(.*)\.(.*)/i;

    // some symbols
    this.symAnnexed = '?';
    this.symImplanted = '~';
};

// trim revision if any
Revision.prototype.chop = function (url) {
    return url
            .replace(this.regexAnnexed, '')       // ..query string parameter
            .replace(this.regexImplanted, '.');   // ..part of pathname
};

// implanted revision, e.g. '/img/baz.~27e2c99.png'
Revision.prototype.implant = function (url, rev) {
    rev = this.symImplanted + rev;

    return url.replace(this.regexFilename, function (match, file, ext) {
        return [file, rev, ext].join('.');
    });
};

// annexed revision, e.g. '/img/baz.png?27e2c99'
Revision.prototype.annex = function (url, rev) {
    return [url, this.symAnnexed, rev].join('');
};

// implated/annexed revision, depended on passed option
Revision.prototype.merge = function(url, rev, opts) {
    opts || (opts = {});

    return opts.implant ? this.implant(url, rev) : this.annex(url, rev);
};

module.exports = new Revision();
