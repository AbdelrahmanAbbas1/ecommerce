import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function CategoriesList({ setSelectedCategoryId, selectedCategoryId }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching the data from the api endpoint dynamically
  useEffect(() => {
    const url = "http://localhost/ecommerce/backend/categories.php";

    // Make Get request to fetch data
    axios
      .get(url)
      .then((response) => {
        setCategories(response.data);
        // To avoid loading state after successful fetch
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handling the loading state
  if (loading) return <div>Loading...</div>;
  // Handling the Error State
  if (error) return <div>Error: {error}</div>;

  //To get the category title from the id
  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );
  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedCategory ? selectedCategory.title : "Select Category"}
          </button>
          {/* Mappign the categories fetched from the database */}
          <ul className="dropdown-menu">
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                    }}
                  >
                    {category.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CategoriesList;
