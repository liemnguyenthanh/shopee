import { useSelector } from 'react-redux'
import Tooltip from '../../../components/tooltip/Tooltip'
import { RootState } from '../../../stores'
import IconCart from './icon'
import PopupCart from './popup'

const CartNavbar = () => {
  const { cartList } = useSelector((state: RootState) => state.cart)

  return (
    <Tooltip
      Component={<PopupCart list={cartList}/>}
    >
      <IconCart total={cartList.length} />
    </Tooltip>
  )
}

export default CartNavbar
