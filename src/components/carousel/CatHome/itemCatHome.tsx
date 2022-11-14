import React from 'react'
import CardCatHome from '../../card/CardCatHome';

const ItemCarouselCatHome = ({ list, width}: any) => {
  let count = 0;// count: use to render list categories follow 2 items in a time loop
  return <React.Fragment>
    {
      Array.from({ length: list.length / 2 }, (_, i) => {
        if (i !== 0) count += 2;

        return (
          <li className='cat-carousel__item' style={{ width: `${width}%` }} key={i}>
            {list[count] && <CardCatHome category={list[count]} />}
            {list[count + 1] && <CardCatHome category={list[count + 1]} />}
          </li>
        )
      })
    }
  </React.Fragment>
}

export default ItemCarouselCatHome