import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import store from "./redux/store";
import { Provider } from "react-redux";
import DashboardPage from "./pages/Admin/DashboardPage";
import HomePage from "./pages/HomePage/HomePage";
import Product from "./pages/Product/Product";
import Newletter from "./pages/Newletter/Newletter";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddOrEditCategory from "./components/categories/AddOrEditCategory";
import ListCategory from "./components/categories/ListCategory";
import ListProducts from "./components/products/ListProducts";
function App() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<DashboardPage />}>
            <Route path="/admin/categories/add" element={<AddOrEditCategory key="a" />} />
            <Route path="/admin/categories/update/:id" element={<AddOrEditCategory key="u" />} />
            <Route path="/admin/categories/list" element={<ListCategory />} />
            <Route path="/admin/products/list" element={<ListProducts />} />
          </Route>
          <Route path="/product" element={<Product />} />
          <Route path="/newletter" element={<Newletter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
