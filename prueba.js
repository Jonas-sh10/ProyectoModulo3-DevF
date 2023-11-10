// Ejemplo de uso
const materias = ['Matemáticas', 'Historia', 'Ciencias'];
const calificaciones = [90, 80, 95];

const materiasInscritas = new MateriasInscritas(materias, calificaciones);

const alumno1 = new Alumno('Juan', 'Pérez', 20, materiasInscritas);

// Acceder a la calificación de Matemáticas
const calificacionMatematicas = alumno1.materiasInscritas.calificaciones[alumno1.materiasInscritas.materias.indexOf('Ciencias')];

console.log(`La calificación de Matemáticas es: ${calificacionMatematicas}`);