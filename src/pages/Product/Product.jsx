import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import imgdecor from "../../assets/img/img_decor.png";
import "./Product.css";
import { Button, Form, Image, InputNumber, Menu, Modal, Rate } from "antd";
import Input from "antd/es/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { clearProductByCategoryState, clearProductState, getProduct, getProducts, getProductsByCate, getProductsByName } from "../../redux/actions/productAction";
import { useEffect, useState } from "react";
import ProductService from "../../services/productService";
import { LikeOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaSearchPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
function Product() {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.productReducer.pagination);
  const products = useSelector((state) => state.productReducer.products);
  const product = useSelector((state) => state.productReducer.product);
  const productsByCategory = useSelector((state) => state.productReducer.products_by_category);
  const productsToDisplay = productsByCategory && productsByCategory.length > 0 ? productsByCategory : products;
  const email = useSelector((state) => state.auth.email);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [keyboard, setKeyboard] = useState(true);
  const handleSearch = async (value) => {
    const params = {
      query: value.query || "",
      size: pagination.size,
    };
    console.log(">>>check value", value);
    console.log(">>>check params", params);
    dispatch(clearProductByCategoryState());
    await new Promise((resolve) => setTimeout(resolve, 0));
    dispatch(getProductsByName(params));
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    navigate("/product");
  };
  const handleCategoryClick = async (categoryId) => {
    dispatch(getProductsByCate(categoryId));
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    navigate("/product/category");
  };
  const showModal = (productId) => {
    setOpen(true);
    dispatch(getProduct(productId));
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clearProductState());
    };
  }, []);
  return (
    <div className="product-container">
      {console.log(">>>check productsToDisplay: ",productsToDisplay)}
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
              <Input placeholder="Tìm kiếm... " ></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit" style={{backgroundColor:"#0bbdcc"}}>
                <SearchOutlined />
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
                    onClick: () => handleSearch({ query: 'Corgi' },navigate("/product"))
                  },
                  {
                    key: "12",
                    label: "Golden Retriever",
                    onClick: () => handleSearch({ query: 'Golden Retriever' }, navigate("/product"))
                  },
                  {
                    key: "13",
                    label: "Husky",
                    onClick: () => handleSearch({ query: 'Husky' }, navigate("/product"))
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
                    onClick: () => handleSearch({ query: 'Anh lông ngắn' }, navigate("/product"))
                  },
                  {
                    key: "22",
                    label: "Tai cụp",
                    onClick: () => handleSearch({ query: 'Tai cụp' }, navigate("/product"))
                  },
                  {
                    key: "23",
                    label: "Chân ngắn",
                    onClick: () => handleSearch({ query: 'Chân ngắn' }, navigate("/product"))
                  },
                ],
              },
              {
                key: "3",
                label: "Phụ kiện",
                onClick : () => handleCategoryClick(3),
                // onClick: () => handleSearch({ query: 'Chân ngắn' }, navigate("/product"))
              },
            ]}
          />
        </div>
        <div className="container right-content">
          <div className="product">
          {productsToDisplay &&
            productsToDisplay.map((product) => (
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
                <div className="product-card-action">
                  <div className="product-card-search">
                    <div className="product-card-search-bor">
                      <Link onClick={() => showModal(product.id)}><FaSearchPlus />| Xem ngay</Link>
                    </div>
                  </div>
                  <div className="product-card-search">
                    <div className="product-card-search-bor">
                    <Link><IoCartOutline />| Mua ngay</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal
        // title="Thông tin sản phẩm"
        open={open}
        onCancel={handleCancel}
        footer={null}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {product && (
          <>
            <div
              className="product-detail-img"
              style={{
                width: "380px",
                height: "460px",
                marginRight: "30px",
              }}
            >
              <Image
                src={ProductService.getProductLogoUrl(product.image)}
                style={{objectFit:"cover", height:"460px"}}
              ></Image>
            </div>
            <div
              className="product-detail-infor"
              style={{ width: "450px", height: "460px" }}
            >
              <h1>{product.name}</h1>
              <p style={{fontSize: "18px"}}>
                <span style={{fontSize: "14px", verticalAlign: "top",marginRight: "2px"}}>₫</span>
                {product.price && product.price.toLocaleString("vi-VN")}{" "}
              </p>
              <span style={{ marginRight: "5px" }}>Số lượng:</span>
              <InputNumber
                min={1}
                max={10}
                keyboard={keyboard}
                defaultValue={3}
                style={{ width: "45px" }}
              />
              <div className="product-detail-cart">
                <div className="product-detail-cart-bor">
                  <Link>THÊM VÀO GIỎ HÀNG</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Product;
