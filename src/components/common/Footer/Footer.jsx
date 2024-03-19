import "./Footer.css"
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined } from "@ant-design/icons"
import logo from "../../../assets/img/logo.png"
import appstore from "../../../assets/img/appstore.png"
import { Link } from "react-router-dom";
function Footer() {
    return (
        <div id="footer">
            <div className="content">
                <div className="infor">
                    <div className="logo" >
                        <img src={logo} alt="logo" />
                        <p>Chúng tôi có mọi thứ cho thú cưng ở đây!</p>
                    </div>
                    <div className="subcribe" >
                        <h3>Theo dõi bản tin của chúng tôi</h3>
                        <p>Blog mới về thú cưng mỗi tuần!</p>
                        <div className="search">
                            <input placeholder="ĐỊA CHỈ EMAIL CỦA BẠN..." />
                            <Link to="/register">ĐĂNG KÝ</Link>
                        </div>
                    </div>
                </div>
                <div className="intro">
                    <div className="order">
                        <h3>Tôi đặt hàng ở đâu?</h3>
                        <button>THEO DÕI ĐƠN </button>
                        <p>Xin lưu ý, có thể mất nhiều thời gian hơn bình thường để hoàn thành các đơn hàng do ảnh hưởng của COVID-19.</p>
                    </div>
                    <div className="about-us">
                        <h3>Công ty của chúng tôi</h3>
                        <p>Giới thiệu</p>
                        <p>Nghề nghiệp</p>
                        <p>Liên lạc</p>
                        <p>Trụ sở</p>
                    </div>
                </div>
                <div className="social">
                    <div className="shipping">
                        <h3>Shipping</h3>
                        <p>Thông tin về miễn phí ship</p>
                        <p>Thông tin về ship</p>
                    </div>
                    <div className="social-media">
                        <h3>Mạng xã hội</h3>
                        <div className="icon">
                            <FacebookOutlined />
                            <InstagramOutlined />
                            <YoutubeOutlined />
                            <TwitterOutlined />
                        </div>
                        <p>Cho chúng tôi thấy thú cưng của bạn:</p>
                        <p>#petparadiseshop</p>
                        <p>#thepetparadiseshop</p>
                    </div>
                </div>
                <div className="outro">
                    <div className="shopping-app">
                        <h3>Mua sắm qua App</h3>
                        <p>Hãy dùng thử tính năng Xem trong phòng của bạn, quản lý đăng ký và lưu thông tin thanh toán.
                        </p>
                        <img src={appstore} alt="appstore" />
                    </div>
                    <div className="policies">
                        <h3>Chính sách về ship</h3>
                        <p>Chính sách hoàn tiền</p>
                        <p>Chính sách sự riêng tư</p>
                        <p>Điều khoản dịch vụ</p>
                    </div>
                </div>
            </div>
            <div className="coppyright">
                <p>Copyright © 2024 The Pet Paradise Shop.
                    All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;