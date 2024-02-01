import conexion from "../mysql_conector.js";

/**
 * @description Funcion encargada de hacer la petición a la bbdd para
 * obtener los cursos.
 * @param {*} req 
 * @param {*} res 
 */
export const mostrarCursos = async (req, res) => {
  try {
    const [result] = await conexion.query("Select * from cursos"); 
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

/**
 * @description Función encargada de hacer la petición de modulos que tiene un curso.
 * El curso se pasa como parámetro para hacer la consulta y se trata del parámetro req.
 * @param {*} req 
 * @param {*} res 
 */
export const mostrarModulos = async (req, res) => {
  try {
    const { id } = req.params; //para extraer el atributo id de params
    const [result] = await conexion.query(
      "SELECT * FROM modulos where idCurso=? order by descripcion",
      [id]
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

/**
 * @description Función encargada de hacer la petición a la bbdd para mostrar los alumnos 
 * que tiene un curso. Éste se pasa como parámetro (req)
 * @param {*} req 
 * @param {*} res 
 */
export const mostrarAlumnos = async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    const { id } = req.params; //para extraer el atributo id de params
    const [result] = await conexion.query(
      "SELECT * FROM alumnos where idCurso=? order by apellidosNombre",
      [id]
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

