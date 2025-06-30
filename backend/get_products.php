<?php

declare(strict_types=1);

require_once('./config.php');
require_once('./helper_functions.php');

try {

  $maxPrice = isset($_GET['maxPrice']) ? (float) $_GET['maxPrice'] : 99999.99;
  $categoryId = isset($_GET['categoryId']) ? (int) $_GET['categoryId'] : null;

  $params = [$maxPrice];

  if ($categoryId) {
    $query = "SELECT p.*, c.title AS cat_title, c.id AS cat_id FROM products p 
              LEFT JOIN categories c ON p.category_id = c.id
              WHERE p.price < ?
              AND p.category_id = ?";

    $params[] = $categoryId;
  } else {
    $query = "SELECT p.*, c.title AS cat_title, c.id AS cat_id FROM products p 
              LEFT JOIN categories c ON p.category_id = c.id
              WHERE p.price < ?";
  }

  $stmt = $pdo->prepare($query);
  $stmt->execute($params);
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
