import ButtonDefault from "../../../components/button/ButtonDefault"
import CardCart from "../../../components/card/CardCart"
import { Product } from "../../../utils/types/Products"

export interface PopupCartProps {
  list: Product[]
}
const PopupCart = ({ list }: PopupCartProps) => {
  if (list.length === 0) return <div className="cart-popup cart-popup--nothing">Chưa có sản phẩm</div>

  const onclick = () => {}
  return (
    <div className="cart-popup">
      <div className="cart-popup__title">Sản phẩm mới thêm</div>
      <div className="cart-popup__list">
        {list.map((item, idx) => <CardCart item={item} key={idx} />)}
      </div>
      <div className="cart-popup__btn">
        <ButtonDefault onClick={onclick}>
          Xem giỏ hàng
        </ButtonDefault>
      </div>
    </div>
  )
}

export default PopupCart
