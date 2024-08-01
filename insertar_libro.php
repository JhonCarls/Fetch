<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['titulo']) || !isset($data['autor'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

$id = $data['id'];
$titulo = $data['titulo'];
$autor = $data['autor'];

$conn = new mysqli('localhost', 'root', 'Karolina', 'biblioteca');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO libros (id, titulo, autor) VALUES (?, ?, ?)");
$stmt->bind_param('iss', $id, $titulo, $autor);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al insertar']);
}

$stmt->close();
$conn->close();
?>
