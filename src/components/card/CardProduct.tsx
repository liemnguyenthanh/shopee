import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const url_img = 'https://cf.shopee.vn/file/5a800e034511596919e656e1b3bc0ff8_tn'
function CardProduct({
  children
}: PropsWithChildren) {

  return (
    <div className="card-pro">
      <Link to='/' className="c-link">
        <div className="card-pro__container">
          <img className="card-pro__img" src={url_img} alt="produc name" />
          <div className="card-pro__love">Yêu thích+</div>
          <div className="card-pro__discount">
            <div className="card-pro__discount-percent">49%</div>Giảm
          </div>
        </div>
        <div className="card-pro__title">Vỏ gối ôm kéo khóa 35x100cm 70x100cm Cotton 100% Hàn Quốc màu trơn Conbee, áo gối bao gối Cotton cao cấp vải nhập khẩu</div>
        <div className="card-pro__footer">
          <div className="card-pro__price">d20.000</div>
          <div className="card-pro__total-sale">Đã bán 2k</div>
        </div>
        <div className="card-pro__search">Tìm sản phẩm tương tự</div>
      </Link>
    </div>
  )
}
export default CardProduct;