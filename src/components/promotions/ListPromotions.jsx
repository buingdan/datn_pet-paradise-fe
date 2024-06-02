import React, { useEffect, useState } from "react";
import {  Button, Col, Form, Input, Pagination, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PromotionList from "./PromotionList";
import { clearCategoryState, clearPromotion, getPromotion, getPromotionsByPromotionName } from "../../redux/actions/promotionAction";
import PromotionForm from "./PromotionForm";

function ListPromotions() {
  const dispatch = useDispatch();
  const promotions = useSelector((state) => state.promotion.promotions);
  const pagination = useSelector((state) => state.promotion.pagination);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getPromotionsByPromotionName());
    console.log(">>>check pagination", pagination);
    return () => {
      dispatch(clearCategoryState());
    };
  }, []);
  const onChange = (pageNumber, pageSize) => {
    const params = {
      currentPage: pageNumber,
      limit: pageSize,
    };
    console.log(">>>check params", params);
    dispatch(getPromotionsByPromotionName(params));
  }; 
  const handleSearch = (value) => {
    const params = {
      query: value.query || "",
    };
    console.log(">>>check params", params);
    dispatch(getPromotionsByPromotionName(params));
    setInputValue("");
  };
  const onEditClick = (promotion) => {
    console.log(">>>check promotion id ", promotion.id);
    dispatch(getPromotion(promotion.id));
    setOpen(true);
  };
  return (
    <div>
      <h1 style={{textAlign:"center", marginBottom:"30px"}}>QUẢN LÝ KHUYẾN MÃI</h1>
      <Row style={{ marginBottom: 10 }}>
        <Col md={20}>
          <Form layout="inline" name="searchForm" onFinish={handleSearch}>
            <Form.Item name="query">
              <Input placeholder="Tìm kiếm..." style={{borderColor: "#f4b915"}} value={inputValue} onChange={(e) => setInputValue(e.target.value)} allowClear ></Input>
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
      <PromotionList dataSource={promotions} onEditClick={onEditClick}/>
      <Row style={{ marginTop: 20 }}>
        <Col md={24} style={{ textAlign: "right" }}>
          <Pagination
            defaultCurrent={pagination?.currentPage}
            defaultPageSize={9}
            total={pagination?.totalRecord}
            showSizeChanger="true"
            onChange={onChange}
          ></Pagination>
        </Col>
      </Row>
      <PromotionForm
        open={open}
        onCancel={() => {
          setOpen(false);
          dispatch(clearPromotion());
        }}
      />
    </div>
  );
}

export default ListPromotions;
