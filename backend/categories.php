<?php

declare(strict_types=1);

require_once("./config.php");

try {
  //Fetching categories
  $query = "SELECT * FROM categories";


  $stmt = $pdo->prepare($query);
  $stmt->execute();
  $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if (empty($categories)) {
    echo json_encode([]);
    exit;
  }

  // returning the categories to the frontend
  echo json_encode($categories);
} catch (PDOException $err) {
  echo json_encode(['Error' => $err->getMessage()]);
}
