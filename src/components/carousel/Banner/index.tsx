import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores'
import CarouselDefault from '../Default'

const CarouselBannerHome = () => {
  const { bannerHome } = useSelector((state: RootState) => state.banner)

  if (bannerHome.length === 0) return <></>;
  
  return (
    <CarouselDefault>
      {
        bannerHome.map((ban: any) =>
          <li className='carousel__item' key={ban.banner_metadata.banner_id}>
            <img className='carousel__item-img' src={ban.image_url} alt={ban.banner_metadata.banner_id} />
          </li>
        )
      }
    </CarouselDefault>
  )
}

export default CarouselBannerHome
