import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import "./HomePage.css";
import imgdecor from "../../assets/img/img_decor.png";
import imgbanner from "../../assets/img/banner.webp";
import imgnewletter1 from "../../assets/img/newletter1.webp";
import imgnewletter2 from "../../assets/img/newletter2.webp";
function HomePage() {
  return (
    <div>
      <Header></Header>
      <div className="decor">
        <h1>Danh Mục</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container">
        <div className="category">
          <div className="category-card">
            <h2>Chó</h2>
          </div>
          <div className="category-card">
            <h2>Mèo</h2>
          </div>
          <div className="category-card">
            <h2>Phụ kiện</h2>
          </div>
        </div>
      </div>
      <div className="banner">
        <img src={imgbanner} alt="imgbanner" />
      </div>
      <div className="decor">
        <h1>Sản Phẩm</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container">
        <div className="product">
          <div className="product-card">
            <h2>Chó</h2>
          </div>
          <div className="product-card">
            <h2>Mèo</h2>
          </div>
          <div className="product-card">
            <h2>Phụ kiện</h2>
          </div>
          <div className="product-card">
            <h2>Chó</h2>
          </div>
          <div className="product-card">
            <h2>Mèo</h2>
          </div>
          <div className="product-card">
            <h2>Phụ kiện</h2>
          </div>
          <div className="product-card">
            <h2>Chó</h2>
          </div>
          <div className="product-card">
            <h2>Mèo</h2>
          </div>
          <div className="product-card">
            <h2>Phụ kiện</h2>
          </div>
        </div>
      </div>
      <div className="decor">
        <h1>Tin Thú Cưng</h1>
        <img src={imgdecor} alt="imgdecor" />
      </div>
      <div className="container">
        <div className="newletter">
          <div className="newletter-card">
            <img src={imgnewletter1} alt="imgbanner" />
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
            <img src={imgnewletter2} alt="imgbanner" />
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
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
