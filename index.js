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

class Nodo{
    constructor(alumno){
        this.alumno = alumno;
        this.siguiente = null;
    }
}

class ListaEnlazadaMaterias{
    constructor(materia){
        this.materia = materia;
        this.cabeza = null;
    }

    agregarEnListaEnlazada(nuevoAlumno){
        const nuevoNodo = new Nodo(nuevoAlumno);
        if(this.cabeza == null){
            this.cabeza = nuevoNodo;
        }else{
            let actual = this.cabeza;
            while (actual.siguiente != null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

    // Propiedad estática para almacenar varias instancias de ListaEnlazadaMaterias
    static materiasArray = JSON.parse(localStorage.getItem('alumnosInscritosEnMateria')) || [];

    actualizarOpcionesMateria() {
        const materiaSelect = document.getElementById('materiaSelect');
        materiaSelect.innerHTML = '';
        
        for (let i = 0; i < ListaEnlazadaMaterias.materiasArray.length; i++) {
            const materia = ListaEnlazadaMaterias.materiasArray[i].materia;
            const option = document.createElement('option');
            option.value = materia.toLowerCase();
            option.textContent = materia;
            materiaSelect.appendChild(option);
        }
    }

    ordenamientoSortAlumnoPorApellido(arreglo){
        let ordenar = [...arreglo];
        ordenar = ordenar.sort((a,b) => a.apellidos.localeCompare(b.apellidos));
        return ordenar;
    }

    busquedaBinariaAlumnoPorApellido(apellidos, arreglo, inicio, final){
        if (inicio > final) {
            return -1;
        }
        const posicionMitad = Math.floor((inicio + final) / 2);
        if (arreglo[posicionMitad].apellidos.toLowerCase() === apellidos.toLowerCase()) {
            return posicionMitad;
        } else if (apellidos > arreglo[posicionMitad].apellidos) {
            //Me muevo a la derecha
            return this.busquedaBinariaAlumnoPorApellido(apellidos, arreglo, posicionMitad + 1, final);
        } else {
            //Me muevo a la izquierda
            return this.busquedaBinariaAlumnoPorApellido(apellidos, arreglo, inicio, posicionMitad - 1);
        }
    }

    buscarAlumnoParaRegistrarEnMateria(buscar){
        const tablaMateria = document.getElementById('tablaAlumnosParaMateria').getElementsByTagName('tbody')[0];

        // Limpiar la tabla antes de mostrar los datos
        tablaMateria.innerHTML = '';

        //Ordenamos el arreglo
        const listaArreglo = this.ordenamientoSortAlumnoPorApellido(lista.listaAlumnos);
        console.log(listaArreglo);

        // Buscamos al alumno
        const encontrado = this.busquedaBinariaAlumnoPorApellido(buscar, listaArreglo, 0, listaArreglo.length - 1);

        // Eliminar mensaje existente, si hay uno
        const mensajeExistente = document.getElementById('mensajeAlumnoNoEncontradoMateria');
        if (mensajeExistente) {
            mensajeExistente.remove();
        }

        if (encontrado === -1) {
            console.log('No se encontro el alumno...');
            const mensaje = document.createElement('p');
            mensaje.id = 'mensajeAlumnoNoEncontradoMateria';
            mensaje.innerText = `El alumno ${buscar} no se encuentra en la lista.`;
            document.body.appendChild(mensaje);
        } else {
            console.log('Se encontro el alumno...');
            const alumno = listaArreglo[encontrado];
            const posicion = lista.listaAlumnos.indexOf(alumno);
            const fila = tablaMateria.insertRow();
            fila.insertCell(0).innerText = posicion + 1;
            fila.insertCell(1).innerText = alumno.nombre;
            fila.insertCell(2).innerText = alumno.apellidos;
            fila.insertCell(3).innerText = alumno.edad;
        }
        console.log(lista.listaAlumnos);
    }

    mandarFormularioParaRegistrarAlumnoEnMateria(buscar, materiaSelecionada, calificacionAlumno){
        // Eliminar mensaje existente, si hay uno
        const mensajeExistente = document.getElementById('mensajeMateriaNoEnontrado');
        if (mensajeExistente) {
            mensajeExistente.remove();
        }

        if(ListaEnlazadaMaterias.materiasArray.length === 0 ){
            console.log('No se encontro ningun curso...');
            const mensaje = document.createElement('p');
            mensaje.id = 'mensajeMateriaNoEnontrado';
            mensaje.innerText = `Ninguna Materia se ha creado actualmente.`;
            document.body.appendChild(mensaje);
        }else if(ListaEnlazadaMaterias.materiasArray.length > 0){
            //Ordenamos el arreglo
            const listaArreglo = this.ordenamientoSortAlumnoPorApellido(lista.listaAlumnos);
            console.log(listaArreglo);

            // Buscamos al alumno
            const encontrado = this.busquedaBinariaAlumnoPorApellido(buscar, listaArreglo, 0, listaArreglo.length - 1);

            if (encontrado !== -1) {
                const alumnoEncontradoEnLocal = listaArreglo[encontrado];
                const posicionEncontradaEnLocal = lista.listaAlumnos.indexOf(alumnoEncontradoEnLocal);
                const materiaParaAlumno = new MateriasInscritas(materiaSelecionada, calificacionAlumno);
                lista.listaAlumnos[posicionEncontradaEnLocal].materiasInscritas = materiaParaAlumno;
                localStorage.setItem('listaAlumnos', JSON.stringify(lista.listaAlumnos));

                for (let i = 0; i < ListaEnlazadaMaterias.materiasArray.length; i++) {
                    if (ListaEnlazadaMaterias.materiasArray[i].materia === materiaSelecionada) {
                        const nuevoNodoAlumno = new Nodo(lista.listaAlumnos[posicionEncontradaEnLocal]);
                        if (ListaEnlazadaMaterias.materiasArray[i].cabeza === null) {
                            ListaEnlazadaMaterias.materiasArray[i].cabeza = nuevoNodoAlumno;
                        } else {
                            let actual = ListaEnlazadaMaterias.materiasArray[i].cabeza;
                            while (actual.siguiente !== null) {
                                actual = actual.siguiente;
                            }
                            actual.siguiente = nuevoNodoAlumno;
                        }

                        const mensaje = document.createElement('p');
                        mensaje.id = 'mensajeMateriaNoEnontrado';
                        mensaje.innerText = `Se registro correctamente.`;
                        document.body.appendChild(mensaje);
                        console.log(ListaEnlazadaMaterias.materiasArray[0]);
                        localStorage.setItem('alumnosInscritosEnMateria', JSON.stringify(ListaEnlazadaMaterias.materiasArray));
                    }
                }
                // localStorage.setItem('alumnosInscritosEnMateria', JSON.stringify(ListaEnlazadaMaterias.materiasArray));
            } else {
                const mensaje = document.createElement('p');
                mensaje.id = 'mensajeMateriaNoEnontrado';
                mensaje.innerText = `El alumno ${buscar} no se encuentra en la lista.`;
                document.body.appendChild(mensaje);
                console.log(ListaEnlazadaMaterias.materiasArray[0]);
            }
        }
    }
}

// Se crea una instancia global de ListaAlumnos
const lista = new ListaAlumnos();
const listaMateria = new ListaEnlazadaMaterias(); 



