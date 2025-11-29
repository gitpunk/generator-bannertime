const { src, dest, series, parallel, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const gulpIf = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist',
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/styles',
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/scripts',
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images',
  },
};

const isProd = process.env.NODE_ENV === 'production';

function clean() {
  return del(['dist']);
}

function html() {
  return src(paths.html.src)
    .pipe(plumber())
    .pipe(gulpIf(isProd, htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function styles() {
  const plugins = [autoprefixer()];
  if (isProd) {
    plugins.push(cssnano({ preset: 'default' }));
  }

  return src(paths.styles.src, { sourcemaps: !isProd })
    .pipe(plumber())
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulpIf(!isProd, sourcemaps.write('.')))
    .pipe(dest(paths.styles.dest, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts.src, { sourcemaps: !isProd })
    .pipe(plumber())
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(gulpIf(isProd, terser()))
    .pipe(gulpIf(!isProd, sourcemaps.write('.')))
    .pipe(dest(paths.scripts.dest, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

function images() {
  return src(paths.images.src)
    .pipe(gulpIf(isProd, imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo(),
    ])))
    .pipe(dest(paths.images.dest))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    open: false,
    notify: false,
  });

  watch(paths.html.src, html);
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
}

const build = series(clean, parallel(html, styles, scripts, images));

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.serve = serve;
exports.default = series(build, serve);
