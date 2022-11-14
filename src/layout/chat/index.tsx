import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../stores'
import { fetchRoomListThunk } from '../../stores/gateway/gatewayThunk'
import CHeaderChat from './header'
import CIconChatbox from './icon'
import CRoomList from './rooms/RoomList'
import CRoomMain from './roomMain'

const ChatBox = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getInit = () => { 
    dispatch(fetchRoomListThunk())
  }

  const onHandleCollapseDown = () => {
    if (!chatRef.current) return

    const chat_main = chatRef.current.querySelector('.chatbox__main')
    const chat_icon = chatRef.current.querySelector('.chatbox__icon')
    if (!chat_main || !chat_icon) return;

    let is_toggle = chat_main.classList.contains('chatbox__main--close')
    chat_main.classList.toggle('chatbox__main--close', !is_toggle)
    chat_icon.classList.toggle('chatbox__icon--close', is_toggle)
  }

  return (
    <div className='chatbox' ref={chatRef}>
      <div className={`chatbox__main`}>
        <CHeaderChat onHandleCollapseDown={onHandleCollapseDown} />
        <div className="chatbox__wrapper">
          <CRoomMain />
          <CRoomList />
        </div>
      </div>
      <CIconChatbox onHandleCollapseDown={onHandleCollapseDown} />
    </div>
  )
}

export default ChatBox