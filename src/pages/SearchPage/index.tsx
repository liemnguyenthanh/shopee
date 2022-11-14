/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { FiFilter } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { AppDispatch } from '../../stores'
import { fetchShopResultThunk } from '../../stores/common/commonThunk'
import { convertUrlToObject } from '../../utils/helpers'
import ResultKeyword from './result/keyword'
import ResultShop from './result/shop'
const SearchPage = () => {
  const { search } = useLocation()
  const searchObject: any = convertUrlToObject(search)
  const dispatch:AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShopResultThunk());
  }, [searchObject])
  
  return (
    <div className='layout c-container'>
      <div className="layout__left">
        <div className="layout__title">
          <FiFilter className="layout__icon" />
          bộ lọc tìm kiếm
        </div>
      </div>
      <div className="layout__right">
        {searchObject?.keyword && <ResultKeyword keyword={searchObject.keyword} />}
        <ResultShop/>
        <div className="result__product">result__product</div>
      </div>
    </div>
  )
}

export default SearchPage