import React from "react";
import { Table } from "antd";
import Column from "antd/es/table/Column";
function UserList(props) {
  const {dataSource} = props
  console.log(">>>check dataSource", dataSource);

  return (
    <div>
      <Table dataSource={dataSource} size="small" rowKey="id" pagination={false}>
        <Column
          title="STT"
          key="id"
          dataIndex="id"
          width={40}
          align="center"
        ></Column>
        <Column title="Tên tài khoản" key="username" dataIndex="username">
        </Column>
        <Column title="Tên đầy đủ" key="fullName" dataIndex="fullName"></Column>
        <Column title="Email" key="email" dataIndex="email"></Column>
        <Column title="Ngày tạo" key="create_date" dataIndex="create_date"></Column>
        <Column title="Số điện thoại" key="phoneNumber" dataIndex="phoneNumber"></Column>
      </Table>
    </div>
  );
}

export default UserList;
