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
