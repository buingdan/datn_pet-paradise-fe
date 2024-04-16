import "./Header.css";
import logo from "../../../assets/img/logo.png";
import bgheader from "../../../assets/img/header_img.webp";
import { Avatar, Badge, Button, Form, Input, Menu, Modal } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuthState } from "../../../redux/actions/authAction";
import menuicon from "../../../assets/img/icon-menu.webp";
import {
  getProductsByCate,
  getProductsByName,
} from "../../../redux/actions/productAction";
import { updateUser } from "../../../redux/actions/userActions";
import { getItemsCart, removeToCart, updateQuantityCart } from "../../../redux/actions/cartAction";
import ProductService from "../../../services/productService";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const { SubMenu } = Menu;
function Header({ email }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const carts = useSelector((state) => state.cart.carts);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const totalPrice = carts.reduce((acc, carts) => acc + carts.totalPrice, 0);
  const message = useSelector((state) => state.commonReducer.message);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleLogout = () => {
    dispatch(clearAuthState());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('refreshToken');
  };
  const navigate = useNavigate();
  const handleMenuItemClick = async (query) => {
    navigate("/product");
    await new Promise((resolve) => setTimeout(resolve, 0));
    dispatch(getProductsByName({ query: query }));
  };
  const handleCategoryClick = async (categoryId) => {
    navigate("/product/category");
    await new Promise((resolve) => setTimeout(resolve, 0));
    dispatch(getProductsByCate(categoryId));
  };
  const [form] = Form.useForm();

  const handleProfileInfo = () => {
    setVisible(true);
    console.log(">>>check auth", auth);
    console.log(">>>check username", auth.user.username);
    console.log(">>>check fullName", auth.user.fullName);
    console.log(">>>check email", auth.user.email);
    console.log(">>>check address", auth.user.address);
    console.log(">>>check phoneNumber", auth.user.phoneNumber);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const onFinish = (values) => {
    console.log("hehehe", auth.user.id);
    dispatch(updateUser(auth.user.id, values));
    handleCancel();
  };
  const showCartModal = () => {
    dispatch(getItemsCart(auth.user.id));
    setIsCartModalVisible(true);
  };

  const handleCartModalCancel = () => {
    setIsCartModalVisible(false);
  };
  const goToLogin = () => {
    navigate("login");
  };
  useEffect(() => {
    dispatch(getItemsCart(auth.user.id));
  }, [dispatch, auth.user.id]);

  useEffect(() => {
    const quantity = carts.reduce((acc, cart) => acc + cart.quantity, 0);
    setTotalQuantity(quantity);
  }, [carts]);
  const handleDeleteCartModal = (cartId) => {
    dispatch(removeToCart(cartId));
    toast.success(message)
  };
  const handleUpdateQuantity = async (cartId, quantity) => {
    try {
        await dispatch(updateQuantityCart(cartId, quantity));
        dispatch(getItemsCart(auth.user.id));
        toast.success("Số lượng trong giỏ hàng đã được cập nhật!");
    } catch (error) {
        console.log("Error", error);
        toast.error(error);
    }
};

  return (
    <header id="header">
      <div className="container">
        <div className="header_menu">
          <div className="menu-content">
            <div className="menu-wrapper">
              <Menu
                className="header_nav"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
              >
                <Menu.Item key="1" className="menunav">
                  <Link to="/">Trang chủ</Link>
                </Menu.Item>
                <img src={menuicon} alt="menuicon" />
                <Link to="/product">
                  <SubMenu key="2" title="Sản phẩm" className="menunav">
                    <SubMenu key="11" title="Chó" className="menusubnav">
                      <Menu.Item
                        key="111"
                        className="subnavdetail"
                        onClick={() => handleMenuItemClick("Corgi")}
                      >
                        Corgi
                      </Menu.Item>
                      <Menu.Item
                        key="112"
                        className="subnavdetail"
                        onClick={() => handleMenuItemClick("Golden Retriever")}
                      >
                        Golden Retriever
                      </Menu.Item>
                      <Menu.Item
                        key="113"
                        className="subnavdetail"
                        onClick={() => handleMenuItemClick("Husky")}
                      >
                        Husky
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu key="22" title="Mèo" className="menusubnav">
                      <Menu.Item
                        key="221"
                        className="subnavdetail"
                        onClick={() => handleMenuItemClick("Anh lông ngắn")}
                      >
                        Anh lông ngắn
                      </Menu.Item>
                      <Menu.Item
                        key="222"
                        className="subnavdetail"
                        onClick={() => handleMenuItemClick("Tai cụp")}
                      >
                        Tai cụp
                      </Menu.Item>
                      <Menu.Item
                        key="223"
                        className="subnavdetail"
                        onClick={() => handleMenuItemClick("Chân ngắn")}
                      >
                        Chân ngắn
                      </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                      key="23"
                      className="menusubnav"
                      onClick={() => handleCategoryClick(3)}
                    >
                      <Link to="/product">Phụ kiện</Link>
                    </Menu.Item>
                  </SubMenu>
                </Link>
                <img src={menuicon} alt="menuicon" />
                <Menu.Item key="3" className="menunav">
                  <Link to="/newletter">Tin thú cưng</Link>
                </Menu.Item>
              </Menu>
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="actions">
                {isAuthenticated ? (
                  <Badge count={totalQuantity} onClick={showCartModal}>
                    <Button type="text" icon={<ShoppingCartOutlined />} />
                  </Badge>
                ) : (
                  <Badge count={0} onClick={goToLogin}>
                    <Button type="text" icon={<ShoppingCartOutlined />} />
                  </Badge>
                )}
                {isAuthenticated ? (
                  <div
                    className="avatar-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Avatar size="default" icon={<UserOutlined />} />
                    <span>{email}</span>
                    {isHovered && (
                      <>
                        <Button
                          type="primary"
                          className="button-profile"
                          onClick={handleProfileInfo}
                        >
                          <a href="#">Thông tin cá nhân</a>
                        </Button>
                        <Button
                          type="primary"
                          onClick={handleLogout}
                          className="button-login"
                        >
                          <Link to="/login" className="login">
                            Đăng xuất
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <Button type="primary">
                      <Link to="/login">Đăng nhập</Link>
                    </Button>
                    <span>/</span>
                    <Button type="primary">
                      <Link to="/register">Đăng ký</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <Modal
            open={visible}
            title="Thông tin cá nhân"
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{
                username: auth.user.username,
                fullName: auth.user.fullName,
                email: auth.user.email,
                address: auth.user.address,
                phoneNumber: auth.user.phoneNumber,
              }}
            >
              <Form.Item label="Tên tài khoản" name="username">
                <Input />
              </Form.Item>
              <Form.Item label="Tên đầy đủ" name="fullName">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Địa chỉ" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: "rgb(11, 189, 204)" }}
                >
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Giỏ hàng của bạn"
            open={isCartModalVisible}
            onCancel={handleCartModalCancel}
            footer={null}
            className="modal-cart"
          >
            {carts.map((cartItem, index) => (
              <div
                key={index}
                className="cart-item"
                style={{ display: "flex", alignItems:"center", justifyContent:"space-between" }}
              >
                <div className="cart-item-image">
                  <img
                    src={
                      cartItem.product.image
                        ? ProductService?.getProductLogoUrl(
                            cartItem.product.image
                          )
                        : null
                    }
                    alt={cartItem.product.name}
                    style={{
                      width: "200px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="cart-item-details" style={{width:"200px"}}>
                  <h2>{cartItem.product.name}</h2>
                  <p>Giá: {cartItem.product.price.toLocaleString()} VNĐ</p>
                  <p>Số lượng:{" "}<input type="number" value={cartItem.quantity} min="1" style={{ width: "45px",height:"35px",paddingLeft: "12px", border: "1px solid #eeddba", borderRadius: "2px",
                  fontSize:"16px", outline: "none", transition:" border-color 0.3s ease" }} onChange={(e) => handleUpdateQuantity(cartItem.id, e.target.value)}/></p>
                </div>
                <Button
                  key={cartItem.id}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => handleDeleteCartModal(cartItem.id)}
                  style={{ background: "none", boxShadow: "none" }}
                >
                  <AiOutlineDelete style={{ color: "red" }} />
                </Button>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <h3>Thành tiền: {totalPrice.toLocaleString()}đ</h3>{" "}
              <Button type="primary" htmlType="submit" style={{backgroundColor:"#0bbdcc"}}>Đặt hàng</Button>
            </div>
          </Modal>
        </div>
      </div>
    </header>
  );
}

export default Header;
