import { Divider, Form, Input, Modal, Upload } from "antd";
import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProduct,
  getProduct,
  getProducts,
  insertProduct,
  updateProduct,
} from "../../redux/actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ProductService from "../../services/productService";

function ProductForm(props) {
  const { open, onCancel } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const product = useSelector((state) => state.productReducer.product);
  const products = useSelector((state) => state.productReducer.products);
  const { id } = useParams();
  const form = createRef();
  // const onCreate = (values) => {
  //   console.log(">>>check check", values);
  //   console.log(">>>check product.id", product.id);
  //   console.log(">>>check product", product);
  //   if (!product.id) {
  //     dispatch(insertProduct(values, navigate)).then(() => {
  //       dispatch(getProducts());
  //       onCancel();
  //     });
  //   } else {
  //     dispatch(updateProduct(product.id, values, navigate)).then(() => {
  //       dispatch(getProducts());
  //       onCancel();
  //     });
  //   }
  // };
  // console.log(">>>check image:", product.image);
  const onCreate = (values) => {
    console.log(">>>check check", values);
    console.log(">>>check product.id", product.id);
    console.log(">>>check product", product);
    if (!product.id) {
      dispatch(insertProduct(values, navigate)).then(() => {
        dispatch(getProducts());
        onCancel();
      });
    } else {
      dispatch(updateProduct(product.id, values, navigate)).then(() => {
        dispatch(getProducts());
        onCancel();
      });
    }
  };
  // console.log(">>>check1:",manufacturer.image);

  let tittle = "Tạo mới danh mục sản phẩm";
  let okText = "Thêm";
  if (product.id) {
    tittle = "Chỉnh sửa danh mục sản phẩm";
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
                      message: "Please input the title of collection!",
                    },
                  ]
            }
          >
            <Input />
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
                      message: "Please input the title of collection!",
                    },
                  ]
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantityInStock"
            label="Số lượng"
            initialValue={product.quantity_in_stock}
            rules={
              product.id
                ? []
                : [
                    {
                      required: true,
                      message: "Please input the title of collection!",
                    },
                  ]
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Giảm giá"
            initialValue={product.discount}
            rules={
              product.id
                ? []
                : [
                    {
                      required: true,
                      message: "Please input the title of collection!",
                    },
                  ]
            }
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="voteAverage"
            label="Đánh giá"
            initialValue={product.voteAverage}
            rules={
              product.id
                ? []
                : [
                    {
                      required: true,
                      min: 2,
                      message: "Please input the title of collection!",
                    },
                  ]
            }
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="imgFile"
            label="Ảnh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            // initialValue={product.id ? {fileList} : []}
            // initialValue={product.id ? `${ProductService.getProductLogoUrl(product.image)}` : ""}
          >
            <Upload
              listType="picture-card"
              accept=".jpg, .png, .gif"
              maxCount={1}
              initialValue={product.id ? {fileList} : [] }
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
