import { DatePicker, Divider, Form, Input, Modal, Select, Upload } from "antd";
import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import PromotionService from "../../services/promotionService";
import { toast } from "react-toastify";
import { Option } from "antd/es/mentions";
import dayjs from 'dayjs';
import {
  clearPromotion,
  getPromotion,
  getPromotionsByPromotionName,
  insertPromotion,
  updatePromotion,
} from "../../redux/actions/promotionAction";
import moment from "moment";
const formatter = (value) => `${value}`;
const dateFormat = "YYYY/MM/DD";
function PromotionForm(props) {
  const { open, onCancel } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const promotion = useSelector((state) => state.promotion.promotion);
  const { id } = useParams();
  const form = createRef();
  const onCreate = (values) => {
    console.log(">>>check values", promotion);
    const formattedValues = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };
    if (!promotion.id) {
      dispatch(insertPromotion(formattedValues, navigate)).then(() => {
        dispatch(getPromotionsByPromotionName());
        onCancel();
      });
    } else {
      dispatch(updatePromotion(promotion.id, formattedValues, navigate)).then(
        () => {
          dispatch(getPromotionsByPromotionName());
          onCancel();
        }
      );
    }
  };

  let tittle = "Tạo mới khuyến mãi";
  let okText = "Thêm";
  if (promotion.id) {
    tittle = "Chỉnh sửa khuyến mãi";
    okText = "Sửa";
  }

  useEffect(() => {
    if (id) {
      dispatch(getPromotion(id));
    }
    return () => {
      dispatch(clearPromotion());
    };
  }, [id]);

  return (
    <div>
      <Modal
        open={open}
        title={tittle}
        okText={okText}
        cancelText="Hủy"
        onCancel={onCancel}
        onOk={() => {
          form.current
            .validateFields()
            .then((values) => {
              form.current.resetFields();
              console.log("Values", values);
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        key={promotion.id}
      >
        <Form
          ref={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
          disabled={isLoading}
        >
          <Form.Item
            name="id"
            label="STT"
            initialValue={promotion.id}
            hidden={promotion.id ? false : true}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="name"
            label="Mã khuyến mại"
            initialValue={promotion.name}
            rules={
              promotion.id
                ? []
                : [
                    {
                      required: true,
                      min: 2,
                      message: "Vui lòng nhập mã khuyến mại!",
                    },
                  ]
            }
          >
            <Input
              style={{ width: "450px", border: "1px solid rgb(238, 221, 186)" }}
            />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Khuyến mại (nhập từ 0.1 -> 1 tương ứng với 10% -> 100% )"
            initialValue={promotion.discount}
            rules={
              promotion.id
                ? []
                : [
                    {
                      required: true,
                      min: 1,
                      message: "Vui lòng nhập số khuyến mại!",
                    },
                  ]
            }
          >
            <Input
              style={{ width: "450px", border: "1px solid rgb(238, 221, 186)" }}
            />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Ngày bắt đầu"
            initialValue={
              promotion.startDate ? moment(promotion.startDate) : null
            }
            rules={
              promotion.id
                ? []
                : [
                    {
                      required: true,
                      message: "Vui lòng nhập ngày bắt đầu!",
                    },
                  ]
            }
          >
            <DatePicker
              defaultValue={dayjs("2023/12/31", dateFormat)}
              format={dateFormat}
              style={{ width: "450px", border: "1px solid rgb(238, 221, 186)" }}
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="Ngày kết thúc"
            initialValue={promotion.endDate ? moment(promotion.endDate) : null}
            rules={
              promotion.id
                ? []
                : [
                    {
                      required: true,
                      message: "Vui lòng nhập ngày kết thúc!",
                    },
                  ]
            }
          >
            <DatePicker
              defaultValue={dayjs("2023/12/31", dateFormat)}
              format={dateFormat}
              style={{ width: "450px", border: "1px solid rgb(238, 221, 186)" }}
            />
          </Form.Item>
          <Divider></Divider>
        </Form>
      </Modal>
    </div>
  );
}

export default PromotionForm;
