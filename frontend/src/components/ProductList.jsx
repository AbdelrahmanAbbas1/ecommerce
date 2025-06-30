import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductList({ categoryId, setCategoryId }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState("");

  const getProducts = async (price) => {
    let baseUrl = "http://localhost/ecommerce/backend/get_products.php";
    let params = [];
    // Handling the parameters because if the 2 parameters are set the first one will be ? and the second will be &
    if (price) params.push(`maxPrice=${price}`);
    if (categoryId) params.push(`categoryId=${categoryId}`);

    const url = params.length ? `${baseUrl}?${params.join("&")}` : baseUrl;

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
        // To end the loading state after a successful fetch
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    setProducts([]); // Clear previous products

    getProducts();
  }, [categoryId]);

  const handleFilter = (e) => {
    e.preventDefault();
    getProducts(maxPrice);
  };

  const handleReset = () => {
    setMaxPrice("");
    setCategoryId(null);
  };

  // Handling the Loading state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
