import React from 'react'
import { Product } from '../../utils/types/Products'

export interface CartProps {
  item: Product
}
const url_img = 'https://cf.shopee.vn/file/5a800e034511596919e656e1b3bc0ff8_tn'

const CardCart = ({ item }: CartProps) => {
  return (
    <div className='card-cart'>
      <div className="card-cart__img">
        <img src={url_img} alt="" />
      </div>
      <div className="card-cart__title">
        {item.name}
      </div>
      <div className="card-cart__price">
        {item.price}
      </div>
    </div>
  )
}

export default CardCart
