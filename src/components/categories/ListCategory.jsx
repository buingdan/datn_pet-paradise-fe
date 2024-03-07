import { Button, Modal, Skeleton, Space, Table, Tag } from "antd";
import React, { useEffect } from "react";
// import ButtonContentDB from "../common/ButtonContentDB";
import Column from "antd/es/table/Column";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearCategoryState, deleteCategory, getCategories } from "../../redux/actions/categoryAction";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
function ListCategory() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const navigate = useNavigate();

useEffect(() => {
  dispatch(getCategories());

  return () => {
    dispatch(clearCategoryState());
  };
}, []);

  const editCategory = (category) =>{
    console.log(">>>check", category);
    navigate("/admin/categories/update/" + category.id)
  }

  const openDeleteConfirmModal = (category) => {
    console.log(category)

    const message = "Bạn có muốn xóa sản phẩm " + category.name;

    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined/>,
      content: message,
      onOk: () => {
        dispatch(deleteCategory(category.id))
          .then(() => dispatch(getCategories()));
      },
      okText: "Xóa",
      cancelText: "Hủy",
    })
  }

  if (isLoading){
    return (<Skeleton active/>)
  }
  return (
    <div>
      <h1 style={{textAlign:"center", marginBottom:"30px"}}>QUẢN LÝ DANH MỤC SẢN PHẨM</h1>
      <Table dataSource={categories} size="small" rowKey="id">
        <Column
          title="STT"
          key="id"
          dataIndex="id"
          width={40}
          align="center"
        ></Column>
        <Column
          title="Các loại sản phẩm"
          key="name"
          dataIndex="name"
        ></Column>
        <Column
          title="Ngày tạo"
          key="create_date"
          dataIndex="create_date"
        ></Column>
        <Column
          title="Hành động"
          key="action"
          width={150}
          align="center"
          render={(_, record)=>(
            <Space size='middle'>
                <Button key={record.key} type="primary" size="small" onClick={() => editCategory(record)}>
                    {/* <EditOutlined style={{marginRight:8}} /> */}
                    <CiEdit  style={{color:"green"}}/>
                </Button>
                <Button key={record.key} type="primary" danger size="small" onClick={() => openDeleteConfirmModal(record)}>
                    {/* <DeleteOutlined style={{marginRight:8}} /> */}
                    <AiOutlineDelete style={{color:"red"}}/>
                </Button>
            </Space>
          )}
        ></Column>
      </Table>
    </div>
  );
}

export default ListCategory;
