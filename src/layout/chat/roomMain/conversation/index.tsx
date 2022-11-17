/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'stores'
import { loadMoreMessage } from 'stores/gateway/gatewaySlice'
import { convertMessagesByUser, loadMoreMessageFake } from 'utils/helpers/chat'
import { IMessage } from 'utils/types/Gateway'
import { CMessageMainList } from './conversionMessages'

const CConversation = () => {
  const { messagesAllRoom, selectedRoomId } = useSelector((state: RootState) => state.gateway)
  const [isScrollToBottom, setIsScrollToBottom] = useState<Boolean>(false)
  const wrapListRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  const _messagesListMain = useMemo(() => {
    if (!(selectedRoomId && messagesAllRoom[selectedRoomId] && messagesAllRoom[selectedRoomId].length > 0)) return null
    const list = messagesAllRoom[selectedRoomId];
    return convertMessagesByUser(list);
  }, [messagesAllRoom, selectedRoomId])

  useEffect(() => {
    // onLoadMoreMessage()
  }, [])

  useEffect(() => {
    if (wrapListRef.current && listRef.current && !isScrollToBottom) {
      wrapListRef.current.scrollIntoView({ block: 'end' })
      setIsScrollToBottom(true)
    } else {
      listRef.current?.scrollBy(0, 46 * 20)
    }
  }, [_messagesListMain])


  const onScrollList = (event: any) => {
    if (event.target.scrollTop === 0) onLoadMoreMessage()
  }

  const onLoadMoreMessage = () => {
    if (!selectedRoomId) return;
    const new_list: IMessage[] = loadMoreMessageFake('liem', selectedRoomId)
    dispatch(loadMoreMessage({ room_id: selectedRoomId, list: new_list }))
  }

  return (
    <div className="chatbox__messages" ref={listRef} onScroll={onScrollList}>
      <div className="chatbox__messages-wrap" ref={wrapListRef}>
        <CMessageMainList messagelist={_messagesListMain} />
      </div>
    </div>
  )
}


export default CConversation