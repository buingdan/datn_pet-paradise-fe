import { Divider, Form, Input, Modal, Select, Upload } from "antd";
import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProduct,
  getProduct,
  getProductsByName,
  insertProduct,
  updateProduct,
} from "../../redux/actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ProductService from "../../services/productService";
import { toast } from "react-toastify";
import { Option } from "antd/es/mentions";

function ProductForm(props) {
  const { open, onCancel } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const product = useSelector((state) => state.productReducer.product);
  const { id } = useParams();
  const form = createRef();
  const onCreate = (values) => {
    console.log(">>>check check", values);
    console.log(">>>check product.id", product.id);
    console.log(">>>check product", product);
    if (!product.id) {
      dispatch(insertProduct(values, navigate)).then(() => {
        dispatch(getProductsByName());
        onCancel();
      });
    } else {
      dispatch(updateProduct(product.id, values, navigate)).then(() => {
        dispatch(getProductsByName());
        onCancel();
      });
    }
  };

  let tittle = "Tạo mới sản phẩm";
  let okText = "Thêm";
  if (product.id) {
    tittle = "Chỉnh sửa sản phẩm";
    okText = "Sửa";
  }

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
    return () => {
      dispatch(clearProduct());
    };
  }, [id]);

  useEffect(() => {
    if (product.image && product.id) {
      setFileList([
        {
          uid: product.id,
          name: product.name,
          url: ProductService.getProductLogoUrl(product.image),
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [product.image, product.id]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
        key={product.id}
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
            initialValue={product.id}
            hidden={product.id ? false : true}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            initialValue={product.name}
            rules={
              product.id
                ? []
                : [
                    {
                      required: true,
                      min: 2,
                      message: "Vui lòng nhập tên sản phẩm!",
                    },
                  ]
            }
          >
            <Input style={{width: "450px", border: "1px solid rgb(238, 221, 186)"}}/>
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            initialValue={product.price}
            rules={
              product.id
                ? []
                : [
                    {
                      required: true,
                      min: 1,
                      message: "Vui lòng nhập giá sản phẩm!",
                    },
                  ]
            }
          >
            <Input style={{width: "450px", border: "1px solid rgb(238, 221, 186)"}}/>
          </Form.Item>
          <Form.Item
            name="quantityInStock"
            label="Số lượng"
            initialValue={product.quantityInStock}
            rules={
              product.id
                ? []
                : [
                    {
                      required: true,
                      message: "Vui lòng nhập số lượng!",
                    },
                  ]
            }
          >
            <Input style={{width: "450px", border: "1px solid rgb(238, 221, 186)"}}/>
          </Form.Item>
          <Form.Item
            name="promotion"
            label="Khuyến mãi"
            initialValue={product.id ? product.promotion.name : "Chọn khuyến mãi"}
            rules={
              product.id
                ? []
                : [
                    {
                      required: true,
                      message: "Vui lòng nhập khuyến mãi!",
                    },
                  ]
            }
          >
            <Select style={{width: "450px", border: "1px solid rgb(238, 221, 186)"}}>
              <Option value="3">KM30</Option>
              <Option value="4">KM40</Option>
              <Option value="5">KM50</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Danh mục"
            initialValue={product.id ? product.category.name : "Chọn danh mục"}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn danh mục!",
              },
            ]}
            
          >
            <Select style={{width: "450px", border: "1px solid rgb(238, 221, 186)"}}>
              <Option value="1">Mèo</Option>
              <Option value="2">Chó</Option>
              <Option value="3">Phụ kiện</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="imgFile"
            label="Ảnh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              accept=".jpg, .png, .gif"
              maxCount={1}
              initialValue={product.id ? { fileList } : []}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Divider></Divider>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductForm;
