// get gulp modules
var gulp = require("gulp"),		
	sass = require("gulp-sass"),	
	autoprefix = require("gulp-autoprefixer"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	imagemin = require("gulp-imagemin"),
	plumber = require("gulp-plumber"),
	concat = require("gulp-concat"),
	pug = require("gulp-pug"),
	template = require("gulp-pug-template-concat"),
	gulpif = require("gulp-if"),
	gutil = require("gulp-util");

// other
var sync = require("browser-sync"),
	bourbon = require("node-bourbon"),
	neat = require("node-neat");

// helpers
var path = require("path");

// link public assets
var base = "www";


// minify images
gulp.task("image", function () {
	gulp.src(["./img/**/*"])
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest(base + "/img"));
});

// compile sass to css and prefix
gulp.task("sass", function () {
	gulp.src("./sass/*.scss")
		.pipe(plumber())
		.pipe(sass({
			includePaths: neat.includePaths
		}))
		.pipe(autoprefix("last 10 version"))
		.pipe(gulp.dest(base + "/css"))
		.pipe(sync.stream());
});

// compiles pug
gulp.task("pug", function () {
	var page = require('./page.json');

	return gulp.src([
			"pug/pages/*.pug"
		]) 	
		.pipe(plumber())
		.pipe(pug({
			pretty: true,
			locals: {
				page: page
			}
		}))
		.pipe(rename(function (item) {
			if (item.basename == "index") return;

			item.dirname = path.join(item.dirname, item.basename);
			item.basename = "index";
		}))
		.pipe(gulp.dest(base));
});

// compiles runtime templates
gulp.task("templates", function () {
	return gulp.src([
			"pug/templates/**/*.pug"
		]) 	
		.pipe(plumber())
		.pipe(rename(function (item) {
			item.basename = item.basename.replace(/-([a-z])/g, function (word) { 
				return word[1].toUpperCase(); 
			});
		}))
		.pipe(pug({
			client: true
		}))
		.pipe(template("templates.js", {
			templateVariable: "templates"
		}))
		.pipe(gulp.dest("./js/templates"));
});

// data
gulp.task("data", function () {
	gulp.src("./data/**")
		.pipe(gulp.dest(base + "/data"));
});

// contact js and minify
gulp.task("uglify", ["templates"], function () {
	var sources = [
		"./js/vendors/jquery.js",
		"./js/vendors/*.js",
		"./js/modules/*.js",
		"./js/templates/*.js",
		"./js/helpers/*.js",  
		"./js/views/*.js",  
		"./js/services/*.js", 
		"./js/controllers/*.js"
	];

	// check for production
	if(typeof gutil.env.production !== "undefined") sources.push("./js/configs/production.js");
	else sources.push("./js/configs/development.js"); 

	return gulp.src(sources)
		.pipe(plumber())
		.pipe(concat("app.js"))
		.pipe(gulpif(gutil.env.env == "production", uglify()))
		.pipe(gulp.dest(base + "/js"));
});

// copy fonts
gulp.task("fonts", function () {
	gulp.src(["./fonts/*"])
		.pipe(gulp.dest(base + "/fonts"));
});

// watch tasks (to relaod browser after finish)
gulp.task("html-watch", ["pug"], sync.reload);
gulp.task("js-watch", ["uglify"], sync.reload);
gulp.task("img-watch", ["image"], sync.reload);
gulp.task("fonts-watch", ["fonts"], sync.reload);
gulp.task("data-watch", ["data"], sync.reload);

// watch
gulp.task("watch", function () {
	sync.init({
		server: base,
		port: 8080,
		notify: false
	});

	gulp.watch(["js/*.js", "js/**/*.js", "pug/templates/*.pug"], ["js-watch"]);
	gulp.watch(["img/*", "img/**/*"], ["img-watch"]);
	gulp.watch(["sass/*.scss", "sass/**/*.scss"], ["sass"]);
	gulp.watch(["pug/**/*.pug", "!pug/templates{,/**}"], ["html-watch"]);
	gulp.watch(["fonts/*", "fonts/**/*"], ["fonts-watch"]);
	gulp.watch(["data/*", "data/**/*"], ["data-watch"]);
});

//- add "localize", "image" later 
gulp.task("build", function () {
	gulp.start("sass", "pug", "data", "uglify", "fonts", "image");
});

gulp.task("default", ["build", "watch"]);