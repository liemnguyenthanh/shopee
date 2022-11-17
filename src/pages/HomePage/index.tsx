/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "stores"
import { fetchBannerThunk } from "stores/banners/bannerThunk"
import { fetchCategoriesThunk } from "stores/categories/categoryThunk"
import BannerHomeWrap from "./Banner"
import ProductListHome from "./List/ProductList"
import CarouselCatHome from "components/carousel/CatHome"
import TitleCarousel from "components/title/TitleCarousel"

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoriesHome } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    dispatch(fetchBannerThunk());
  }, [])

  return (
    <div className='' >
      <BannerHomeWrap />
      <div className="c-container">
        <TitleCarousel />
        <CarouselCatHome list={categoriesHome} itemShow={10} />
        <ProductListHome />
      </div>
    </div>
  )
}

export default HomePage
