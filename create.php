<?php
header('Content-Type: application/json');
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['first_name'], $data['last_name'], $data['roll_no'], $data['class'])) {
    echo json_encode(["error" => "Missing required data"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO students (first_name, last_name, roll_no, class) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $data['first_name'], $data['last_name'], $data['roll_no'], $data['class']);

if ($stmt->execute()) {
    echo json_encode(["message" => "Student added successfully"]);
} else {
    echo json_encode(["error" => "Error adding student: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>