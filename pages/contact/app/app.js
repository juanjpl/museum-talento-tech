let formulario = {
  name: "",
  email: "",
  message: "",
};

let formularioError = {
  name: false,
  email: false,
  message: false,
};

habilitarEnvio();

function onInputChange(tipo, valor) {
  validacion(tipo, valor);
}

function validacion(tipo, valor) {
  let respuesta;

  if (tipo === "name" || tipo === "message") {
    let patron = /^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/;
    respuesta = validacionNombre(valor, patron);
    formularioError[tipo] = respuesta;
    formulario[tipo] = valor;
  } else if (tipo === "email") {
    let patron =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    respuesta = validacionNombre(valor, patron);
    formularioError[tipo] = respuesta;
    formulario[tipo] = valor;
  } else {
    console.log("no se puede validar");
    respuesta = false;
  }

  return respuesta;
}

function validacionNombre(valor, patron) {
  const pattern = patron;

  let resultado = pattern.test(valor);

  return resultado;
}

function habilitarEnvio() {
  const botonEnviar = document.getElementById("boton-enviar");

  if (
    !formularioError.name ||
    !formularioError.email ||
    !formularioError.message
  ) {
    botonEnviar.setAttribute("disabled", true);
    botonEnviar.className = "btn boton-enviar-deshabilitado";
    console.log("Formulario chequeado y deshabilitado, faltan completar datos");
  } else {
    console.log("Habilitado para enviar");
    botonEnviar.removeAttribute("disabled", false);
    botonEnviar.className.remove = "btn boton-enviar-deshabilitado";
    botonEnviar.className = "btn boton-enviar-habilitado";
    console.log("Formulario chequeado y habilitado");
  }
}

const chequearEnvio = () => {
  const nombre = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const formulario = document.getElementsByClassName("formulario-contacto");

  if (nombre === "" || email === "" || message === "") {
    console.log("nombre o email o mensaje   vacio");
  } else {
    console.log(nombre, email, message);
  }
};

const chequearCampos = () => {};

const reset = (formulario) => {
  if (
    nombre === "" ||
    email == "" ||
    message === "" ||
    nombre === null ||
    email === null ||
    message === null
  ) {
    console.log("Faltan campos a completar");
  } else {
    console.log(nombre, email, message);
    reset(formulario);
  }
};
