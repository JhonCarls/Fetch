<?php
$servername = "localhost";
$username = "root";
$password = "Karolina";
$dbname = "biblioteca";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Conexión fallida: " . $conn->connect_error]));
}

$id = $_GET['id'];

$sql = "SELECT * FROM libros WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $libro = $result->fetch_assoc();
    echo json_encode(['success' => true, 'libro' => $libro]);
} else {
    echo json_encode(['success' => false, 'message' => "Libro no encontrado"]);
}

$conn->close();
?>
