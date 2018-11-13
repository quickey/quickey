const gulp = require('gulp');
const watch = require('gulp-watch');
const ts = require('gulp-typescript');
const merge = require('merge2');

const typescriptFiles = ['./src/**/*.{ts,tsx}', '!./src/umd.ts'];
const scssFiles = ['./src/**/styles/**/*.scss'];
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('ts', function () {
    const tsResult = gulp.src(typescriptFiles)
        .pipe(tsProject())

    return merge([
        tsResult.dts.pipe(gulp.dest('./lib')),
        tsResult.js.pipe(gulp.dest('./lib'))
    ]);
});

gulp.task('scss', function () {
    return gulp.src(scssFiles)
        .pipe(gulp.dest('./lib'));
});

gulp.task('default', ['ts', 'scss']);

gulp.task('watch', ['ts', 'scss'], function () {
    return merge([
        watch(typescriptFiles, function () {
            return gulp.run('ts');
        }),
        watch(scssFiles).pipe(gulp.dest('./lib'))
    ]);
});