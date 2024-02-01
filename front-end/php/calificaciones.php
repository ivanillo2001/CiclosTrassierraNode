<?php

require_once "connection.php";


$idCurso=htmlspecialchars($_REQUEST['idCurso']);
$idModulo = htmlspecialchars($_REQUEST['idModulo']);
$idAlumno = htmlspecialchars($_REQUEST['idAlumno']);
$calificacion = htmlspecialchars($_REQUEST['calificacion']);

$jsondata["data"] = array();


try {
	$stmt = $pdo->prepare("INSERT INTO calificaciones VALUES(NULL,'$idCurso','$idModulo',$idAlumno,'$calificacion')");
	$stmt->execute();
	$jsondata["data"] = $stmt->fetchall();
} catch (PDOException $e) {
	$jsondata["mensaje"]="Error";
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);
$pdo=null;

exit();

