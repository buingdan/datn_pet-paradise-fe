import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/common/Header/Header";
import "./Payment.css";
import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { clearCartState } from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";

function Payment() {
  const email = useSelector((state) => state.auth.email);
  const [searchQuery, setSearchQuery] = useState("");
  const position = { lat: 20.43389, lng: 106.17729 };
  const handleSearch = async (value) => {
    console.log(">>> sau searchQuery", value);
  };

  const carts = useSelector((state) => state.cart.carts);
  const [orderInfo, setOrderInfo] = useState("");
  const [vnpayUrl, setVnpayUrl] = useState("");
  const totalPrice = carts.reduce((acc, carts) => acc + carts.totalPrice, 0);
  const [fullName, setFullName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const idUser = useSelector((state) => state.auth.user.id);
  const [orderData, setOrderData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    id: idUser
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setOrderData({
      fullName: fullName,
      email: inputEmail,
      phoneNumber: phoneNumber,
      address: address,
      id: idUser
    });
  }, [fullName, inputEmail, phoneNumber, address, idUser]);
  const submitOrder = async () => {
    console.log("totalPrice:", totalPrice);
    console.log("orderData", orderData);
    try {
      const response = await axios.post(
        "http://localhost:8090/api/v1/vnpay/submitOrder",
        null,
        {
          params: {
            amount: totalPrice + 50000,
            orderInfo: orderInfo,
          },
        }
      );
      const responseOrder = await axios.post('http://localhost:8090/api/v1/orders', orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setVnpayUrl(response.data);
      await dispatch(clearCartState());
    } catch (error) {
      console.error("There was an error submitting the order!", error);
    }
  };

  return (
    <div className="payment-container" style={{ position: "relative" }}>
      <Header email={email}></Header>
      <div className="container content-payment">
        <div className="payment-infor">
          <h2>Thông tin thanh toán</h2>
          <input
            className="field__input"
            placeholder="Email"
            value={inputEmail}
            onChange={(event) => setInputEmail(event.target.value)}
          ></input>
          <input
            className="field__input"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          ></input>
          <input
            className="field__input"
            placeholder="Số điện thoại (Tùy chọn)"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          ></input>
          <div style={{ height: "400px", width: "100%", marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Nhập địa chỉ của bạn"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              style={{ marginBottom: "10px" }}
            />
            {/* <APIProvider apiKey='AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA'>
              <Map defaultCenter={position} defaultZoom={11}>
                <Marker position={position} />
              </Map>
            </APIProvider> */}
          </div>
        </div>
        <div className="order-payment">
          <h2>Đơn hàng của bạn</h2>
          <table
            style={{
              width: "100%",
              textAlign: "left",
              lineHeight: "35px",
              marginBottom: "3px",
            }}
          >
            <tr>
              <th>Tạm tính:</th>
              <td>{totalPrice.toLocaleString()}đ</td>
            </tr>
            <tr>
              <th>Giao hàng:</th>
              <td>50,000đ</td>
            </tr>
            <tr>
              <th>Tổng:</th>
              <td>{(totalPrice + 50000).toLocaleString()}đ</td>
            </tr>
          </table>

          <input
            type="text"
            value={orderInfo}
            onChange={(e) => setOrderInfo(e.target.value)}
            placeholder="Nội dung chuyển khoản"
            style={{
              borderRadius: "4px",
              width: "100%",
              display: "block",
              boxSizing: "border-box",
              padding: ".94em .8em",
              border: "1px #d9d9d9 solid",
              height: "44px",
              backgroundCorlor: "#fff",
              color: "#333",
              marginBottom: "13px",
            }}
          />
          <button
            onClick={submitOrder}
            style={{
              backgroundColor: "#0bbdcc",
              color: "#fff",
              boxShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
              fontSize: "14px",
              height: "40px",
              padding: "4px 15px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Thanh toán
          </button>
          {vnpayUrl && window.open(vnpayUrl, "_blank", "noopener,noreferrer")}
        </div>
      </div>
    </div>
  );
}

export default Payment;
