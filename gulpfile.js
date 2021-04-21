import gulp from 'gulp'
import cssSelectorExtract from 'css-selector-extract'
import through2 from 'through2'

var extract = function() {
	return gulp
		.src('src/elements/form/form.shared-is-test.css')
		.pipe(
			through2.obj(function(file, _, cb) {
				if (file.isBuffer()) {
					const code = file.contents.toString()
					const extractedCss = cssSelectorExtract.processSync({
						// CSS source code as string.
						css: code,
						// Array of selectors which should get extracted.
						filters: [/^(.*)select(.*)/],
					})
					file.contents = Buffer.from(extractedCss)
				}
				cb(null, file)
			}),
		)
		.pipe(gulp.dest('dist/'))
}

gulp.task('default', extract)
