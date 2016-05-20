var gulp = require('gulp');
var gitWatch = require('gulp-git-watch');

gulp.task('git-watch', function() {
	gitWatch()
		.on('check', function() {
			console.log('---> git check <---');
		})
		.on('change', function(newHash, oldHash) {
			console.log('---> git change -->', oldHash, '->', newHash);
			gitPull();
		});
});
