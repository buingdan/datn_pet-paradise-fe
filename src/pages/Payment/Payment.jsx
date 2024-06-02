import { useSelector } from "react-redux";
import Header from "../../components/common/Header/Header";
import "./Payment.css";
import React, { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Button, Form, Input } from "antd";


function Payment() {
  const email = useSelector((state) => state.auth.email);
  const [searchQuery, setSearchQuery] = useState("");
  const position = {lat: 20.43389, lng: 106.17729};  
  const handleSearch = async (value) => {
    console.log(">>> sau searchQuery", value);
  };
  return (
    <div className="payment-container" style={{ position: "relative" }}>
      <Header email={email}></Header>
      <div className="container content-payment">
        <div className="payment-infor">
          <h2>Thông tin thanh toán</h2>
          <input className="field__input" placeholder="Email"></input>
          <input className="field__input" placeholder="Họ và tên"></input>
          <input className="field__input" placeholder="Số điện thoại (Tùy chọn)"></input>
          <div style={{ height: '400px', width: '100%', marginTop:"10px" }}>
            <input
              type="text"
              placeholder="Nhập địa chỉ của bạn"
              style={{marginBottom:"10px"}}
            />
            <APIProvider apiKey='AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA'>
              <Map defaultCenter={position} defaultZoom={11}>
                <Marker position={position} />
              </Map>
            </APIProvider>
          </div>
        </div>
        <div className="order-payment">
          <h2>Đơn hàng của bạn</h2>
          <div className="cart-payment" style={{display:"flex", justifyContent:"space-between"}}>
            <div className="title">
              <h3>Sản phẩm</h3>
              <Form
                layout="inline"
                name="searchForm"
                onFinish={handleSearch}
                className="text-search-payment"
                style={{display:"flex", justifyContent:"space-between", width:"100%"}}
              >
                <Form.Item name="query">
                  <Input
                    placeholder="Nhập mã giảm giá "
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    allowClear
                    style={{borderColor: "#f4b915", height:"45px"}}
                  ></Input>
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{backgroundColor: "#d2006e",
                    borderColor: "#d2006e"}}
                >
                  Áp dụng
                </Button>
              </Form>
              <p>Lông ngắn đáng yêu</p>
              <span>x1</span>
              <h3>Tạm tính</h3>
              <h3>Phí vận chuyển</h3>
              <h3>Tổng cộng</h3>
            </div>
            <div className="infor"></div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default Payment;
