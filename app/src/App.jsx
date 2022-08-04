import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { ProductList } from "./components/ProductList";
import { ProductEdit } from "./components/ProductEdit";
import { Home } from "./components/Home";
import { Private } from "./components/Private";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <Private>
              <ProductList />
            </Private>
          }
        />
        <Route path="/products/:id" element={<ProductEdit />} />
      </Routes>
    </div>
  );
}

export default App;
