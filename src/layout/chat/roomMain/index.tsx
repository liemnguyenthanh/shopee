import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores'
import CChatInput from './chatInput'
import CConversation from './conversation'
import CRoomHeader from './conversation/header'
const url_bg_img = 'https://deo.shopeemobile.com/shopee/shopee-seller-live-vn/chateasy/6abdc0872a25853b36d17e7498335326.png'

const CRoomMain = () => {
  const { roomMain } = useSelector((state: RootState) => state.gateway)
  if (!roomMain.room) {
    return (
      <div className='chatbox__room-main chatbox__room-main--no-room'>
        <img className='chatbox__room-img' src={url_bg_img} alt="bg" />
        <p>Xin chào!</p>
      </div>
    )
  }

  return (
    <div className="chatbox__room-main">
      <CRoomHeader />
      <CConversation />
      <CChatInput />
    </div>
  )
}

export default CRoomMain

