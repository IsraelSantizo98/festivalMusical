const { src, dest, watch } = require('gulp'); //Retorna multiples funciones de lo contrario se coloca nombre
const sass = require("gulp-sass")(require('sass')); //Ir a la carpeta de node-module gulp-sass para poder compilarlo
/* Crear tareas como funcion, callback, fn o done para terminar tarea*/
function css (done){   
    src('src/scss/app.scss')//Identificar el archivo a compilar
        .pipe( sass())//Leer el archivo y compilarlo
        .pipe( dest('build/css'))//Almacenar el archivo
    done();
}
function dev(done){
    watch('src/scss/app.scss', css);//Que archivo se le permite el watch y luego la funcion css que es la tarea
    done();
}
/* Habilitar tarea para la terminal */
exports.dev = dev;
exports.css = css;