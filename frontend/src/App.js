import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import ProductInfo from "./components/Product/ProductDetails/ProductInfo";
import AllProducts from "./components/Product/Products/AllProducts";
import Search from "./components/Product/Search/Search";
import Login from "./components/User/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductInfo />} />
        <Route exact path="/products" element={<AllProducts />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/products/:keyword" element={<AllProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
