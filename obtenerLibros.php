<?php
$servername = "localhost";
$username = "root";
$password = "Karolina";
$dbname = "biblioteca";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Conexión fallida: " . $conn->connect_error]));
}

$sql = "SELECT * FROM libros";
$result = $conn->query($sql);

$libros = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $libros[] = $row;
    }
}

echo json_encode(['success' => true, 'libros' => $libros]);

$conn->close();
?>
