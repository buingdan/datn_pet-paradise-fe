import { Button, Modal, Skeleton, Space, Table, Tag } from "antd";
import React, { useEffect } from "react";
import Column from "antd/es/table/Column";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearCategoryState, deleteCategory, getCategories } from "../../redux/actions/categoryAction";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";
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

    const message = "Bạn có muốn xóa danh mục sản phẩm: " + category.name;

    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined/>,
      content: message,
      okButtonProps: {
        type: 'primary',
        danger: true
      },
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
  const formatDate = (dateString) => {
    return moment(dateString).format("HH:mm:ss DD-MM-YYYY");
  };
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
          title="Các danh mục sản phẩm"
          key="name"
          dataIndex="name"
        ></Column>
        <Column
          title="Ngày tạo"
          key="create_date"
          dataIndex="create_date"
          render={(createDate) => formatDate(createDate)}
        ></Column>
        <Column
          title="Hành động"
          key="action"
          width={150}
          align="center"
          render={(_, record)=>(
            <Space size='middle'>
                <Button key={record.key} type="primary" size="small" onClick={() => editCategory(record)} style={{background: "none",boxShadow: "none"}}>
                    <CiEdit  style={{color:"green"}}/>
                </Button>
                <Button key={record.key} type="primary" danger size="small" onClick={() => openDeleteConfirmModal(record)} style={{background: "none",boxShadow: "none"}}>
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
