<?php
header('Content-Type: application/json');
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["error" => "Missing student ID"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM students WHERE id=?");
$stmt->bind_param("i", $data['id']);

if ($stmt->execute()) {
    echo json_encode(["message" => "Student deleted successfully"]);
} else {
    echo json_encode(["error" => "Error deleting student: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>