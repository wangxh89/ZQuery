var gulp = require('gulp');
var rjs = require('requirejs');

gulp.task('build', function(cb){
  rjs.optimize({
    baseUrl: './src',
    out: './dist/zQuery.js',
    optimize: 'none',
    preserveLicenseComments: false,
    findNestedDependencies: true,
    removeCombined: true,    
    include: [
      'zQuery.js'
    ]
  }, function(buildResponse){
    // console.log('build response', buildResponse);
    cb();
  }, cb);
});

gulp.task('default', ['build']);