<?php

declare(strict_types=1);

require_once('./config.php');
require_once('./helper_functions.php');

try {
  $maxPrice = isset($_GET['maxPrice']) ? (float) $_GET['maxPrice'] : 99999.99;
  $stmt = $pdo->prepare('SELECT * FROM products WHERE price <= ?');
  $stmt->execute([$maxPrice]);
  $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if (empty($products)) {
    // Returning an empty array is the safest way to make sure that the map funciton works well
    echo json_encode([]);
    exit;
  }

  // Used a reference here to update the original array
  foreach ($products as &$product) {
    $price = (float) $product['price'];
    $product['discount'] = $price > 500 ? "Eligible for 10% off!" : "";
    $product['price'] = format_price($price);
  }
  echo json_encode($products);
} catch (PDOException $e) {
  echo json_encode(['error' => $e->getMessage()]);
}
