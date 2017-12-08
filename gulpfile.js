const gulp = require( 'gulp' );
const stripCode = require( 'gulp-strip-code' );
const del = require( 'del' );

gulp.task( 'clean', () => {
  return del[ './lib' ];
});

gulp.task( 'build', [ 'clean' ], () => {
  gulp.src( './src/index.js' )
  .pipe( stripCode({
    start_comment: 'dev-code',
    end_comment: 'end-dev-code'
  }))
  .pipe( gulp.dest( './lib/' ));
});

gulp.task( 'default', [ 'build' ]);
