import React from "react";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import moment from "moment";
function OrderList(props) {
  const {dataSource} = props
  console.log(">>>check dataSource", dataSource);
  const formatDate = (dateString) => {
    return moment(dateString).format("HH:mm:ss DD-MM-YYYY");
  };
  return (
    <div>
      <Table dataSource={dataSource} size="small" rowKey="id" pagination={false}>
        <Column title="Họ và tên" key="fullName" dataIndex="fullName" sorter={(a, b) => a.fullName.localeCompare(b.fullName)}></Column>
        <Column title="Địa chỉ" key="address" dataIndex="address"></Column>
        <Column title="Email" key="email" dataIndex="email"></Column>
        <Column title="Ngày tạo" key="create_date" dataIndex="create_date" render={(create_date) => formatDate(create_date)} sorter={(a, b) => new Date(a.create_date) - new Date(b.create_date)}></Column>
        <Column title="Số điện thoại" key="phoneNumber" dataIndex="phoneNumber"></Column>
      </Table>
    </div>
  );
}

export default OrderList;

