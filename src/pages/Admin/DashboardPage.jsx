import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Row, Col, Avatar, message } from "antd";
import { IoIosHome, IoMdAddCircleOutline } from "react-icons/io";
import {
  MdOutlineCategory,
  MdFormatListBulleted,
  MdInventory2,
  MdShoppingBag,
  MdInsertChartOutlined,
  MdManageAccounts,
  MdOutlineSupervisorAccount,
  MdLogout,
  MdCategory,
} from "react-icons/md";
import logo from "../../assets/img/logo.png"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setMessage } from "../../redux/actions/commonAction";
import { clearAuthState, login } from "../../redux/actions/authAction";
const { Header, Sider, Content } = Layout;

function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [marginLeft, setmarginLeft] = useState(200);

  const navigate = useNavigate();

  const siteLayoutStyle = { marginLeft: marginLeft };

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.commonReducer.message);
  const err = useSelector((state) => state.commonReducer.error);

  // useEffect(() => {
  //   dispatch(login("admin@gmail.com", "12345"));
  //   return () => {
  //     dispatch(clearAuthState());
  //   };
  // }, []);
  useEffect(() => {
    if (msg) {
      dispatch(setMessage(""));
      message.success(msg);
    }

    if (err) {
      dispatch(setError(""));
      message.error(err);
    }
  }, [msg, err]);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <h2>{collapsed ? "LG" : <Link to="/"><img src={logo} alt="logo"></img></Link>}</h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            // {
            //   key: "1",
            //   icon: <IoIosHome />,
            //   label: "Trang chủ",
            //   // onClick: () => navigate("/"),
            {
              key: "1",
              icon: <MdInventory2 />,
              label: "QL Sản phẩm",
              onClick: () => navigate("/admin/products/list"),
            },
            // },
            {
              key: "2",
              icon: <MdOutlineCategory />,
              label: "QL Danh mục SP",
              children: [
                {
                  key: "21",
                  icon: <IoMdAddCircleOutline />,
                  label: "Thêm danh mục",
                  onClick: () => navigate("/admin/categories/add"),
                },
                {
                  key: "22",
                  icon: <MdFormatListBulleted />,
                  label: "Danh mục SP",
                  onClick: () => navigate("/admin/categories/list"),
                },
              ],
            },
            {
              key: "4",
              icon: <MdShoppingBag />,
              label: "Đặt hàng",
            },
            {
              key: "5",
              icon: <MdInventory2 />,
              label: "Hóa đơn",
            },
            {
              key: "6",
              icon: <MdInsertChartOutlined />,
              label: "Thống kê",
            },
            {
              key: "7",
              icon: <MdManageAccounts />,
              label: "Hồ sơ",
            },
            {
              key: "8",
              icon: <MdOutlineSupervisorAccount />,
              label: "Tài khoản",
            },
            {
              key: "9",
              icon: <MdLogout />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout style={siteLayoutStyle}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            right: 16,
            left: marginLeft + 16,
            to: 0,
            position: "fixed",
            height: 70,
          }}
        >
          <Row>
            <Col md={20}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                  const sts = !collapsed;
                  setCollapsed(sts);
                  setmarginLeft(sts ? 80 : 200);
                }}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col md={4}>
              <Avatar size="default" icon={<UserOutlined />}></Avatar>Bui Nguyen
              Dan
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "80px 24px 16px 25px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="content-panel">
            <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardPage;
