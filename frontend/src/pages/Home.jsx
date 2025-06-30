import ProductList from "../components/ProductList";
import NavBar from "../components/NavBar";
import AddProduct from "../components/AddProduct";
import CategoriesList from "../components/CategoriesList";
import { useState } from "react";

function Home() {
  const [categoryId, setCategoryId] = useState(null);

  return (
    <>
      <NavBar />
      <AddProduct />
      <CategoriesList
        selectedCategoryId={categoryId}
        setSelectedCategoryId={setCategoryId}
      />
      <ProductList categoryId={categoryId} setCategoryId={setCategoryId} />
    </>
  );
}

export default Home;
