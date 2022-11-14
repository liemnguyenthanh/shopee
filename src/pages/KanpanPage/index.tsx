import React, { useRef, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { SwapItemInArray } from '../../utils/helpers';

const generateCard = (number: number) => ({ id: number })

const generateDataList = () => {
  const list = []
  for (let index = 0; index < 4; index++) {
    list.push(generateCard(index + 1))
  }
  return list;
}

const KanbanPage = () => {
  const [data, setData] = useState<any>({
    'doing': generateDataList(),
    'done': generateDataList()
  })
  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();
  const heightItem = useRef<number>(0);
  const itemListRef = useRef<any>();
  const itemDrag = useRef<any>();

  const dragStart = (event: any, position: number, category: string) => {
    const item = event.target;
    const itemParent = item.parentNode;
    const allItem = itemParent.querySelectorAll('li')

    dragItem.current = position;
    heightItem.current = event.target.clientHeight;
    itemDrag.current = event.target;
    if (!itemListRef.current) itemListRef.current = allItem
    /*=== you can get margin in here to calc height exactly === 
       let nodeStyle = window.getComputedStyle(item)
       let slideMarginRight = nodeStyle.getPropertyValue('margin-bottom')
       console.log({slideMarginRight});*/

    setTimeout(() => {
      event.target.style.opacity = '0'
      event.target.style.visibility = 'hidden'
      event.target.style.zIndex = 1
    }, 0);

    for (let index = 0; index < allItem.length; index++) {
      let element = allItem[index];
      if (index !== position) element.style.transition = '0.3s'
    }
  };

  const dragEnter = (event: any, position: number, category: string) => {
    if (typeof dragItem.current === 'number' && itemListRef.current && itemListRef.current.length > 0) {
      dragOverItem.current = position;
      let element = itemListRef.current[position];

      if (dragItem.current > position) {
        //item drag move up
        let isMoveDown: boolean = !!(event.clientY < heightItem.current * (1 + 0.3 + position))
        let move: number = isMoveDown ? heightItem.current + 16 : 0;
        console.log("item drag move up:",move);
        element.style.transform = `translateY(${move}px)`
        itemDrag.current.style.transform = `translateY(${-move}px)`
      } else {
        //item drag move down
        let isMoveUp: boolean = !!(heightItem.current * position > event.clientY - 10 * position)
        let move: number = isMoveUp ? 0 : -heightItem.current - 16;
        console.log("item drag move down:",move);
        element.style.transform = `translateY(${move}px)`
      }

    }
  };

  const drop = (event: any, category: string) => {
    let copyListItems: any = { ...data };
    event.target.style.opacity = '1'
    event.target.style.visibility = 'visible'
    for (let index = 0; index < itemListRef.current.length; index++) {
      let element = itemListRef.current[index];
      element.style = {}
    }
    if (typeof dragItem.current === 'number' && typeof dragOverItem.current === 'number') {
      copyListItems[category] = SwapItemInArray(copyListItems[category], dragItem.current, dragOverItem.current);
      dragItem.current = null;
      dragOverItem.current = null;
      setData(copyListItems);
    }
  };

  return (
    <div className='d-flex '>
      {
        Object.keys(data).map((col: string, idx: number) =>
          <React.Fragment key={col}>
            <h3 className="title">{col}</h3>
            <ul className={`c-category c-category-${col}`}>
              {
                data[col].length > 0 &&
                data[col].map((item: any, index: number) => (
                  <li
                    className='c-card'
                    data-card={index}
                    key={item.id}
                    draggable
                    onDragStart={(event) => dragStart(event, index, col)}
                    onDragEnter={(event) => dragEnter(event, index, col)}
                    onDragEnd={(event) => drop(event, col)}
                  >
                    Card {item.id}
                    
                        {/* <Card.Text>
                          task <span className={col === 'done' ? 'text-danger' : 'text-primary'}>{col}</span>
                        </Card.Text> */}
                  </li>
                ))
              }
            </ul>
          </React.Fragment>
        )
      }
    </div>
  )
}

export default KanbanPage
