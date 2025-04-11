<?php
include 'db.php';

$result = $conn->query("SELECT * FROM items ORDER BY id DESC");
$items = [];

while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

echo json_encode($items);
?>