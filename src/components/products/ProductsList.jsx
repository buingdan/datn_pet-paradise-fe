import React from "react";
import { Button, Image, Modal, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteProduct, getProductsByName } from "../../redux/actions/productAction";
import { useDispatch } from "react-redux";
import ProductService from "../../services/productService";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
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
  const formatDate = (dateString) => {
    return moment(dateString).format("HH:mm:ss DD-MM-YYYY");
  };
  return (
    <div>
      <Table dataSource={dataSource} size="small" rowKey="id" pagination={false} >
        <Column title="Tên sản phẩm" key="name" dataIndex="name" sorter={(a, b) => a.name.localeCompare(b.name)}>
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
        )} sorter={(a, b) => a.price - b.price}></Column>
        <Column title="Ngày tạo" key="create_date" dataIndex="create_date" sorter={(a, b) => new Date(a.create_date) - new Date(b.create_date)} render={(createDate) => formatDate(createDate)}></Column>
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
