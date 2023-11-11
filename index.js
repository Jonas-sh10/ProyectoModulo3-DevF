// Se crea una clase de Cursos
class MateriasInscritas {
    constructor(materia, calificacion) {
        this.materia = materia;
        this.calificacion = calificacion;
    }
}

// Se crea una clase Akumnos con sus respectivos atributos
class Alumno {
    constructor(nombre, apellidos, edad, materiasInscritas) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materiasInscritas = materiasInscritas || [];
    }
}

// Se crea clase Lista para registrar(guardar) todos los alumnos
class ListaAlumnos{
    constructor(){
        this.listaAlumnos = JSON.parse(localStorage.getItem('listaAlumnos')) || [];
    }

    altaAlumnos(alumno){
        this.listaAlumnos.push(alumno);
        localStorage.setItem('listaAlumnos', JSON.stringify(this.listaAlumnos));
    }

    busquedaBinariaAlumno(nombre, arreglo, inicio, final){
        if (inicio > final) {
            return -1;
        }
        const posicionMitad = Math.floor((inicio + final) / 2);
        if (arreglo[posicionMitad].nombre === nombre) {
            return posicionMitad;
        } else if (nombre > arreglo[posicionMitad].nombre) {
            //Me muevo a la derecha
            return this.busquedaBinariaAlumno(nombre, arreglo, posicionMitad + 1, final);
        } else {
            //Me muevo a la izquierda
            return this.busquedaBinariaAlumno(nombre, arreglo, inicio, posicionMitad - 1);
        }
    }

    ordenamientoSortAlumno(arreglo){
        let ordenar = [...arreglo];
        ordenar = ordenar.sort((a,b) => a.nombre.localeCompare(b.nombre));
        return ordenar;
    }

    mostrarAlumnos(){
        const tabla = document.getElementById('tablaAlumnos').getElementsByTagName('tbody')[0];
        // Limpiar la tabla antes de mostrar los datos
        tabla.innerHTML = '';
        for (let i = 0; i < this.listaAlumnos.length; i++) {
            const alumno = this.listaAlumnos[i];
            // Crear una nueva fila
            const fila = tabla.insertRow();
            // Insertar celdas con la información del alumno
            fila.insertCell(0).innerText = i + 1;
            fila.insertCell(1).innerText = alumno.nombre;
            fila.insertCell(2).innerText = alumno.apellidos;
            fila.insertCell(3).innerText = alumno.edad;
        }
    }

    mostrarAlumnoPorNombre(buscar){
        const tabla = document.getElementById('tablaAlumnos').getElementsByTagName('tbody')[0];

        // Limpiar la tabla antes de mostrar los datos
        tabla.innerHTML = '';

        //Ordenamos el arreglo
        const listaArreglo = this.ordenamientoSortAlumno(this.listaAlumnos);

        // Buscamos al alumno
        const encontrado = this.busquedaBinariaAlumno(buscar, listaArreglo, 0, listaArreglo.length - 1);

        // Eliminar mensaje existente, si hay uno
        const mensajeExistente = document.getElementById('mensajeAlumnoNoEncontrado');
        if (mensajeExistente) {
            mensajeExistente.remove();
        }

        if (encontrado === -1) {
            console.log('No se encontro el alumno...');
            const mensaje = document.createElement('p');
            mensaje.id = 'mensajeAlumnoNoEncontrado';
            mensaje.innerText = `El alumno ${buscar} no se encuentra en la lista.`;
            document.body.appendChild(mensaje);
        } else {
            console.log('Se encontro el alumno...');
            const alumno = listaArreglo[encontrado];
            const posicion = this.listaAlumnos.indexOf(alumno);
            const fila = tabla.insertRow();
            fila.insertCell(0).innerText = posicion + 1;
            fila.insertCell(1).innerText = alumno.nombre;
            fila.insertCell(2).innerText = alumno.apellidos;
            fila.insertCell(3).innerText = alumno.edad;
        }
        console.log(this.listaAlumnos);
    }
}

// Se crea una instancia global de ListaAlumnos
const lista = new ListaAlumnos();


