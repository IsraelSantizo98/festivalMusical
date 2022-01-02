//CSS
const { src, dest, watch } = require('gulp'); //Retorna multiples funciones de lo contrario se coloca nombre
const sass = require("gulp-sass")(require('sass')); //Ir a la carpeta de node-module gulp-sass para poder compilarlo
const plumber = require('gulp-plumber');
//Imagenes
const webp = require('gulp-webp');
/* Crear tareas como funcion, callback, fn o done para terminar tarea*/
function css (done){   
    src('src/scss/**/*.scss')//Identificar el archivo a compilar o colocar **/* para que este pendiente de cambios en cualquier archivo .scss
        .pipe (plumber()) //evitar tener el work flow
        .pipe( sass())//Leer el archivo y compilarlo
        .pipe( dest('build/css'))//Almacenar el archivo
    done();
}
function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('buil/img'))
    done();
}
function dev(done){
    watch('src/scss/**/*.scss', css);//Que archivo se le permite el watch y luego la funcion css que es la tarea
    done();
}
/* Habilitar tarea para la terminal */
exports.dev = dev;
exports.versionWebp = versionWebp;
exports.css = css;