<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$quantity = $data['quantity'];
$price = $data['price'];

$stmt = $conn->prepare("INSERT INTO items (name, quantity, price) VALUES (?, ?, ?)");
$stmt->bind_param("sid", $name, $quantity, $price);
$stmt->execute();

echo json_encode(["status" => "success"]);
?>