<?php

require_once "connection.php";


$id=htmlspecialchars($_REQUEST['idCurso']);


$jsondata["data"] = array();

try {
	$stmt = $pdo->prepare("SELECT * FROM modulos where idCurso='$id' order by descripcion");
	$stmt->execute();
	$jsondata["data"] = $stmt->fetchall();
} catch (PDOException $e) {
	$jsondata["mensaje"]="Error";
}

header('Content-type: application/json; charset=utf-8');
echo json_encode($jsondata);
$pdo=null;

exit();