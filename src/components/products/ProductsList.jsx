import React from "react";
import { Button, Image, Modal, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteProduct, getProductsByName } from "../../redux/actions/productAction";
import { useDispatch } from "react-redux";
import ProductService from "../../services/productService";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
function ProductList(props) {
  const {dataSource, onEditClick} = props
  const dispatch = useDispatch();


  const openDeleteConfirmModal = (product) => {
    console.log(product)

    const message = "Bạn có muốn xóa sản phẩm ";

    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined/>,
      content: message,
      okButtonProps: {
        type: 'primary',
        danger: true
      },
      onOk: () => {
        dispatch(deleteProduct(product.id))
          .then(() => dispatch(getProductsByName()));
      },
      okText: "Delete",
      cancelText: "Cancel",
    })
  }

  return (
    <div>
      <Table dataSource={dataSource} size="small" rowKey="id" pagination={false} >
        <Column title="Tên sản phẩm" key="name" dataIndex="name">
        </Column>
        <Column
          title="Hình ảnh"
          key="logo"
          dataIndex="logo"
          width={180}
          align="center"
          render={(_,record) => (
            <Space size="middle">
                <Image width="100%" src={ProductService.getProductLogoUrl(record?.image)}></Image>
            </Space>
          )}
         
        ></Column>
        <Column title="Giá" key="price" dataIndex="price" 
        render={(price) => (
          <span>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(price)}
          </span>
        )}></Column>
        <Column title="Ngày tạo" key="create_date" dataIndex="create_date"></Column>
        <Column title="Số lượng" key="quantityInStock" dataIndex="quantity_in_stock"></Column>
        <Column title="Giảm giá" key="discount" dataIndex="discount"></Column>

        <Column
          title="Hành động"
          key="action"
          width={150}
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Button
                key={record.key}
                type="primary"
                size="small"
                onClick={() => onEditClick(record)}
                style={{background: "none",boxShadow: "none"}}
              >
                <CiEdit  style={{color:"green"}}/>
              </Button>
              <Button
                key={record.key}
                type="primary"
                danger
                size="small"
                onClick={() => openDeleteConfirmModal(record)} 
                style={{background: "none",boxShadow: "none"}}
              >
                <AiOutlineDelete style={{color:"red"}}/>
              </Button>
            </Space>
          )}
        ></Column>
      </Table>
    </div>
  );
}

export default ProductList;
