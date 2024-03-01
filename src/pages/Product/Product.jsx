import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import imgdecor from "../../assets/img/img_decor.png";
import "./Product.css";
import { Button, Form, Menu, Rate } from "antd";
import Input from "antd/es/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { clearProductState, getProducts, getProductsByName } from "../../redux/actions/productAction";
import { useEffect } from "react";
import ProductService from "../../services/productService";
import { LikeOutlined } from "@ant-design/icons";
function Product() {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.productReducer.pagination);
  const products = useSelector((state) => state.productReducer.products);
  const email = useSelector((state) => state.auth.email);
  const handleSearch = (value) => {
    const params = {
      query: value.query || "",
      size: pagination.size,
    };
    console.log(">>>check value", value);
    console.log(">>>check params", params);
    dispatch(getProductsByName(params));
  };
  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clearProductState());
    };
  }, []);
  return (
    <div className="product-container">
      <Header email={email}></Header>
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
              <Input placeholder="Tìm kiếm... "></Input>
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
                children: [
                  {
                    key: "11",
                    label: "Corgi",
                    onClick: () => handleSearch({ query: 'Corgi' })
                  },
                  {
                    key: "12",
                    label: "Golden Retriever",
                    onClick: () => handleSearch({ query: 'Golden Retriever' })
                  },
                  {
                    key: "13",
                    label: "Husky",
                    onClick: () => handleSearch({ query: 'Husky' })
                  },
                ],
              },
              {
                key: "2",
                label: "Mèo",
                children: [
                  {
                    key: "21",
                    label: "Anh lông ngắn",
                    onClick: () => handleSearch({ query: 'Anh lông ngắn' })
                  },
                  {
                    key: "22",
                    label: "Tai cụp",
                    onClick: () => handleSearch({ query: 'Tai cụp' })
                  },
                  {
                    key: "23",
                    label: "Chân ngắn",
                    onClick: () => handleSearch({ query: 'Chân ngắn' })
                  },
                ],
              },
              {
                key: "3",
                label: "Phụ kiện",
                // onClick: () => handleSearch({ query: 'Chân ngắn' })
              },
            ]}
          />
        </div>
        <div className="container right-content">
          <div className="product">
          {products &&
            products.map((product) => (
              <div className="product-card">
                <div className="product-card-img">
                  <img
                    src={ProductService.getProductLogoUrl(product.image)}
                    alt={product.name}
                  />
                </div>
                <div className="product-card-act">
                  <div className="product-card-act-up">
                    <Rate defaultValue={4.5} />
                    <p><span>₫</span>{product.price.toLocaleString('vi-VN')}</p>
                  </div>
                  <div className="product-card-act-down">
                    <p>{product.name}</p>
                    <LikeOutlined />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Product;
