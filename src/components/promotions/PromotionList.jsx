import React from "react";
import { Button, Modal, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deletePromotion, getPromotions, getPromotionsByPromotionName } from "../../redux/actions/promotionAction";
function PromotionList(props) {
  const {dataSource, onEditClick} = props
  const dispatch = useDispatch();
  console.log(">>>check dataSource", dataSource);
  const formatDate = (dateString) => {
    return moment(dateString).format("HH:mm:ss DD-MM-YYYY");
  };
  const openDeleteConfirmModal = (promotion) => {

    const message = "Bạn có muốn xóa khuyến mãi này? ";

    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined/>,
      content: message,
      okButtonProps: {
        type: 'primary',
        danger: true
      },
      onOk: () => {
        dispatch((deletePromotion(promotion.id)))
          .then(() => dispatch(getPromotionsByPromotionName()));
      },
      okText: "Xóa",
      cancelText: "Hủy",
    })
  }
  return (
    <div>
      <Table dataSource={dataSource} size="small" rowKey="id" pagination={false}>
        <Column title="Mã khuyến mại" key="name" dataIndex="name" sorter={(a, b) => a.name.localeCompare(b.name)}>
        </Column>
        <Column title="Giảm giá (%)" key="discount" dataIndex="discount" render={(discount) => (discount)*100+"%"} sorter={(a, b) => a.discount.localeCompare(b.discount)}></Column>
        <Column title="Ngày tạo" key="create_date" dataIndex="create_date" render={(create_date) => formatDate(create_date)} sorter={(a, b) => new Date(a.create_date) - new Date(b.create_date)}></Column>
        <Column title="Thời gian bắt đầu" key="startDate" dataIndex="startDate"></Column>
        <Column title="Thời gian kết thúc" key="endDate" dataIndex="endDate"></Column>
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

export default PromotionList;
