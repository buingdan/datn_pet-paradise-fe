import React, { useEffect, useState } from "react";
// import ButtonContentDB from "../common/ButtonContentDB";
import ProductList from "./ProductsList";
import ProductForm from "./ProductForm";
import { Button, Col, Form, Input, Pagination, Row } from "antd";
import {
  clearProduct,
  clearProductState,
  getProduct,
  getProducts,
  getProductsByName,
} from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

function ListProducts() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.productReducer.products);
  const pagination = useSelector((state) => state.productReducer.pagination);

  useEffect(() => {
    dispatch(getProducts())

    return () => {
      dispatch(clearProductState());
    };
  }, []);


  const onEditClick = (product) => {
    console.log(">>>check product id ", product.id);
    dispatch(getProduct(product.id));
    setOpen(true);
  };


  const handleSearch = (value) => {
    const params = {
      query: value.query || "",
      size: pagination.size,
    };
    console.log(">>>check params", params);
    dispatch(getProductsByName(params));
  };

  const onChange = (pageNumber, pageSize) => {
    const params = {
      query: pagination.query,
      page: pageNumber - 1,
      size: pageSize,
    };
    console.log(">>>check params", params);
    dispatch(getProductsByName(params));
  };
  return (
    <div>
      {/* <ButtonContentDB /> */}
      <Row style={{ marginBottom: 10 }}>
        <Col md={20}>
          <Form layout="inline" name="searchForm" onFinish={handleSearch}>
            <Form.Item name="query" initialValue={pagination && pagination.query ? pagination.query : undefined}>
              <Input></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit">Tìm kiếm</Button>
          </Form>
        </Col>
        <Col md={3}>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>

      <ProductList dataSource={products} onEditClick={onEditClick} />
      <Row style={{ marginTop: 20 }}>
        <Col md={24} style={{ textAlign: "right" }}>
          <Pagination
            defaultCurrent={pagination.page}
            defaultPageSize={pagination.size}
            total={pagination.totalElements}
            showSizeChanger="true"
            onChange={onChange}
          ></Pagination>
        </Col>
      </Row>

      <ProductForm
        open={open}
        onCancel={() => {
          setOpen(false);
          dispatch(clearProduct());
        }}
      />
    </div>
  );
}

export default ListProducts;
