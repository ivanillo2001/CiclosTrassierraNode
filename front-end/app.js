"use strict";

let curso;
let modulo;
window.addEventListener("DOMContentLoaded", () => {
  mostrarCursos();
});
/**
 * @description Funcion que muestra los cursos nada mas cargar la página.
 */
function mostrarCursos() {
  $.ajax({
    url: "http://localhost:3000/cursos",
    type: "GET",
  })
    .done(function (responseText) {
      $(responseText).each((ind, curso) => {
        $("#cursos").append(
          "<option id=" + curso.idCurso + ">" + curso.descripcion + "</option>"
        );
      });
      $("#cursos").change(function () {
        let idCurso = $("#cursos option:selected").attr("id");
        mostrarModulos(idCurso);
      });
    })
    .fail(function (textStatus, xhr) {
      alert("error al cargar cursos");
    });
}

/**
 * @description Funcion encargada de mostrar los módulos que tiene un curso cada vez que se cambia
 * @param {*} idCurso
 */
function mostrarModulos(idCurso) {
  //obtenemos el curso seleccionado:
  const selectedCursoId = idCurso;
  $.ajax({
    url: `http://localhost:3000/modulos/${selectedCursoId}`,
    type: "GET",
  })
    .done(function (responseText) {
      // console.log(responseText); //se muestra por consola los modulos
      $("#modulos").empty(); //limpiamos la lista
      //agregamos option de "Selecciona un modulo"
      $("#modulos").append(`<option>Selecciona un modulo</option>`);
      $(responseText).each((ind, ele) => {
        $("#modulos").append(
          `<option id=${ele.idModulo}>${ele.descripcion}</option>`
        );
      });
    })
    .fail(function (responseText, textStatus, xhr) {
      alert("error al cargar modulos");
    });
  $("#cargar").on("click", function () {
    curso = $("#cursos option:selected").attr("id");
    modulo = $("#modulos option:selected").attr("id");
    mostrarAlumnos(event, selectedCursoId);
  });
}

/**
 * @description Funcion encargada de mostrar los alumnos de un curso al darle a cargar alumnos
 * @param {*} event
 * @param {*} idCurso
 */
function mostrarAlumnos(event, idCurso) {
  event.preventDefault();
  $.ajax({
    url: `http://localhost:3000/alumnos/${idCurso}`,
    type: "GET",
  })
    .done(function (responseText) {
      $(".calificaciones").show();
      $(".myTable tbody").empty();
      $(responseText).each((ind, alumno) => {
        $(".myTable tbody").append(
          "<tr class='alumnoNota'><td id=" +
            alumno.idAlumno +
            ">" +
            alumno.apellidosNombre +
            "</td><td class='notaArrastrada'></td></tr>"
        );
      });
      addDragAndDrop();
      $("#grabar").on("click", function () {
        grabarDatos(curso, modulo);
      });
    })
    .fail(function (responseText, textStatus, xhr) {
      alert("error al cargar alumnos");
    });
}

/**
 * @description Funcion encargada de que se puedan arrastrar y soltar
 * las notas de los alumnos
 */
function addDragAndDrop() {
  //ahora hacemos draggable a los elementos de la clase arrastrar
  $(".arrastrar").draggable({
    helper: "clone",
    start: (event, ui) => {
      console.log("Nota arrastrada " + ui.helper.text()); //pruebas para validar el drag
    },
    stop: (event, ui) => {
      console.log("Nota soltada " + ui.helper.text()); //pruebas para validar el drag
    },
  });
  // hacemos droppables los elementos de la clase notaArrastrada
  $(".notaArrastrada").droppable({
    drop: function (event, ui) {
      var dropTarget = $(this);

      // Si hay contenido, lo reemplazo; de lo contrario, lo agrego
      if (dropTarget.children().length > 0) {
        dropTarget.empty();
      }

      // Añade un clon centrado del elemento arrastrado
      ui.helper
        .clone()
        .css({
          position: "relative",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        })
        .appendTo(dropTarget);
      console.log("Has soltado un " + ui.helper.text()); //pruebas para validar el drop
    },
  });
}

/**
 * Función encargada de grabar las notas de los alumnos introducidas en los campos
 * @param {*} curso
 * @param {*} modulo
 */
function grabarDatos(curso, modulo) {
  let alumnosPuntuados = $(".alumnoNota");
  alumnosPuntuados.each(function () {
    let alumno = $(this); // Convierte el elemento actual a un objeto jQuery
    let datosAlumno = alumno.find("td:first-child");
    let nota = alumno.find(".notaArrastrada");
    let idAlumno = datosAlumno.attr("id");
    let contenidoNombre = datosAlumno.text();
    let contenidoNota = nota.text();
    console.log(
      "Alumno " + idAlumno + " - " + contenidoNombre + " - " + contenidoNota
    );
//almacenamos los datos en una body json
    const datos = {
      idCurso: curso,
      idModulo: modulo,
      idAlumno: idAlumno,
      calificacion: contenidoNota,
    }
    fetch("http://localhost:3000/notas", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(datos),
    })
    .then((datos)=>{
      alert("Insertado con exito")
    })
    .catch((error) => {
      alert("Error al insertar los datos")
    });
  });
}
