<?php
header('Content-Type: application/json');
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'], $data['first_name'], $data['last_name'], $data['roll_no'], $data['class'])) {
    echo json_encode(["error" => "Missing required data"]);
    exit;
}

$stmt = $conn->prepare("UPDATE students SET first_name=?, last_name=?, roll_no=?, class=? WHERE id=?");
$stmt->bind_param("ssssi", $data['first_name'], $data['last_name'], $data['roll_no'], $data['class'], $data['id']);

if ($stmt->execute()) {
    echo json_encode(["message" => "Student updated successfully"]);
} else {
    echo json_encode(["error" => "Error updating student: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>