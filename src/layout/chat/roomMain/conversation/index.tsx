/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'stores'
import { loadMoreMessage } from 'stores/gateway/gatewaySlice'
import { loadMoreMessageFake } from 'utils/helpers/chat'
import { IMessage } from 'utils/types/Gateway'
import { CMessageMainList } from './conversionMessages'

const CConversation = () => {
  const { messagesAllRoom, selectedRoomId } = useSelector((state: RootState) => state.gateway)
  const [isScrollToBottom, setIsScrollToBottom] = useState<Boolean>(false)
  const wrapListRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (selectedRoomId) {
      if (wrapListRef.current && listRef.current && !isScrollToBottom) {
        wrapListRef.current.scrollIntoView({ block: 'end' })
        setIsScrollToBottom(true)
      } else {
        listRef.current?.scrollBy(0, 46 * 20)
      }
    }
  }, [selectedRoomId && messagesAllRoom[selectedRoomId]])

  const onScrollList = (event: any) => {
    if (event.target.scrollTop === 0) onLoadMoreMessage()
  }

  const onLoadMoreMessage = () => {
    if (!selectedRoomId) return;
    const new_list: IMessage[] = loadMoreMessageFake('liem', selectedRoomId)
    dispatch(loadMoreMessage({ room_id: selectedRoomId, new_list }))
  }

  return (
    <div className="chatbox__messages" ref={listRef} onScroll={onScrollList}>
      <div className="chatbox__messages-wrap" ref={wrapListRef}>
        {
        selectedRoomId &&
        selectedRoomId in messagesAllRoom &&
        <CMessageMainList messagelist={messagesAllRoom[selectedRoomId]} />
      }
      </div>
    </div>
  )
}


export default CConversation