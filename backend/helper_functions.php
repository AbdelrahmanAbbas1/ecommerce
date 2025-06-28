<?php

declare(strict_types=1);


// To format the price
function format_price(float $price): string
{
  return "$" . number_format((float) $price, 2, '.', ',');
}

// To validat the name and price
function validateProduct(string $name, mixed $price): bool
{
  return !empty($name) && is_numeric($price) && $price > 0;
}

// Filtering the cheap products based on the price
function filterCheapProducts(array $products): array
{
  $cheapProducts = array_filter($products, function ($product) {
    return (float) $product['price'] < 100;
  });
  return array_values($cheapProducts);
}
