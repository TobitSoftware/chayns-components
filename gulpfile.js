const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');
const path = require('path');
const pkg = require('./package.json');

const jsSource = [
    'src/**/*.{js,jsx}',
    '!src/**/*.{stories,spec,test}.{js,jsx}',
];
const cssSource = 'src/**/*.{css,scss}';

/** ======================
 ========= CLEAN =========
 ====================== */

gulp.task('clean', () =>
    gulp.src(['dist/', 'split-css/'], { allowEmpty: true }).pipe(clean())
);

/** ======================
 ========== ESM ==========
 ====================== */

const esmDestination = path.dirname(pkg.module);

gulp.task('transpile-esm', () =>
    gulp
        .src(jsSource)
        .pipe(
            babel({
                presets: [['./babelPreset.js', { renameSCSS: true }]],
            })
        )
        .pipe(gulp.dest(esmDestination))
);

gulp.task('compile-scss-esm', () =>
    gulp.src(cssSource).pipe(sass()).pipe(gulp.dest(esmDestination))
);

gulp.task('build-esm', gulp.parallel('transpile-esm', 'compile-scss-esm'));

/** ======================
 ========== CJS ==========
 ====================== */

const cjsDestination = path.dirname(pkg.main);

gulp.task('transpile-cjs', () =>
    gulp
        .src(jsSource)
        .pipe(
            babel({
                presets: [
                    ['./babelPreset.js', { cjs: true, renameSCSS: true }],
                ],
            })
        )
        .pipe(gulp.dest(cjsDestination))
);

gulp.task('compile-scss-cjs', () =>
    gulp.src(cssSource).pipe(sass()).pipe(gulp.dest(cjsDestination))
);

gulp.task('build-cjs', gulp.parallel('transpile-cjs', 'compile-scss-cjs'));

/** ======================
 ===== ESM CSS-SPLIT =====
 ====================== */

gulp.task('transpile-esm-split-css', () =>
    gulp
        .src(jsSource)
        .pipe(
            babel({
                presets: [['./babelPreset.js', { cjs: true, removeCSS: true }]],
            })
        )
        .pipe(gulp.dest('split-css/'))
);

gulp.task('bundle-css', () =>
    gulp
        .src(cssSource)
        .pipe(sass())
        .pipe(concatCss('styles.css'))
        .pipe(gulp.dest('dist/'))
);

gulp.task(
    'build-esm-split-css',
    gulp.parallel('transpile-esm-split-css', 'bundle-css')
);

/** ======================
 = resolveAbsoluteImport =
 ====================== */

gulp.task('compile-resolve-import', () =>
    gulp
        .src('src/**/resolveAbsoluteImport.js')
        .pipe(
            babel({
                presets: [['./babelPreset.js', { cjs: true }]],
            })
        )
        .pipe(gulp.dest('lib/'))
);

/** ======================
 ========= BUILD =========
 ====================== */

gulp.task(
    'build',
    gulp.series(
        'clean',
        gulp.parallel('build-esm', 'build-cjs', 'build-esm-split-css')
    )
);

// =======================
