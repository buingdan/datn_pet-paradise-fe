import React from "react";
import { Button, Image, Modal, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ManufacturerService from "../../services/productService";
import { deleteProduct, getProducts } from "../../redux/actions/productAction";
import { useDispatch } from "react-redux";
import ProductService from "../../services/productService";
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
      onOk: () => {
        dispatch(deleteProduct(product.id))
          .then(() => dispatch(getProducts()));
      },
      okText: "Delete",
      cancelText: "Cancel",
    })
  }

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
        <Column title="Tên sản phẩm" key="name" dataIndex="name">
        </Column>
        <Column
          title="Hình ảnh"
          key="logo"
          dataIndex="logo"
          width={90}
          align="center"
          render={(_,record) => (
            <Space size="middle">
                <Image width="100%" src={ProductService.getProductLogoUrl(record?.image)}></Image>
            </Space>
          )}
         
        ></Column>
        <Column title="Giá" key="price" dataIndex="price"></Column>
        <Column title="Số lượng" key="quantityInStock" dataIndex="quantity_in_stock"></Column>
        <Column title="Giảm giá" key="discount" dataIndex="discount"></Column>
        {/* <Column title="Đánh giá" key="voteAverage" dataIndex="voteAverage"></Column> */}

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
              >
                <EditOutlined style={{ marginRight: 8 }} />
              </Button>
              <Button
                key={record.key}
                type="primary"
                danger
                size="small"
                onClick={() => openDeleteConfirmModal(record)} 
              >
                <DeleteOutlined style={{ marginRight: 8 }} />
              </Button>
            </Space>
          )}
        ></Column>
      </Table>
    </div>
  );
}

export default ProductList;
