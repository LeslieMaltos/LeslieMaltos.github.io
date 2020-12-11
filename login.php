<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "test";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if(!$conn){
    die("No hay conexion:" .mysqli_connect_error());
}

$nombre = $_POST["txtusuario"];
$pass = $_POST["txtpassword"];

$query = mysqli_query($conn,"SELECT * FROM Login WHERE usuario = '".$nombre."' and password = '".$pass."'");
$nr = mysqli_num_rows($query);

if($nr == 1){
    
    header("location: login.html");
    echo "Bienvenido: " .$nombre;
}
else if ($nr == 0)
{
    echo "Error Usuario no existe. ";
}