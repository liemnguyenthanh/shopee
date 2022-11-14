import { IoCartOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { convertNumberToShowInCart } from '../../../utils/helpers'
export interface IconCartProps {
  total: number
}
const IconCart = ({ total }: IconCartProps) => {
  return (
    <Link to='cart'>
      <div className="c-navbar__cart">
        <IoCartOutline className='c-navbar__cart-icon' />
        {total > 0 &&
          <div className="c-navbar__total">
            <div className="c-navbar__cart-number">
              {convertNumberToShowInCart(total)}
            </div>
          </div>}
      </div>
    </Link>
  )
}

export default IconCart
