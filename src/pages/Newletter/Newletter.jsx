import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import imgnewletter1 from "../../assets/img/newletter1.webp";
import imgnewletter2 from "../../assets/img/newletter2.webp";
import imgnewletter3 from "../../assets/img/newletter3.webp";
import imgnewletter4 from "../../assets/img/newletter4.webp";
import imgnewletter5 from "../../assets/img/newletter5.webp";
import imgnewletter6 from "../../assets/img/newletter6.webp";
import imgnewletter7 from "../../assets/img/newletter7.webp";
import hotnew1 from "../../assets/img/hot-new1.webp";
import hotnew2 from "../../assets/img/hot-new2.webp";
import hotnew3 from "../../assets/img/hot-new3.webp";
import hotnew4 from "../../assets/img/hot-new4.webp";
import hotnew5 from "../../assets/img/hot-new5.webp";
import imgdecor from "../../assets/img/img_decor.png";
import "./Newletter.css";
import { useSelector } from "react-redux";

function Newletter() {
  const email = useSelector((state) => state.auth.email);
  return (
    <div className="newletter-container">
      <Header email={email}></Header>
      <div className="decor">
        <h1>Tin Thú Cưng</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container content-newletter">
        <div className="newletter-left">
          <h2>TIN TỨC</h2>
          <div className="newletter-card">
            <img src={imgnewletter1} alt="imgnewletter1" />
            <div className="newletter_content">
              <h3>
                <a href="#">
                  Cách ít người biết để dạy mèo đi vệ sinh đúng chỗ
                </a>
              </h3>
              <p>
                Với không ít người nuôi mèo, việc dạy cho mèo cách đi vệ sinh
                đúng chỗ là một chuyện không hề dễ, và nếu không chú ý tới vấn
                đề này ngay từ khi mèo còn nhỏ chúng ta s...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
          <div className="newletter-card">
            <img src={imgnewletter2} alt="imgnewletter2" />
            <div className="newletter_content">
              <h3>
                <a href="#">
                  Tình yêu giống như một con chó, mình đuổi thì nó chạy mình
                  chạy thì nó lại đuổi
                </a>
              </h3>
              <p>
                “Tình yêu thứ mà ai cũng khao khát có được, ai cũng muốn mình là
                người hạnh phúc nhất, nhưng cuộc sống lại không...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
          <div className="newletter-card">
            <img src={imgnewletter3} alt="imgnewletter3" />
            <div className="newletter_content">
              <h3>
                <a href="#">Nên nuôi chó Husky hay Alaska</a>
              </h3>
              <p>
                Husky hay Alaska là 2 giống chó nổi tiếng trên thế giới và được
                ví von là giống chó kéo xe. Chúng có chung tổ tiên là giống chó
                sói Bắc Cực, có nhiều điểm giống nhau...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
          <div className="newletter-card">
            <img src={imgnewletter4} alt="imgnewletter4" />
            <div className="newletter_content">
              <h3>
                <a href="#">
                  Tại sao chó thích ngủ với người? dấu hiệu cún cứng yêu bạn
                </a>
              </h3>
              <p>
                Lý do tại sao chó thích ngủ với người? Có thể khi nuôi những chú
                chó trong nhà, bạn sẽ từng có lúc ngủ chung với chó đúng không
                nào. Đó là khi bạn gặp phải cảnh ch...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
          <div className="newletter-card">
            <img src={imgnewletter5} alt="imgnewletter5" />
            <div className="newletter_content">
              <h3>
                <a href="#">Thức ăn cho chuột hamster – những điều cần biết</a>
              </h3>
              <p>
                Hiện nay thức ăn cho chuột hamster có rất nhiều loại , từ thức
                ăn chính đến thức ăn dinh dưỡng , thức ăn bổ sung …. hôm nay
                Catchy Pet sẽ chia sẻ 1 bài viết về cách...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
          <div className="newletter-card">
            <img src={imgnewletter6} alt="imgnewletter6" />
            <div className="newletter_content">
              <h3>
                <a href="#">
                  Huấn luyện chó con nghe lời chỉ với 10 phút mỗi ngày
                </a>
              </h3>
              <p>
                Chó là 1 loài vật rất trung thành với con người. Chúng là loài
                vật đáng yêu và mang lại nhiều niềm vui cho con người. Tuy vậy
                để huấn luyện chó con biết vâng lời thì...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
          <div className="newletter-card">
            <img src={imgnewletter7} alt="imgnewletter7" />
            <div className="newletter_content">
              <h3>
                <a href="#">
                  Pate cho chó - Giải pháp chuyên trị cho chó kén ăn
                </a>
              </h3>
              <p>
                1. CHẾ ĐỘ ĂN CỦA CHÓ NHƯ THẾ NÀO? Chó là loài động vật ăn thịt
                nên nhu cầu về lượng đạm trong chế độ dinh dưỡng hằng ngày.
                Trong khẩu phần ăn của chó,...
              </p>
              <div className="show_more">
                <a href="#" class="showMoreLink">
                  Xem tiếp
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="newletter-right">
          <h2>BÀI VIẾT NỔI BẬT</h2>
          <div className="hot-new">
            <img src={hotnew1} alt="hotnew1" />
            <p>Nguyên nhân khiến chó trở nên hung dữ</p>
          </div>
          <div className="hot-new">
            <img src={hotnew2} alt="hotnew2" />
            <p>Huấn luyện chó mèo ngủ đúng chỗ hiệu quả nhất!</p>
          </div>
          <div className="hot-new">
            <img src={hotnew3} alt="hotnew3" />
            <p>Cách để giao tiếp với mèo</p>
          </div>
          <div className="hot-new">
            <img src={hotnew4} alt="hotnew4" />
            <p>Cách tính tuổi mèo chính xác nhất</p>
          </div>
          <img src={hotnew5} alt="hotnew5"  />
          <h2>TỪ KHÓA TÌM KIẾM</h2>
          <h4>chó</h4>
          <h4>mèo</h4>
          <h4>phụ kiện</h4>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Newletter;
