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
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
function Header() {
  return (
    <header id="header">
      <div className="container">
        <div className="header_menu">
          <div className="menu-content">
            <div className="menu-wrapper">
              <Menu
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
              />
              {/* </div> */}
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
                  Đăng nhập / Đăng ký
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
