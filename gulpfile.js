var browserSync = require("browser-sync"),
    gulp = require("gulp"),
    gulpCleanCss = require("gulp-clean-css"),
    gulpSass = require("gulp-sass"),
    gulpUglify = require("gulp-uglify"),
    mergeStream = require("merge-stream");

gulp.task("stylay",function(){
    gulp.src("./node_modules/materialize-css/dist/css/materialize.min.css")
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("scriptJs",function(){
    var jeRecupereDuJquery = gulp.src("./node_modules/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("./dist/js/"));

    var jeRecupereMaterialize = gulp.src("./node_modules/materialize-css/dist/js/materialize.min.js")
        .pipe(gulp.dest("./dist/js/"));

    return mergeStream(jeRecupereDuJquery, jeRecupereMaterialize);
});

gulp.task("sass",function(){
    return gulp.src("./assets/scss/*.scss")  //fichier ou dossier source (sass nécessite return because that's why)
        .pipe(gulpSass())                   //transforme juste le scss en css
        .pipe(gulpCleanCss())               //minifie le css
        .pipe(gulp.dest("./dist/css/"));     //export du .css modifié dans ce dossier
});

gulp.task("jeMinifieLeJs",function(){
    gulp.src("./assets/js/*.js")             //fichier ou dossier source
        .pipe(gulpUglify())                 //action (minifie le js)
        .pipe(gulp.dest("./dist/js/"))       //export du .js modifié dans ce dossier
});

gulp.task("fonctionBrowserSync",function(){
    browserSync.init({  //initialise browsersync
        server: "./"    //pour le dossier courant
    });
});

gulp.task("gulpWatch",["stylay","scriptJs","sass","jeMinifieLeJs","fonctionBrowserSync"], function(){   //je suis gulp et je suis un creep
    gulp.watch("./assets/scss/*.scss",["sass"]).on("change",browserSync.reload)  //et je surveille les fichiers scss quand ils sont modifiés et quand ça se passe, je recharge la page browserSync
    gulp.watch("./assets/js/*js",["jeMinifieLeJs"]).on("change",browserSync.reload) //et la même chose avec les fichiers js
    gulp.watch("./*.html").on("change",browserSync.reload)
    //et je surveille le .html, hop.
});

gulp.task("default",["gulpWatch"]);     //fonction lancée quand on tape "gulp" dans le terminal, qui lance gulpwatch, qui fait le taff.