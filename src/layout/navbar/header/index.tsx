import React from 'react'
import { MdNotificationsNone } from 'react-icons/md'
import { BiHelpCircle } from 'react-icons/bi'
import { TbWorld } from 'react-icons/tb'

const HeaderNavbar = () => {
  return (
    <div className='header'>
      <div className="header__left">
        <div className="header__text">Kênh người bán</div>
        <div className="header__text header__text--icon">Tải ứng dụng</div>
        <div className="header__text header__text--icon">Kết nối</div>
      </div>
      <div className="header__right">
        <div className="header__text header__text--space">
          <MdNotificationsNone className='header__icon' />
          Thông báo
        </div>
        <div className="header__text header__text--space">
          <BiHelpCircle className='header__icon' />
          Hỗ trợ
        </div>
        <div className="header__text header__text--space">
          <TbWorld className='header__icon' />
          Tiếng Việt
        </div>
        <div className="header__action">
          
        </div>
      </div>
    </div>
  )
}

export default HeaderNavbar