import React, { useEffect, useState } from "react";
import {  Button, Col, Form, Input, Pagination, Row } from "antd";
import { clearUserState, getUsers, getUsersByUserName } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./UserList";

function ListUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const pagination = useSelector((state) => state.user.pagination);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(getUsersByUserName());
    console.log(">>>check pagination", pagination);
    return () => {
      dispatch(clearUserState());
    };
  }, []);
  const onChange = (pageNumber, pageSize) => {
    const params = {
      currentPage: pageNumber,
      limit: pageSize,
    };
    console.log(">>>check params", params);
    dispatch(getUsersByUserName(params));
  }; 
  const handleSearch = (value) => {
    const params = {
      query: value.query || "",
    };
    console.log(">>>check params", params);
    dispatch(getUsersByUserName(params));
    setInputValue("");
  };
  return (
    <div>
      <h1 style={{textAlign:"center", marginBottom:"30px"}}>QUẢN LÝ TÀI KHOẢN</h1>
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
      <UserList dataSource={users} />
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

export default ListUsers;
