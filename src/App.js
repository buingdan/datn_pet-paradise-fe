import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";
import DashboardPage from "./pages/Admin/DashboardPage";
import HomePage from "./pages/HomePage/HomePage";
import Product from "./pages/Product/Product";
import Newletter from "./pages/Newletter/Newletter";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddOrEditCategory from "./components/categories/AddOrEditCategory";
import ListCategory from "./components/categories/ListCategory";
import ListProducts from "./components/products/ListProducts";
import ListUsers from "./components/users/ListUsers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from "./pages/Payment/Payment";
import ListPromotions from "./components/promotions/ListPromotions";
import ListOrders from "./components/orders/ListOrders";
import Dashboard from "./components/dashboard/Dashboard";
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
            <Route path="/admin/products/list" element={<ListProducts />} />
            <Route path="/admin/users/list" element={<ListUsers />} />
            <Route path="/admin/promotions/list" element={<ListPromotions />} />
            <Route path="/admin/orders/list" element={<ListOrders />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/product" element={<Product />} key="all"/>
          <Route path="/product/category" element={<Product />} key="category" />
          <Route path="/newletter" element={<Newletter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
