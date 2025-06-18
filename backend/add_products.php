<?php

declare(strict_types=1);

header('Content-Type: application/json');

require_once('./config.php');
require_once('./helper_functions.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $description = $_POST['description'];
  $price = $_POST['price'];

  // Validate the product
  if (!validateProduct($name, $price)) {
    echo json_encode(['error' => 'Invalid Input']);
    exit;
  }
  try {
    $query = "INSERT INTO products (name, description, price) Values
            (?, ?, ?)";
    $data = [
      $name,
      $description,
      $price
    ];
    $stmt = $pdo->prepare($query);
    $stmt->execute($data);
    echo json_encode(['success' => true, 'message' => "Products added"]);
  } catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
  }
}
