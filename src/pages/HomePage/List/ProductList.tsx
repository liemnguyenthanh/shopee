import React from 'react'
import { useSelector } from 'react-redux'
import CardProduct from '../../../components/card/CardProduct';
import { RootState } from '../../../stores'
import { Product } from '../../../utils/types/Products';

const ProductListHome = () => {
  const { proListHome } = useSelector((state: RootState) => state.product);
  return (
    <div className="list-card">
      {
        proListHome.length > 0 &&
        proListHome.map((item: Product, index: number) =>
          <CardProduct key={index} />)
      }
    </div>
  )
}

export default ProductListHome
