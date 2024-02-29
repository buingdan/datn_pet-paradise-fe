import "./Header.css";
import logo from "../../../assets/img/logo.png";
import bgheader from "../../../assets/img/header_img.webp";
import { Badge, Button, Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
function Header() {
  return (
    <header id="header">
      <div className="container">
        <div className="header_menu">
          <div className="menu-content">
            <div className="menu-wrapper">
              {/* <Menu
                className="header_nav"
                // theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                items={[
                  {
                    key: "1",
                    label: "Trang chủ",
                    // onClick: () => navigate("/"),
                  },
                  {
                    key: "2",
                    label: "Sản phẩm",
                    children: [
                      {
                        key: "21",
                        label: "Chó",
                        // onClick: () => navigate("/categories/add"),
                        children: [
                          {
                            key: "211",
                            label: "Corgi",
                            // onClick: () => navigate("/categories/add"),
                          },
                          {
                            key: "212",
                            label: "Golden Retriever",
                            // onClick: () => navigate("/categories/list"),
                          },
                          {
                            key: "213",
                            label: "Husky",
                            // onClick: () => navigate("/products/list"),
                          },
                        ],
                      },
                      {
                        key: "22",
                        label: "Mèo",
                        // onClick: () => navigate("/categories/list"),
                        children: [
                          {
                            key: "221",
                            label: "Anh lông ngắn",
                            // onClick: () => navigate("/categories/add"),
                          },
                          {
                            key: "222",
                            label: "Tai cụp",
                            // onClick: () => navigate("/categories/list"),
                          },
                          {
                            key: "223",
                            label: "Chân ngắn",
                            // onClick: () => navigate("/products/list"),
                          },
                        ],
                      },
                      {
                        key: "23",
                        label: "Phụ kiện",
                        // onClick: () => navigate("/products/list"),
                      },
                    ],
                  },
                  {
                    key: "3",
                    label: "Tin thú cưng",
                  },
                ]}
              /> */}
              <Menu
                className="header_nav"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
              >
                <Menu.Item key="1">
                  <Link to="/">Trang chủ</Link>
                </Menu.Item>
                <Link to="/product">
                  <SubMenu key="2" title="Sản phẩm">
                    {/* <Menu.Item key="21">
                      <Link to="/product">Chó</Link>
                    </Menu.Item>
                    <Menu.Item key="22">
                      <Link to="/product">Mèo</Link>
                    </Menu.Item>
                    <Menu.Item key="23">
                      <Link to="/product">Phụ kiện</Link>
                    </Menu.Item> */}
                    <Menu.Item
                      key="21"
                      // onClick={() => handleSearch({ query: "Chó" })}
                    >
                      <Link to="/product">Chó</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="22"
                      // onClick={() => handleSearch({ query: "Mèo" })}
                    >
                      <Link to="/product">Mèo</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="23"
                      // onClick={() => handleSearch({ query: "Phụ kiện" })}
                    >
                      <Link to="/product">Phụ kiện</Link>
                    </Menu.Item>
                  </SubMenu>
                </Link>
                <Menu.Item key="3">
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
                  <Button type="text" icon={<ShoppingCartOutlined />} />
                </Badge>
                <Button type="primary" icon={<UserOutlined />}>
                  <Link to="/login">Đăng nhập</Link>
                </Button>
                <span>/</span>
                <Button type="primary">
                  <Link to="/register">Đăng ký</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
