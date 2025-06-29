<?php

declare(strict_types=1);

require_once('./config.php');
require_once('./helper_functions.php');

try {

  $maxPrice = isset($_GET['xmaxPrice']) ? (float) $_GET['maxPrice'] : 99999.99;

  $query = "SELECT p.*, c.name AS category_name
            FROM products AS p
            LEFT JOIN categories as c ON p.category_id = c.id
            WHERE p.price <= ?
            ";
  $stmt = $pdo->prepare($query);
  $stmt->execute([$maxPrice]);
  $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if (empty($products)) {
    // Returning an empty array is the safest way to make sure that the map funciton works well
    echo json_encode([]);
    exit;
  }

  //Filter cheap products
  if (isset($_GET['cheap_only'])) {
    $products = filterCheapProducts($products);
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
