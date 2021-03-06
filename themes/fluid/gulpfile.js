const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const shell = require('gulp-shell');
const yaml = require('js-yaml');


gulp.task('lint', () => gulp.src([
  './source/js/**/*.js',
  './scripts/**/*.js'
]).pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError()));

gulp.task('lint:ejs', shell.task([
  'ejslint ./layout/**/*.ejs'
]));

gulp.task('validate:config', cb => {
  const themeConfig = fs.readFileSync(path.join(__dirname, '_config.yml'));

  try {
    yaml.load(themeConfig);
    return cb();
  } catch (error) {
    return cb(new Error(error));
  }
});

gulp.task('validate:languages', cb => {
  const languagesPath = path.join(__dirname, 'languages');
  const languages = fs.readdirSync(languagesPath);
  const errors = [];

  languages.forEach(lang => {
    const languagePath = path.join(languagesPath, lang);
    try {
      yaml.load(fs.readFileSync(languagePath), {
        filename: path.relative(__dirname, languagePath)
      });
    } catch (error) {
      errors.push(error);
    }
  });

  return errors.length === 0 ? cb() : cb(errors);
});


gulp.task('default', gulp.series('lint', 'lint:ejs', 'validate:config', 'validate:languages'));
