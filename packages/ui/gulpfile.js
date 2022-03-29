const gulp = require('gulp');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');
const plumber = require('gulp-plumber');
const merge = require('merge2');

const typescriptFiles = ['./src/**/*.{ts,tsx}', '!./src/umd.ts'];
const scssFiles = ['./src/**/styles/**/*.scss'];
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('ts', function () {
    const tsResult = gulp.src(typescriptFiles)
        .pipe(plumber())
        .pipe(tsProject())

    return merge([
        tsResult.dts.pipe(gulp.dest('./lib')),
        tsResult.js.pipe(gulp.dest('./lib'))
    ]);
});

gulp.task('scss', function () {
    return gulp.src(scssFiles)
        .pipe(plumber())
        .pipe(gulp.dest('./lib'));
});

gulp.task('default', gulp.parallel('ts', 'scss'));

gulp.task('watch', gulp.parallel('ts', 'scss', function () {
    return merge([
        watch(typescriptFiles, function () {
            return gulp.run('ts');
        }),
        watch(scssFiles, function () {
            return gulp.run('scss');
        })
    ]);
}));