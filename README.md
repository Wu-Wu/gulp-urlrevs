# gulp-urlrevs [![Build status][urlrevs-travis-image]][urlrevs-travis-url]
> Revision management in CSS files plugin for gulp 3

## Usage

First, install `gulp-urlrevs` as a development dependency:

```shell
npm install --save-dev gulp-urlrevs
```

Then, add it to your `gulpfile.js`:

```js
var urlrevs = require('gulp-urlrevs');

gulp.task('urlrevs', function(){
  gulp.src(['root/css/**/*.css'])
    .pipe(urlrevs({}))
    .pipe(gulp.dest('root/css/'));
});
```

## API

### urlrevs(options)

#### options.abbrev
Type: `Integer`
Default: `6`

The length of the revision.

#### options.branch
Type: `String`
Default: `HEAD`

Traversed branch.

#### options.filter
Type: `RegExp`
Default: `\\.(png|jpg|jpeg|gif)`

Regular expression to filter files in stage of building revisions tree and replacing revisions in urls.

#### options.prefix
Type: `String`
Default: `root`

Prefix to cut when generate absulute image url.

#### options.path
Type: `String`
Default: `root/i`

Path to search files in stage of building tree. Relative to repository root directory.

#### options.valid
Type: `Array`
Default: `[ '^\\/' ]`

All valid URL masks represented as a list of `RexExp`-like strings.

#### options.skip
Type: `Array`
Default: `[ '^https?:\\/\\/', '^\\/\\/', '^data:image\\/(sv|pn)g', '^%23' ]`

Defined URL masks which should be excluded during processing. Represented as a list of `RexExp`-like strings.

#### options.upcased
Type: `Boolean`
Default: `true`

Use uppercased revision string like `F96A722`.

#### options.implant
Type: `Boolean`
Default: `true`

Allows embed revision into filename, e.g. `/i/navigation_sprite.F96A722.png`.

#### options.autocommit
Type: `Boolean`
Default: `true`

Fixes uncommited changes in the repository. All new files will be added to the repository. As a commit message it uses value of `options.message`.

#### options.message
Type: `String`
Default: `Wave a magic wand (by urlrevs)`

Message used at autocommit stage.

[urlrevs-travis-url]: http://travis-ci.org/Wu-Wu/gulp-urlrevs
[urlrevs-travis-image]: https://travis-ci.org/Wu-Wu/gulp-urlrevs.png?branch=master
