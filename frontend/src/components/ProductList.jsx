import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [Error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState("");

  const getProducts = async (price) => {
    const url = price
      ? `http://localhost/ecommerce/backend/get_products.php?maxPrice=${price}`
      : "http://localhost/ecommerce/backend/get_products.php";
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        setError("Failed to get products");
        console.error(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    getProducts(maxPrice);
  };

  const handleReset = () => {
    setMaxPrice("");
  };

  return (
    <div className="container-xl">
      <form className="row justify-content-center p-3" onSubmit={handleFilter}>
        <div className="col-md-6">
          <input
            className="form-control"
            type="number"
            name="maxPrice"
            aria-labelledby="maxPrice"
            placeholder="Filter by Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-4">
          <div className="d-flex gap-2">
            <button className="btn btn-light flex-grow-1">Filter</button>
            <button className="btn btn-light flex-grow-1" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>
      <div className="row p-3">
        {products.length === 0 ? (
          <div className="col-10">No products Found</div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
