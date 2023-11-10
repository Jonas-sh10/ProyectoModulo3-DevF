class MateriasInscritas {
    constructor(materia, calificacion) {
        this.materia = materia;
        this.calificacion = calificacion;
    }
}

class Alumno {
    constructor(nombre, apellidos, edad, materias) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = materias;
    }
}

class Materias{
    constructor(nombre){
        this.nombre = nombre;
        this.colaGrupoCurso = [];
    }

    encolarAlumnoEnGrupo(alumno){
        this.colaGrupoCurso.push(alumno);
    }

    desencolarAlumnoDeGrupo(){
        this.colaGrupoCurso.shift();
    }
}

// mostrarMateria() {
    //     for (let i = 0; i < this.colaCurso.length; i++) {
    //         console.log(this.colaBaseDatos[i]);
    //     }
    // }


const al = new Alumno('Jhonatan', 'Sullca Hernani', 25);

console.log(al);

const ma = new Materias('Historia');
const mi = new Materias('Ciencias');



class BaseDeDatos {
    constructor() {
        this.colaBaseDatos = [];
    }

    // altaDeAlumnos(alumno) {
    //     const datosAlumno = {
    //         nombre: alumno.nombre,
    //         apellidos: alumno.apellidos,
    //         edad: alumno.edad,
    //         materias: alumno.materias.materia,
    //         calificaciones: alumno.materias.calificacion
    //     };
    //     this.colaBaseDatos.push(datosAlumno);
    // }
}

// const bbdd = new BaseDeDatos();
// const materias = ['Matemáticas', 'Historia', 'Ciencias'];
// const calificaciones = [90, 80, 95];
// const ma = new MateriasInscritas(materias, calificaciones);
// const al = new Alumno('Jhonatan', 'Sullca Hernani', 25, ma);

// bbdd.altaDeAlumnos(al);
// bbdd.mostrarAlumnos();
