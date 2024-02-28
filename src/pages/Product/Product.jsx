import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import imgdecor from "../../assets/img/img_decor.png";
import "./Product.css";
import { Button, Form, Menu } from "antd";
import Input from "antd/es/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByName } from "../../redux/actions/productAction";
function Product() {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.productReducer.pagination);
  const handleSearch = (value) => {
    const params = {
      query: value.query || "",
      size: pagination.size,
    };
    console.log(">>>check params", params);
    dispatch(getProductsByName(params));
  };
  return (
    <div className="product-container">
      <Header></Header>
      <div className="decor">
        <h1>Sản phẩm</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container product-content">
        <div className="left-content">
          <h3>TÌM KIẾM</h3>
          <Form
            layout="inline"
            name="searchForm"
            onFinish={handleSearch}
            className="text-search"
          >
            <Form.Item
              name="query"
              initialValue={
                pagination && pagination.query ? pagination.query : undefined
              }
            >
              <Input></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form>
          <h3>DANH MỤC SẢN PHẨM</h3>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                label: "Chó",
                // onClick: () => navigate("/categories/add"),
                children: [
                  {
                    key: "11",
                    label: "Corgi",
                    // onClick: () => navigate("/categories/add"),
                  },
                  {
                    key: "12",
                    label: "Golden Retriever",
                    // onClick: () => navigate("/categories/list"),
                  },
                  {
                    key: "13",
                    label: "Husky",
                    // onClick: () => navigate("/products/list"),
                  },
                ],
              },
              {
                key: "2",
                label: "Mèo",
                // onClick: () => navigate("/categories/list"),
                children: [
                  {
                    key: "21",
                    label: "Anh lông ngắn",
                    // onClick: () => navigate("/categories/add"),
                  },
                  {
                    key: "22",
                    label: "Tai cụp",
                    // onClick: () => navigate("/categories/list"),
                  },
                  {
                    key: "23",
                    label: "Chân ngắn",
                    // onClick: () => navigate("/products/list"),
                  },
                ],
              },
              {
                key: "3",
                label: "Phụ kiện",
                // onClick: () => navigate("/products/list"),
              },
            ]}
          />
        </div>
        <div className="container right-content">
          <div className="product">
            <div className="product-card"></div>
            <div className="product-card"></div>
            <div className="product-card"></div>
            <div className="product-card"></div>
            <div className="product-card"></div>
            <div className="product-card"></div>
            <div className="product-card"></div>
            <div className="product-card"></div>
            <div className="product-card"></div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Product;
