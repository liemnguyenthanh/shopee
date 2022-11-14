import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CarouselBannerHome from '../../../components/carousel/Banner'
import { SUPER_SALE } from '../../../constant'
import { RootState } from '../../../stores'
import { convertToSlug } from '../../../utils/helpers'

const BannerHomeWrap = () => {
  const { bannerHome } = useSelector((state: RootState) => state.banner)

  return (
    <div className="banner-home">
      <div className="c-container">
        <div className='banner-home__wrap'>
          <div className="banner-home__left">
            <CarouselBannerHome />
          </div>
          <div className="banner-home__right">
            {
              bannerHome.length > 0 &&
              <>
                <div className="banner-home__right-head">
                  <img className='banner-home__img' src={bannerHome[1]['image_url']} alt="" />
                </div>
                <div className="banner-home__right-last">
                  <img className='banner-home__img' src={bannerHome[3]['image_url']} alt="" />
                </div>
              </>
            }
          </div>
        </div>
        <div className="banner-home__sale-list">
          {
            Object.keys(SUPER_SALE).map((key: string, idx: number) =>
              <Link to={convertToSlug(SUPER_SALE[key].name)} className='banner-home__sale-item c-link' key={idx}>
                <img className='banner-home__item-img' src={SUPER_SALE[key].img} alt="" />
                {SUPER_SALE[key].name}
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default BannerHomeWrap
