//CSS
const { src, dest, watch, parallel } = require('gulp'); //Retorna multiples funciones de lo contrario se coloca nombre
const sass = require("gulp-sass")(require('sass')); //Ir a la carpeta de node-module gulp-sass para poder compilarlo
const plumber = require('gulp-plumber');
//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif= require('gulp-avif');
/* Crear tareas como funcion, callback, fn o done para terminar tarea*/
function css (done){   
    src('src/scss/**/*.scss')//Identificar el archivo a compilar o colocar **/* para que este pendiente de cambios en cualquier archivo .scss
        .pipe (plumber()) //evitar tener el work flow
        .pipe( sass())//Leer el archivo y compilarlo
        .pipe( dest('build/css'))//Almacenar el archivo
    done();
}
function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe (dest('build/img'))
    done();
}
function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}
function versionAvif(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}
function dev(done){
    watch('src/scss/**/*.scss', css);//Que archivo se le permite el watch y luego la funcion css que es la tarea
    done();
}
/* Habilitar tarea para la terminal */
exports.css = css;
exports.imagenes = imagenes;
exports.avif = avif;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, imagenes, dev, versionAvif);
exports.devs = dev;