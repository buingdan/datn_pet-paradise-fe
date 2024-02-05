import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
} from "antd";
import React, { useEffect, useRef } from "react";
// import ButtonContentDB from "../common/ButtonContentDB";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCategory,
  getCategory,
  insertCategory,
  updateCategory,
} from "../../redux/actions/categoryAction";

function AddOrEditCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const category = useSelector((state) => state.categoryReducer.category);
  const { id } = useParams();
  const formRef = useRef(null);

  const confirmUpdate = () => {
    formRef.current.submit();
  };

  const onSubmitForm = (values) => {
    console.log(values);
    if (!id) {
      dispatch(insertCategory(values, navigate));
    } else {
      dispatch(updateCategory(id, values, navigate));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getCategory(id));
    }
    return () => {
      dispatch(clearCategory());
    };
  }, [id]);

  return (
    <div>
      {/* <ButtonContentDB /> */}

      <Form
        layout="vertical"
        className="form"
        onFinish={onSubmitForm}
        key={category.id}
        ref={formRef}
        disabled={isLoading}
      >
        <Row>
          <Col md={12}>
            <Form.Item
              label="STT"
              name="categoryId"
              initialValue={category.id}
              hidden={category.id ? false : true}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="Tên loại sản phẩm"
              name="name"
              initialValue={category.name}
              rules={[{ required: true, min: 2 }]}
            >
              <Input />
            </Form.Item>

            <Divider />

            {!category.id && (
              <Button
                htmlType="submit"
                type="primary"
                style={{ float: "right" }}
                loading={isLoading}
              >
                Save
              </Button>
            )}
            {category.id && (
              <Form.Item>
                <Popconfirm
                  title="Bạn có chắc cập nhật sản phẩm này?"
                  onConfirm={confirmUpdate}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    htmlType="button"
                    type="primary"
                    style={{ float: "right" }}
                    loading={isLoading}
                  >
                    Update
                  </Button>
                </Popconfirm>
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddOrEditCategory;
