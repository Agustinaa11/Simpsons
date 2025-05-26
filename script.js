const API_URL = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=5';

let citas = []; 
let respuestasCorrectas = []; 

fetch(API_URL)
  .then(respuesta => respuesta.json())
  .then(data => {
    citas = data;
    respuestasCorrectas = data.map(objeto => objeto.character);
    mostrarCitas();
    mostrarPersonajes();
  });

function mostrarCitas() {
  const contenedor = document.getElementById('contenedor-citas');
  contenedor.innerHTML = '';
  citas.forEach((cita, indice) => {
    const div = document.createElement('div');
    div.className = 'cita';
    div.textContent = cita.quote;
    div.dataset.indice = indice;
    div.ondragover = evento => evento.preventDefault(); 
    div.ondrop = verificarCoincidencia;
    contenedor.appendChild(div);
  });
}

function mostrarPersonajes() {
  const contenedor = document.getElementById('contenedor-personajes');
  contenedor.innerHTML = '';
  let mezclados = [...citas].sort(() => Math.random() - 0.5);

  mezclados.forEach((cita, i) => {
    const div = document.createElement('div');
    div.className = 'personaje';
    div.draggable = true;
    div.dataset.personaje = cita.character;

    div.ondragstart = evento => {
      evento.dataTransfer.setData('text/plain', cita.character);
    };

    const imagen = document.createElement('img');
    imagen.src = cita.image;
    imagen.alt = cita.character;
    div.appendChild(imagen);

    contenedor.appendChild(div);
  });
}

function verificarCoincidencia(evento) {
  const personajeSoltado = evento.dataTransfer.getData('text/plain');
  const indiceCita = evento.currentTarget.dataset.indice;
  const personajeCorrecto = respuestasCorrectas[indiceCita];

  if (personajeSoltado === personajeCorrecto) {
    evento.currentTarget.classList.add('correcto');
    evento.currentTarget.classList.remove('incorrecto');
  } else {
    evento.currentTarget.classList.add('incorrecto');
    evento.currentTarget.classList.remove('correcto');
  }
}
