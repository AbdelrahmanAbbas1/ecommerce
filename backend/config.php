<?php
$host = "localhost";
$dbname = "ecommerce";
$username = "root";
$password = "";
$charset = "utf8mb4";

try {
  $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
  $pdo = new PDO($dsn, $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo "Connection Failed " . $e->getMessage();
}
