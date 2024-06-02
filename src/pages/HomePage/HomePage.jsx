import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import "./HomePage.css";
import imgdecor from "../../assets/img/img_decor.png";
import imgbanner from "../../assets/img/banner.webp";
import imgnewletter1 from "../../assets/img/newletter1.webp";
import imgnewletter2 from "../../assets/img/newletter2.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Image, InputNumber, Modal, Rate } from "antd";
import {
  clearProductState,
  getProduct,
  getProductsByCate,
  getProductsByName,
} from "../../redux/actions/productAction";
import ProductService from "../../services/productService";
import { LikeOutlined, UpOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearchPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { addToCart, getItemsCart } from "../../redux/actions/cartAction";
function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const product = useSelector((state) => state.productReducer.product);
  const email = useSelector((state) => state.auth.email);
  const [open, setOpen] = useState(false);
  const [keyboard, setKeyboard] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.commonReducer.error);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    dispatch(getProductsByName());
    return () => {
      dispatch(clearProductState());
    };
  }, []);
  const handleCategoryClick = (categoryId) => {
    dispatch(getProductsByCate(categoryId));
  };

  const showModal = (productId) => {
    setOpen(true);
    dispatch(getProduct(productId));
    console.log(">>>check products:", products);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");

    if (loginSuccess === "true") {
      localStorage.removeItem("loginSuccess");
      toast.success("Đăng nhập thành công!");
    }
  }, []);
  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleAddToCartMore = async (productId, quantity) => {
    if (isAuthenticated) {
        const cart = {
          user: {
            id: auth.user.id,
          },
          product: {
            id: productId,
          },
          quantity: quantity,
        };
        console.log(">>>cart", cart);
        await dispatch(addToCart(cart));
        dispatch(getItemsCart(auth.user.id));
        toast.success("Thêm vào giỏ hàng thành công!");
        setOpen(false);
      }else {
      navigate("/login");
    }
    // if (error.equals("")) {
    //   toast.success("Thêm vào giỏ hàng thành công");
    // } else {
    //   toast.error(error);
    // }
  };
  const handleAddToCart= async (productId) => {
    if (isAuthenticated) {
      const cart = {
        user: {
          id: auth.user.id,
        },
        product: {
          id: productId,
        },
        quantity: 1,
      };
      console.log(">>>cart", cart);
      await dispatch(addToCart(cart));
      dispatch(getItemsCart(auth.user.id));
      setOpen(false);
      toast.success("Thêm vào giỏ hàng thành công!");
    } else {
      navigate("/login");
    }
    // if (error.equals("")) {
    //   toast.success("Thêm vào giỏ hàng thành công");
    // } else {
    //   toast.error(error);
    // }
  };
  const handleChangeQuantity = (value)=>{
    setQuantity(value);
  }

  return (
    <div id="home-container" style={{ position: "relative" }}>
      <button className="scroll-up" onClick={handleScrollUp}>
        <UpOutlined />
      </button>
      <Header email={email}></Header>
      <div className="decor">
        <h1>Danh Mục</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container">
        <div className="category">
          <Link to="/product/category">
            <div
              className="category-card dog"
              onClick={() => handleCategoryClick(2)}
            >
              <h2>Chó</h2>
            </div>
          </Link>
          <Link to="/product/category">
            <div
              className="category-card cat"
              onClick={() => handleCategoryClick(1)}
            >
              <h2>Mèo</h2>
            </div>
          </Link>
          <Link to="/product/category">
            <div
              className="category-card access"
              onClick={() => handleCategoryClick(3)}
            >
              <h2>Phụ kiện</h2>
            </div>
          </Link>
        </div>
      </div>
      <div className="banner">
        <Link to="/product">
          <img src={imgbanner} alt="imgbanner" />
        </Link>
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
                  {product.promotion?.id && (
                  <div
                    className="product-card-promotion"
                    style={{
                      width: "80px",
                      height: "40px",
                      backgroundColor: "#ffe97a",
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <h4 style={{ color: "red", textAlign: "center", lineHeight: "40px" }}>
                      - {product.promotion.discount * 100} %
                    </h4>
                  </div>
                  )}
                </div>
                <div className="product-card-act">
                  <div className="product-card-act-up">
                    <Rate defaultValue={4.5} style={{fontSize:"18px"}}/>
                    {product.promotion?.id ?
                    <div className="price-product">
                        <p style={{textDecoration: "line-through", fontSize:"14px", color:"black", marginRight:"5px"}}>
                          <span>₫</span>
                          {product.price.toLocaleString("vi-VN")}
                        </p>
                        <p style={{fontSize: "17px"}}>
                          <span>₫</span>
                          {(product.price - product.price * product.promotion.discount).toLocaleString("vi-VN")}
                        </p>
                      </div>
                      :
                      <div className="price-product">
                        <p style={{fontSize: "17px"}}>
                          <span>₫</span>
                          {product.price.toLocaleString("vi-VN")}
                        </p>
                      </div>
                    }
                  </div>
                  <div className="product-card-act-down">
                    <p>{product.name}</p>
                    <LikeOutlined />
                  </div>
                </div>
                <div className="product-card-action">
                  <div className="product-card-search">
                    <div className="product-card-search-bor">
                      <Link onClick={() => showModal(product.id)}>
                        <FaSearchPlus />| Xem ngay
                      </Link>
                    </div>
                  </div>
                  <div className="product-card-search">
                    <div className="product-card-search-bor">
                      {isAuthenticated ? (
                        <Link onClick={() => handleAddToCart(product.id)}>
                          <IoCartOutline />| Mua ngay
                        </Link>
                      ) : (
                        <Link to="/login">
                          <IoCartOutline />| Mua ngay
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal open={open} onCancel={handleCancel} className="modal-home">
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
                style={{ objectFit: "cover", height: "460px" }}
              ></Image>
            </div>
            <div
              className="product-detail-infor"
              style={{ width: "450px", height: "460px" }}
            >
              <h1>{product.name}</h1>
              {product.promotion?.id ?
              <p style={{ fontSize: "18px" }}>
              <span
                style={{
                  fontSize: "14px",
                  verticalAlign: "top",
                  marginRight: "2px",
                }}
              >
                ₫
              </span>
              {(product.price - product.price * product.promotion.discount).toLocaleString("vi-VN")}
            </p>
            :
              <p style={{ fontSize: "18px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    verticalAlign: "top",
                    marginRight: "2px",
                  }}
                >
                  ₫
                </span>
                {product.price && product.price.toLocaleString("vi-VN")}{" "}
              </p>
              }
              <p style={{ marginRight: "5px", fontSize:"16px" }}>Số lượng:{" "}<input type="number" value={quantity} min="1" style={{ width: "45px",height:"35px",paddingLeft: "12px", border: "1px solid #eeddba", borderRadius: "2px",
                  fontSize:"16px", outline: "none", transition:" border-color 0.3s ease" }} onChange={(e) => handleChangeQuantity(e.target.value)}/></p>
              <h3 style={{ marginRight: "5px", fontWeight:"400" }}>Số lượng kho hàng: {product.quantity_in_stock}</h3>
              <h3 style={{ marginRight: "5px", fontWeight:"400" }}>Danh mục: {product.category?.name}</h3>
              <div className="product-detail-cart">
                <div className="product-detail-cart-bor">
                  {isAuthenticated ? (
                    <Link onClick={() => handleAddToCartMore(product.id, quantity)}>
                      THÊM VÀO GIỎ HÀNG
                    </Link>
                  ) : (
                    <Link to="/login">THÊM VÀO GIỎ HÀNG</Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
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
                <NavLink to="/newletter">
                  Cách ít người biết để dạy mèo đi vệ sinh đúng chỗ
                </NavLink>
              </h3>
              <p>
                Với không ít người nuôi mèo, việc dạy cho mèo cách đi vệ sinh
                đúng chỗ là một chuyện không hề dễ, và nếu không chú ý tới vấn
                đề này ngay từ khi mèo còn nhỏ chúng ta s...
              </p>
              <div className="show_more">
                <NavLink to="/newletter" class="showMoreLink">
                  Xem tiếp
                </NavLink>
              </div>
            </div>
          </div>
          <div className="newletter-card">
            <img src={imgnewletter2} alt="imgbanner" />
            <div className="newletter_content">
              <h3>
                <NavLink to="/newletter" class="showMoreLink">
                  Tình yêu giống như một con chó, mình đuổi thì nó chạy mình
                  chạy thì nó lại đuổi
                </NavLink>
              </h3>
              <p>
                “Tình yêu thứ mà ai cũng khao khát có được, ai cũng muốn mình là
                người hạnh phúc nhất, nhưng cuộc sống lại không...
              </p>
              <div className="show_more">
                <NavLink to="/newletter" class="showMoreLink">
                  Xem tiếp
                </NavLink>
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
