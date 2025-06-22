import ProductList from "./components/ProductList";
import NavBar from "./components/NavBar";
import AddProduct from "./components/AddProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <>
      <NavBar />
      <AddProduct />
      <ProductList />
    </>
  );
}

export default App;
