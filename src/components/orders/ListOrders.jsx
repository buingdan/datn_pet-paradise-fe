import React, { useEffect, useState } from "react";
import {  Button, Col, Form, Input, Pagination, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "./OrderList";
import { clearOrderState, getOrdersByUserName } from "../../redux/actions/orderActions";

function ListOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const pagination = useSelector((state) => state.order.pagination);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(getOrdersByUserName());
    console.log(">>>check pagination", pagination);
    return () => {
      dispatch(clearOrderState());
    };
  }, []);
  const onChange = (pageNumber, pageSize) => {
    const params = {
      currentPage: pageNumber,
      limit: pageSize,
    };
    console.log(">>>check params", params);
    dispatch(getOrdersByUserName(params));
  }; 
  const handleSearch = (value) => {
    const params = {
      query: value.query || "",
    };
    console.log(">>>check params", params);
    dispatch(getOrdersByUserName(params));
    setInputValue("");
  };
  return (
    <div>
      <h1 style={{textAlign:"center", marginBottom:"30px"}}>QUẢN LÝ ĐẶT HÀNG</h1>
      <Row style={{ marginBottom: 10 }}>
        <Col md={20}>
          <Form layout="inline" name="searchForm" onFinish={handleSearch}>
            <Form.Item name="query">
              <Input placeholder="Tìm kiếm..." style={{borderColor: "#f4b915"}} value={inputValue} onChange={(e) => setInputValue(e.target.value)} allowClear></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{backgroundColor:"#0bbdcc"}}>Tìm kiếm</Button>
          </Form>
        </Col>
      </Row>
      <OrderList dataSource={orders} />
      <Row style={{ marginTop: 20 }}>
        <Col md={24} style={{ textAlign: "right" }}>
          <Pagination
            defaultCurrent={pagination?.currentPage}
            defaultPageSize={9}
            total={pagination?.totalRecord}
            showSizeChanger="true"
            onChange={onChange}
          ></Pagination>
        </Col>
      </Row>
    </div>
  );
}

export default ListOrders;
