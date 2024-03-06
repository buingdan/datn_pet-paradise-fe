import "./Header.css";
import logo from "../../../assets/img/logo.png";
import bgheader from "../../../assets/img/header_img.webp";
import { Avatar, Badge, Button, Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearAuthState } from "../../../redux/actions/authAction";
import menuicon from "../../../assets/img/icon-menu.webp"
import { getProductsByCate, getProductsByName } from "../../../redux/actions/productAction";

const { SubMenu } = Menu;
function Header({email}) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleLogout = () => {
    dispatch(clearAuthState());
  };
  const navigate = useNavigate();
  const handleMenuItemClick = async (query) => {
    navigate("/product");
    await new Promise((resolve) => setTimeout(resolve, 0));
    dispatch(getProductsByName({ query: query }));
  };
  const handleCategoryClick = async(categoryId) => {
    navigate("/product/category");
    await new Promise((resolve) => setTimeout(resolve, 0));
    dispatch(getProductsByCate(categoryId));
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
                    <Menu.Item key="111" className="subnavdetail" onClick={() => handleMenuItemClick('Corgi')}>Corgi</Menu.Item>
                    <Menu.Item key="112"className="subnavdetail" onClick={() => handleMenuItemClick('Golden Retriever')}>Golden Retriever</Menu.Item>
                    <Menu.Item key="113" className="subnavdetail" onClick={() => handleMenuItemClick('Husky')}>Husky</Menu.Item>
                  </SubMenu>
                  <SubMenu key="22" title="Mèo" className="menusubnav">
                    <Menu.Item key="221" className="subnavdetail" onClick={() => handleMenuItemClick('Anh lông ngắn')}>Anh lông ngắn</Menu.Item>
                    <Menu.Item key="222" className="subnavdetail" onClick={() => handleMenuItemClick('Tai cụp')}>Tai cụp</Menu.Item>
                    <Menu.Item key="223" className="subnavdetail" onClick={() => handleMenuItemClick('Chân ngắn')}>Chân ngắn</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="23" className="menusubnav" onClick={() =>handleCategoryClick(3)}>
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
                <Badge count={5}>
                  <Button type="text" icon={<ShoppingCartOutlined /> } />
                </Badge>
                {isAuthenticated ? (
                 <div className="avatar-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                 <Avatar size="default" icon={<UserOutlined />} />
                 <span>{email}</span>
                 {isHovered && (
                   <Button type="primary" onClick={handleLogout} >
                     <Link to="/login" className="login" >Đăng xuất</Link>
                   </Button>
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
        </div>
      </div>
    </header>
  );
}

export default Header;
