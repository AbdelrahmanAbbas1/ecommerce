import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/ecommerce/backend/add_products.php",
        {
          name,
          price,
          description,
        }
      );
      if (response.data && response.data.success) {
        setName("");
        setPrice("");
        setDescription("");
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
            <form method="POST" onSubmit={handleOnSubmit}>
              <div className="modal-body">
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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// Still needs some work
export default AddProduct;
