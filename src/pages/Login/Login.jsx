import React, { useState, useEffect, useContext } from "react";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import "./Login.css";
import bglogin from "../../assets/img/bglogin.png";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, login } from "../../redux/actions/authAction";
import { toast } from "react-toastify";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRoles = useSelector((state) => state.auth.roles);
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    dispatch(login(username, password));
  }, [username, password]);

  const handleLogin = async () => {
    try {
      await dispatch(login(username, password));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('refreshToken', refreshToken);
      const roleNames = userRoles.map((role) => role.name);
      if (
        roleNames.includes("ROLE_ADMIN") ||
        roleNames.includes("ROLE_MANAGER")
      ) {
        console.log("roleNames: true:====>", roleNames);
        localStorage.setItem("loginSuccess", "true");
        navigate("/admin/products/list");
      } else if (roleNames.includes("ROLE_USER")) {
        console.log("roleNames: false:====>", roleNames);
        localStorage.setItem("loginSuccess", "true");
        navigate("/");
      } else {
        localStorage.setItem("loginSuccess", "false");
        toast.error("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng thử lại!");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div id="login">
      <div className="wrapper">
        <div className="content">
          <img src={bglogin} alt="bg-login" />
          <div className="form">
            <p>Đăng nhập</p>
            <div className="signup">
              <p>Bạn chưa có tài khoản?</p>
              <Link to="/register">Đăng ký</Link>
            </div>
            <input
              className="account"
              placeholder="Tên tài khoản"
              value={username}
              onChange={handleUsernameChange}
              onKeyDown={handleKeyDown}
            />
            <div className="process-password">
              <input
                className="password"
                placeholder="Mật khẩu"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
              />
              <div className="eye" onClick={handleTogglePasswordVisibility}>
                {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>
            <button className="submit" onClick={handleLogin}>
              Đăng nhập
            </button>
            <div className="help">
              <a href="#">Quên mật khẩu?</a>
              <a href="#">Đăng nhập với số điện thoại</a>
            </div>
            <div className="connect">
              <span>Bằng cách đăng ký, bạn đồng ý với Pet Paradise's</span>
              <a href="#">Điều khoản dịch vụ</a>
              <span>&</span>
              <a href="#">Chính sách bảo mật</a>
            </div>
            <div className="back">
              <DoubleLeftOutlined />
              <Link to="/">Quay lại</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
