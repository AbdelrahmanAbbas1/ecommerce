import placeholder from "../assets/placeholder.png";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductCard({ product }) {
  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="card h-100 text-center">
          <img src={placeholder} alt={product.name} className="card-img-top" />
          <div className="card-body">
            <p className="badge bg-secondary">{product.cat_title}</p>
            <h5 className="card-title">{product.name}</h5>
            <p
              className="card-text text-turnicate"
              style={{
                maxWidth: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
              }}
            >
              {product.description}
            </p>
            <p className="card-text fw-bold">
              {product.price}
              {product.discount && (
                <span className="text-muted small d-block">
                  {product.discount}
                </span>
              )}
            </p>
            <a href="#" className="btn btn-primary">
              Add
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
