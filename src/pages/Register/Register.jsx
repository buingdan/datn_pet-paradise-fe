import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Register.css"
import bglogin from "../../assets/img/bglogin.png"
import {DoubleLeftOutlined} from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { register } from "../../redux/actions/authAction"
import { toast } from "react-toastify"


function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const handleSaveUser = async () => {
        try {
        await dispatch(register(username, fullName, email, password, address, phoneNumber, navigate));
        toast.success("Đăng ký thành công!"); 
      navigate("/login");
    } catch (error) {
        toast.error("Đăng ký thất bại. Vui lòng thử lại")
      }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSaveUser();
        }
    };
    return (
        <div id="signup">
            <div className="wrapper">
                <div className="content">
                    <img src={bglogin} alt="bg-login" />
                    <div className="form">
                        <p>Đăng ký</p>
                        <div className="signin" >
                            <p>Tin về Pet Paradise Shop?</p>
                            <Link to="/login">Đăng nhập</Link>
                        </div>
                        <div className="create-name">
                            <input className="first-name"
                                placeholder="Tên đăng nhập"
                                onChange={(event) => setUsername(event.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <input className="last-name"
                                placeholder="Tên đầy đủ"
                                onChange={(event) => setFullName(event.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <input className="email"
                            placeholder="Địa chỉ email"
                            onChange={(event) => setEmail(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <input className="address"
                            placeholder="Địa chỉ"
                            onChange={(event) => setAddress(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <input className="phone"
                            placeholder="Số điện thoại"
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <input className="password"
                            placeholder="Mật khẩu"
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        <button className="create-acc" onClick={handleSaveUser}>Tạo tài khoản</button>
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

export default Register;