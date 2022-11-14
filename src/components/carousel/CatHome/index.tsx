/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import ItemCarouselCatHome from './itemCatHome';

export interface CarouselProps {
  list: any[],
  itemShow: number;
}

export interface TransitionItem {
  width: string;
  transform: number;
  transition: string;
}

const getTotalCountNextPage = (total: number, itemShow: number) => {
  const hasMore = total % itemShow > 0
  return Math.floor(total / itemShow) + (hasMore ? 1 : 0)
}

const getCarouselPaging = (list: any[], itemShow: number) => {
  const paging: { [num: string]: number } = {
    1: 0
  }
  const totalChild = Math.floor(list.length / 2)
  const totalCountNextPage = getTotalCountNextPage(totalChild, itemShow)
  const width_item: number = 100 / totalChild;

  for (let index = 2; index <= totalCountNextPage; index++) {
    let space = width_item * itemShow * (index - 1)
    if (index === totalCountNextPage) {
      space += - width_item * (itemShow - totalChild % itemShow)
    }
    paging[index] = space
  }
  return paging
}

const CarouselCatHome = ({ list, itemShow }: CarouselProps) => {
  const [transitionItem, setTransitionItem] = useState<TransitionItem>({
    width: '0',
    transform: 0,
    transition: 'all 500ms ease 0s'
  });
  const countNextPage = useRef<number>(1);
  const totalChild = Math.floor(list.length / 2)
  const paging = getCarouselPaging(list, itemShow)

  
  useEffect(() => {
    if (list.length > 0) {
      let width = totalChild * (100 / itemShow);
      updateTransitionItem('width', width.toString())
    }
  }, [list])

  const updateTransitionItem = (key: string, value: any) => 
    setTransitionItem({ ...transitionItem, [key]: value })

  const handleTranslateList = (isNext: boolean) => {
    const current_page = countNextPage.current + (isNext ? 1 : -1);
    if (!(current_page in paging)) return;
    
    updateTransitionItem('transform', paging[current_page])
    countNextPage.current = current_page
  }

  if (list.length === 0) return <React.Fragment />;

  return (
    <div className="cat-carousel">
      <div className='cat-carousel__wrapper'>
        <ul
          className='cat-carousel__list'
          style={{
            width: `${transitionItem.width}%`,
            transform: `translate(-${transitionItem.transform}%, 0)`,
            transition: transitionItem.transition
          }}>
          <ItemCarouselCatHome list={list} width={100 / itemShow} />
        </ul>
      </div>
      <button
        onClick={() => handleTranslateList(false)}
        className="cat-carousel__btn cat-carousel__btn--prev">
        <GrFormPrevious />
      </button>
      <button
        onClick={() => handleTranslateList(true)}
        className="cat-carousel__btn cat-carousel__btn--next">
        <GrFormNext />
      </button>
    </div>
  )
}

CarouselCatHome.defaultProps = {
  itemShow: 10
}

export default CarouselCatHome