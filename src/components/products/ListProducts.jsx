import React, { useEffect, useState } from "react";
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
  const [inputValue, setInputValue] = useState('');

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
      <h1 style={{textAlign:"center", marginBottom:"30px"}}>QUẢN LÝ SẢN PHẨM</h1>
      <Row style={{ marginBottom: 10 }}>
        <Col md={20}>
          <Form layout="inline" name="searchForm" onFinish={handleSearch}>
            <Form.Item name="query" initialValue={pagination && pagination.query ? pagination.query : undefined}>
              <Input placeholder="Tìm kiếm..." style={{borderColor: "#f4b915"}} ></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{backgroundColor:"#0bbdcc"}}>Tìm kiếm</Button>
          </Form>
        </Col>
        <Col md={3} style={{display: "flex", justifyContent:"flex-end"}}>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
            }}
            style={{backgroundColor:"#16ff8a"}}
          >
            + Thêm mới
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
