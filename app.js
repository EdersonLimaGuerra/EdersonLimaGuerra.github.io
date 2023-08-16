// La variables para guardar los turnos en la lista y en memoria
let listaTurnos = [];
let turnoEliminado = null;


let contadorTurno = 1;
let intervaloProximoTurno = null;


function getValueById(id) {
  return document.getElementById(id).value;
}

function generarPaseTurno() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = "0123456789";
  let paseTurno = "";

  // Generar dos letras aleatorias
  for (let i = 0; i < 2; i++) {
    const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
    paseTurno += letraAleatoria;
  }

  // Generar dos números aleatorios
  for (let i = 0; i < 2; i++) {
    const numeroAleatorio = numeros[Math.floor(Math.random() * numeros.length)];
    paseTurno += numeroAleatorio;
  }

  return paseTurno;
}
function guardarTurno(turno) {
  listaTurnos.push(turno);
}


function mostrarTurnoEnLista(turno) {
  const listaTurnosUl = document.getElementById('listaTurnos');
  const li = document.createElement('li');
  li.textContent = `${turno.nombre} ${turno.apellido}. Pase de Turno: ${turno.paseTurno}`;
  listaTurnosUl.appendChild(li);
}

function eliminarTurnoDeLista(turno) {
  const listaTurnosUl = document.getElementById('listaTurnos');
  const listaTurnosLi = listaTurnosUl.getElementsByTagName('li');
  for (let i = 0; i < listaTurnosLi.length; i++) {
    const li = listaTurnosLi[i];
    if (li.textContent.includes(`${turno.nombre} ${turno.apellido}. Pase de Turno: ${turno.paseTurno}`)) {
      listaTurnosUl.removeChild(li);
      break;
    }
  }
}

function mostrarSiguienteTurno() {
  if (turnosEnMemoria.length > 0) {
    const proximoTurno = turnosEnMemoria.shift();
    listaTurnos.push(proximoTurno);
    actualizarListaTurnos(); 
  }
}

function mostrarTurnoAnterior() {
  if (listaTurnos.length > 0) {
    turnoEliminado = listaTurnos.shift();
    mostrarTextoTurnoEliminado(turnoEliminado);
    eliminarTurnoDeLista(turnoEliminado);
    mostrarListaTurnosEnEspera();
    actualizarListaTurnos(); 
  }
}

function mostrarTextoTurnoEliminado(turno) {
  const turnoTomadoDiv = document.getElementById('turnoTomado');
  turnoTomadoDiv.textContent = `Es turno del cliente ${turno.nombre} ${turno.apellido}. Pase de Turno: ${turno.paseTurno}`;
}

function mostrarListaTurnosEnEspera() {
  const turnoEliminadoDiv = document.getElementById('turnoEliminado');
  turnoEliminadoDiv.textContent = `Es turno del cliente ${turnoEliminado.nombre} ${turnoEliminado.apellido}. Pase de Turno: ${turnoEliminado.paseTurno}`;
}

document.getElementById('turnoForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = getValueById('nombre');
  const apellido = getValueById('apellido');
  const fechaTurno = new Date().toLocaleDateString();

  const paseTurno = generarPaseTurno();

  const nuevoTurno = {
    nombre,
    apellido,
    fechaTurno,
    paseTurno,
    numeroTurno: contadorTurno,
  };

  contadorTurno++;

  guardarTurno(nuevoTurno);
  mostrarTurnoEnLista(nuevoTurno);
  actualizarListaTurnos(); // Actualizar la lista de turnos en la página
  resetForm();
});

document.getElementById('mostrarTurno').addEventListener('click', function () {
  mostrarTurnoAnterior();
});

function mostrarListaTurnos(turnos) {
  const listaTurnosUl = document.getElementById('listaTurnos');
  listaTurnosUl.innerHTML = '';

  for (const turno of turnos) {
    const li = document.createElement('li');
    li.textContent = `${turno.nombre} ${turno.apellido}. Pase de Turno: ${turno.paseTurno}`;
    listaTurnosUl.appendChild(li);
  }
}

// resetear el formulario
function resetForm() {
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
}


mostrarListaTurnos(listaTurnos);

mostrarListaTurnosEnEspera(); 
function actualizarListaTurnos() {
  mostrarListaTurnos(listaTurnos);
}

// Función para actualizar la lista de turnos en espera en la página
function actualizarListaTurnosEnEspera() {
  mostrarListaTurnosEnEspera();
}
