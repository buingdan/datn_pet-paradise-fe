import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Statistic } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { DatePicker, Button } from "antd";
import dayjs from "dayjs";
import "./Dashboard.css";
import Chart from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import { clearUserState, getUsers } from "../../redux/actions/userActions";
import { MdOutlineAttachMoney } from "react-icons/md";
import axios from "axios";

const formatter = (value) => `${value}`;
const dateFormat = "YYYY/MM/DD";

function Dashboard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [transactions, setTransactions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  useEffect(() => {
    dispatch(getUsers());
    const fetchTransactions = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/v1/transactions");
            setTransactions(response.data.transactions);
            setTotalAmount(response.data.totalAmount);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the transactions!', error);
            setError(error);
            setLoading(false);
        }
    };

    fetchTransactions();
    return () => {
      dispatch(clearUserState());
    };
  }, []);
  return (
    <div className="wrapper">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="headerTitles">
              <div className="Name">Tổng đơn hàng</div>
              <div className="quantity">
                <div className="number">
                  <Statistic
                    className="number"
                    value={transactions.length}
                    valueStyle={{ color: "#fff", fontSize: "33px" }}
                    formatter={formatter}
                  />
                </div>
              </div>
            </div>
            <div className="headerIcon" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <ShoppingCartOutlined className="iconCart" />
            </div>
          </div>
          <div className="header1">
            <div className="headerTitles">
              <div className="Name">Tổng số người dùng</div>
              <div className="quantity">
                <div className="number">
                  <Statistic
                    className="number"
                    value={users.length}
                    valueStyle={{ color: "#fff", fontSize: "33px" }}
                    formatter={formatter}
                  />
                </div>
              </div>
            </div>
            <div className="headerIcon" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <UserOutlined className="iconCart" />
            </div>
          </div>
          <div className="header2">
            <div className="headerTitles">
              <div className="Name">Tổng tiền</div>
              <div className="quantity">
                <div className="number">
                  VND
                  <Statistic
                    value={(totalAmount/100).toLocaleString("vi-VN")}
                    valueStyle={{
                      color: "#fff",
                      fontSize: "33px",
                      paddingLeft: "10px",
                    }}
                    formatter={formatter}
                  />
                </div>
              </div>
            </div>
            <div className="headerIcon" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <MdOutlineAttachMoney className="iconCart"/>
            </div>
          </div>
        </div>
        <div className="search">
          <div className="headerSearch">BIỂU ĐỒ LỌC</div>
          <div className="contentSearch">
            <div className="contentItemSearch">
              <div className="title">Ngày bắt đầu</div>
              <div className="input">
                <DatePicker
                  defaultValue={dayjs("2023/01/01", dateFormat)}
                  format={dateFormat}
                  style={{ width: "100%", height: "75%" }}
                />
              </div>
            </div>
            <div className="contentItemSearch">
              <div className="title">Ngày kết thúc</div>
              <div className="input">
                <DatePicker
                  defaultValue={dayjs("2023/12/31", dateFormat)}
                  format={dateFormat}
                  style={{ width: "100%", height: "75%" }}
                />
              </div>
            </div>
            <div className="contentItemSearch">
              <div className="title">Lọc biểu đồ</div>
              <div className="input">
                <Button
                  type="primary"
                  style={{
                    height: "75%",
                    width: "100%",
                    backgroundColor: "rgb(11, 189, 204)",
                  }}
                >
                  Lọc
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="chart">
          <div className="chartValue">
            <div className="chartLabel">
              <div className="chartName">TỔNG QUAN</div>
              <div className="chartName1">Doanh số</div>
            </div>
            <Chart
              total={[820, 932, 901, 934, 1290, 1330, 1320]}
              startDate={"2023/01/01"}
              endDate={"2023/12/31"}
              title={"Doanh số"}
              width={"815px"}
            />
          </div>
          <div className="chartValue1">
            <div className="chartLabel">
              <div className="chartName">HIỆU SUẤT</div>
              <div className="chartName1">Tổng số đơn đặt hàng</div>
            </div>
            <Chart
              orders={[220, 182, 191, 234, 290, 330, 310]}
              startDate={"2023/01/01"}
              endDate={"2023/12/31"}
              title={"Số lượng đơn hàng"}
              width={"518px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
