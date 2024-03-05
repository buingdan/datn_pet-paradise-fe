import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import "./HomePage.css";
import imgdecor from "../../assets/img/img_decor.png";
import imgbanner from "../../assets/img/banner.webp";
import imgnewletter1 from "../../assets/img/newletter1.webp";
import imgnewletter2 from "../../assets/img/newletter2.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Rate } from "antd";
import {
  clearProductState,
  getProducts,
  getProductsByCate,
} from "../../redux/actions/productAction";
import ProductService from "../../services/productService";
import { LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clearProductState());
    };
  }, []);
  const handleCategoryClick = (categoryId) => {
    dispatch(getProductsByCate(categoryId));
  };
  return (
    <div className="home-container">
      <Header email={email}></Header>
      <div className="decor">
        <h1>Danh Mục</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container">
        <div className="category">
          <Link to="/product/category">
            <div className="category-card dog" onClick={() => handleCategoryClick(2)}>
              <h2>Chó</h2>
            </div>
          </Link>
          <Link to="/product/category">
          <div className="category-card cat" onClick={() => handleCategoryClick(1)}>
            <h2>Mèo</h2>
          </div>
          </Link>
          <Link to="/product/category">
          <div className="category-card access" onClick={() => handleCategoryClick(3)}>
            <h2>Phụ kiện</h2>
          </div>
          </Link>
        </div>
      </div>
      <div className="banner">
        <img src={imgbanner} alt="imgbanner" />
      </div>
      <div className="decor">
        <h1>Sản Phẩm</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container">
        <div className="product">
          {products &&
            products.map((product) => (
              <div className="product-card">
                <div className="product-card-img">
                  <img
                    className="gelatine"
                    src={ProductService.getProductLogoUrl(product.image)}
                    alt={product.name}
                  />
                </div>
                <div className="product-card-act">
                  <div className="product-card-act-up">
                    <Rate defaultValue={4.5} />
                    <p>
                      <span>₫</span>
                      {product.price.toLocaleString("vi-VN")}
                    </p>
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
      <div className="decor">
        <h1>Tin Thú Cưng</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container home-newletter">
        <div className="newletter">
          <div className="newletter-card">
            <img src={imgnewletter1} alt="imgbanner" />
            <div className="newletter_content">
              <h3>
                <a href="#">
                  Cách ít người biết để dạy mèo đi vệ sinh đúng chỗ
                </a>
              </h3>
              <p>
                Với không ít người nuôi mèo, việc dạy cho mèo cách đi vệ sinh
                đúng chỗ là một chuyện không hề dễ, và nếu không chú ý tới vấn
                đề này ngay từ khi mèo còn nhỏ chúng ta s...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
          <div className="newletter-card">
            <img src={imgnewletter2} alt="imgbanner" />
            <div className="newletter_content">
              <h3>
                <a href="#">
                  Tình yêu giống như một con chó, mình đuổi thì nó chạy mình
                  chạy thì nó lại đuổi
                </a>
              </h3>
              <p>
                “Tình yêu thứ mà ai cũng khao khát có được, ai cũng muốn mình là
                người hạnh phúc nhất, nhưng cuộc sống lại không...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
