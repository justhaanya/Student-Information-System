<?php
header('Content-Type: application/json');
include 'db.php';

$result = $conn->query("SELECT * FROM students");

if ($result) {
    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
} else {
    echo json_encode(["error" => "Error fetching students: " . $conn->error]);
}

$conn->close();
?>