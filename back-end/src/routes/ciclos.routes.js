"use strict"
/**
 * Importaciones necesarias:
 */
import { Router } from "express";
import {mostrarCursos, mostrarModulos, mostrarAlumnos} from "../controllers/ciclos.controllers.js";//con esto importamos las funciones desde controller

const router = Router(); //declaración del router

router.get("/cursos",mostrarCursos);//dirección de la funcion de mostrar cursos

router.get("/modulos/:id",mostrarModulos);//dirección de la funcion de mostrarModulos. Se pasa el idCurso como parametro

router.get("/alumnos/:id",mostrarAlumnos)//dirección de la funcion de mostrarAlumnos. Se pasa el idCurso como parametro


export default router;//lo exportamos.
