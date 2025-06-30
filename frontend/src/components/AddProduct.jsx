import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/ecommerce/backend/add_products.php",
        {
          name,
          price,
          description,
          category_id: categoryId,
        }
      );
      if (response.data && response.data.success) {
        setName("");
        setPrice("");
        setDescription("");
        setCategoryId("");
        alert("A new product is added");
      } else {
        console.log(response, response.data.success, response.data);
        alert("Failed to add product");
      }
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <>
      <div className="container-xxl text-center mt-3">
        <button
          className="btn btn-light fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#addProduct"
        >
          Add Product
        </button>
      </div>
      <div
        className="modal fade"
        id="addProduct"
        tabIndex="-1"
        aria-labelledby="addProduct"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>

            {/* Start Form */}
            <form method="POST" onSubmit={handleOnSubmit}>
              <div className="modal-body">
                {/* Setting the product name */}
                <label htmlFor="productName" className="col-form-label">
                  Name:
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="productName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                {/* Setting the product price */}
                <label htmlFor="productPrice" className="col-form-label">
                  Price:
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  id="productPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                {/* Setting the product description */}
                <label htmlFor="productDescription" className="col-form-label">
                  Description:
                </label>
                <textarea
                  name="description"
                  id="productDescription"
                  className="form-control"
                  minLength="10"
                  maxLength="100"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>

                {/* Setting the product category_id */}
                <label htmlFor="productCategoryId" className="col-form-label">
                  Category Id:
                </label>
                <input
                  type="number"
                  name="categoryId"
                  id="productCategoryId"
                  className="form-control"
                  value={categoryId}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= 0 || value > 3) {
                      setCategoryError("You have to Enter a valid id (1-3)");
                      setCategoryId("");
                    } else {
                      setCategoryError("");
                      setCategoryId(value);
                    }
                  }}
                  required
                />
                {categoryError && (
                  <div className="text-danger" style={{ fontSize: "0.9em" }}>
                    {categoryError}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!categoryId || categoryError}
                >
                  Add Product
                </button>
              </div>

              {/* End Form */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// Still needs some work
export default AddProduct;
