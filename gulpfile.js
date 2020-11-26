const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concatCss = require('gulp-concat-css');
const path = require('path');
const shell = require('gulp-shell');
const pkg = require('./package.json');
const generateImportTransformer = require('./scripts/generate-import-transformer/generateImportTransformer');
const generateDocs = require('./scripts/generate-docs/generateDocs');

const jsSource = [
    'src/**/*.{js,jsx}',
    '!src/**/*.{stories,spec,test}.{js,jsx}',
];
const cssSource = 'src/**/*.{css,scss}';

/** ======================
 ========= CLEAN =========
 ====================== */

gulp.task('clean', () =>
    gulp
        .src(['dist/', 'split-css/', 'lib/'], { allowEmpty: true })
        .pipe(clean())
);

/** ======================
 ========== ESM ==========
 ====================== */

const esmDestination = path.dirname(pkg.module);

gulp.task('transpile-esm', () =>
    gulp
        .src(jsSource)
        .pipe(
            sourcemaps.init({
                loadMaps: true,
            })
        )
        .pipe(
            babel({
                presets: [['./babelPreset.js', { cssImports: 'rename' }]],
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(esmDestination))
);

gulp.task('compile-scss-esm', () =>
    gulp.src(cssSource).pipe(sass()).pipe(gulp.dest(esmDestination))
);

gulp.task('build-esm', gulp.parallel('transpile-esm', 'compile-scss-esm'));

/** ======================
 ====== ESM TO lib/ ======
 ====================== */

gulp.task('transpile-esm-to-lib', () =>
    gulp
        .src(jsSource)
        .pipe(
            sourcemaps.init({
                loadMaps: true,
            })
        )
        .pipe(
            babel({
                presets: [['./babelPreset.js', { cssImports: 'rename' }]],
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib/'))
);

gulp.task('compile-scss-esm-to-lib', () =>
    gulp.src(cssSource).pipe(sass()).pipe(gulp.dest('lib/'))
);

gulp.task(
    'build-esm-to-lib',
    gulp.parallel('transpile-esm-to-lib', 'compile-scss-esm-to-lib')
);

/** ======================
 ========== CJS ==========
 ====================== */

const cjsDestination = path.dirname(pkg.main);

gulp.task('transpile-cjs', () =>
    gulp
        .src(jsSource)
        .pipe(
            sourcemaps.init({
                loadMaps: true,
            })
        )
        .pipe(
            babel({
                presets: [
                    ['./babelPreset.js', { cjs: true, cssImports: 'rename' }],
                ],
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cjsDestination))
);

gulp.task('compile-scss-cjs', () =>
    gulp.src(cssSource).pipe(sass()).pipe(gulp.dest(cjsDestination))
);

gulp.task('build-cjs', gulp.parallel('transpile-cjs', 'compile-scss-cjs'));

/** ======================
 ===== CJS CSS-SPLIT =====
 ====================== */

gulp.task('transpile-cjs-split-css', () =>
    gulp
        .src(jsSource)
        .pipe(
            sourcemaps.init({
                loadMaps: true,
            })
        )
        .pipe(
            babel({
                presets: [
                    ['./babelPreset.js', { cjs: true, cssImports: 'remove' }],
                ],
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/cjs-split-css/'))
);

gulp.task('bundle-css', () =>
    gulp
        .src(cssSource)
        .pipe(sass())
        .pipe(concatCss('styles.css'))
        .pipe(gulp.dest('dist/'))
);

gulp.task(
    'build-cjs-split-css',
    gulp.parallel('transpile-cjs-split-css', 'bundle-css')
);

/** ======================
 ========== UMD ==========
 ====================== */

gulp.task('build-umd', shell.task('rollup -c', { quiet: true }));

/** ======================
 ===== GENERATE DOCS =====
 ====================== */

gulp.task('generate-docs', generateDocs);

/** ======================
 = resolveAbsoluteImport =
 ====================== */

gulp.task('compile-resolve-import', generateImportTransformer);

/** ======================
 ========= BUILD =========
 ====================== */

gulp.task(
    'build',
    gulp.series(
        'clean',
        gulp.parallel(
            gulp.series('build-esm', 'compile-resolve-import'),
            'build-esm-to-lib',
            'build-cjs',
            'build-cjs-split-css',
            'build-umd',
            'generate-docs'
        )
    )
);
