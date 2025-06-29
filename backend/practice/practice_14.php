<?php

declare(strict_types=1);

require_once('../config.php');

try {
  $query = "SELECT p.name, c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id";

  $stmt = $pdo->prepare($query);
  $stmt->execute();
  $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($products);
} catch (PDOException $e) {
  echo "Error " . $e->getMessage();
}
