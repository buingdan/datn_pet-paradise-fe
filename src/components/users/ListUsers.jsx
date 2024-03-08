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

  return (
    <div>
      <h1 style={{textAlign:"center", marginBottom:"30px"}}>QUẢN LÝ TÀI KHOẢN</h1>
      <UserList dataSource={users} />
    </div>
  );
}

export default ListUsers;
