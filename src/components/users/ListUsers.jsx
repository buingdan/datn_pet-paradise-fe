import React, { useEffect } from "react";
import {  Col, Pagination, Row } from "antd";
import { clearUserState, getUsers } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./UserList";

function ListUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getUsers());

    return () => {
      dispatch(clearUserState());
    };
  }, []);

  //   const handleSearch = (value) => {
  //     const params = {
  //       query: value.query || "",
  //       size: pagination.size,
  //     };
  //     console.log(">>>check params", params);
  //     dispatch(getProductsByName(params));
  //   };

  //   const onChange = (pageNumber, pageSize) => {
  //     const params = {
  //       query: pagination.query,
  //       page: pageNumber - 1,
  //       size: pageSize,
  //     };
  //     console.log(">>>check params", params);
  //     dispatch(getProductsByName(params));
  //   };
  return (
    <div>
      {/* <Row style={{ marginBottom: 10 }}>
        <Col md={20}>
          <Form layout="inline" name="searchForm" onFinish={handleSearch}>
            <Form.Item name="query" initialValue={pagination && pagination.query ? pagination.query : undefined}>
              <Input placeholder="Tìm kiếm..."></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit">Tìm kiếm</Button>
          </Form>
        </Col>
        <Col md={3} style={{display: "flex", justifyContent:"flex-end"}}>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
            style={{backgroundColor:"#16ff8a"}}
          >
            + Thêm mới
          </Button>
        </Col>
      </Row> */}

      <UserList dataSource={users} />
      {/* <Row style={{ marginTop: 20 }}>
        <Col md={24} style={{ textAlign: "right" }}>
          <Pagination
            defaultCurrent={pagination.page}
            defaultPageSize={pagination.size}
            total={pagination.totalElements}
            showSizeChanger="true"
            onChange={onChange}
          ></Pagination>
        </Col>
      </Row> */}
    </div>
  );
}

export default ListUsers;
