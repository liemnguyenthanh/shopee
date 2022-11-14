/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'

export interface CarouselProps extends PropsWithChildren {
  // list: any[]
  timeLoop: number;
}

export const TransitionCarousel = {
  ALL_500: 'all 500ms ease 0s',
  ALL_0: 'all 0ms'
}

const getCarouselPaging = (length: number) => {
  const paging: { [num: string]: number } = {
    1: 0
  }
  const width_item: number = 100 / length;

  for (let index = 2; index <= length; index++) {
    paging[index] = width_item * (index - 1)
  }
  return paging
}

const CarouselDefault = ({ timeLoop, children }: CarouselProps) => {
  const [transitionItem, setTransitionItem] = useState<any>({
    width: 0,
    transform: 0,
    transition: TransitionCarousel.ALL_500
  });
  const [paging, setPaging] = useState<{ [num: string]: number } | null>(null)
  const [length, setLength] = useState<number>(0)
  const listRef = useRef<HTMLUListElement>(null)
  const countNextPage = useRef<number>(1);
  const hasAppend = useRef<boolean>(false);

  useEffect(() => {
    if (listRef.current && !hasAppend.current) {
      hasAppend.current = true
      const firstEle = listRef.current.querySelector('li')
      const newELe = firstEle?.cloneNode(true)
      if (newELe) listRef.current.append(newELe)
      const list = listRef.current.querySelectorAll('li')
      if (list.length) {
        let width = list.length * 100;
        setTransitionItem({ ...transitionItem, width: width.toString() })
        setPaging(getCarouselPaging(list.length))
        setLength(list.length)
      }
    }
  }, [])

  useEffect(() => {
    if (paging) {
      setInterval(() => {
        handleTranslateList(countNextPage.current + 1)
      }, timeLoop)
    }
  }, [paging])

  const goBackToFirstItemAnimation = () => {
    setTimeout(() => {
      setTransitionItem({ ...transitionItem, transform: 0, transition: TransitionCarousel.ALL_0 })
      countNextPage.current = 1
    }, 500);
  }

  const handleTranslateList = (value: number) => {
    const current_page = value;
    if (!paging) return;
    if (!(current_page in paging)) return;

    setTransitionItem({ ...transitionItem, transition: TransitionCarousel.ALL_500, transform: paging[current_page] })
    countNextPage.current = current_page

    if (current_page === length) goBackToFirstItemAnimation()
  }

  return (
    <div className="carousel">
      <div className='carousel__wrapper'>
        <ul
          className='carousel__list'
          ref={listRef}
          style={{
            width: `${transitionItem.width}%`,
            transform: `translate(-${transitionItem.transform}%, 0)`,
            transition: transitionItem.transition
          }}>
          {children}
        </ul>
      </div>
      <button
        onClick={() => handleTranslateList(countNextPage.current - 1)}
        className="carousel__btn carousel__btn--prev">
        <MdOutlineArrowBackIos />
      </button>
      <button
        onClick={() => handleTranslateList(countNextPage.current + 1)}
        className="carousel__btn carousel__btn--next">
        <MdOutlineArrowForwardIos />
      </button>
      <div className="carousel__dots">
        {Array.from({ length: length - 1 }, (_: any, idx: number) =>
          <div 
            key={idx} 
            className={`carousel__dot ${countNextPage.current === (idx + 1) ? 'carousel__dot--active' : ''}`} 
            onClick={() => handleTranslateList(idx + 1)}
          />)}
      </div>
    </div>
  )
}

CarouselDefault.defaultProps = {
  timeLoop: 3000
}

export default CarouselDefault