import React from 'react'
import ChatHeader from '../../assets/images/svg/ChatHeader'
import CollapseDown from '../../assets/images/svg/CollapseDown'
import CollapseRight from '../../assets/images/svg/CollapseRight'

const CHeaderChat = ({ onHandleCollapseDown }: any) => {
  return (
    <div className="chatbox__header">
      <div className="chatbox__title">
        <div className="chatbox__title-icon">
          <ChatHeader />
        </div>
        <div className="chatbox__unread">(2)</div>
      </div>
      <div className="chatbox__action">
        <div className="chatbox__collapse chatbox__collapse--right">
          <CollapseRight />
        </div>
        <div className="chatbox__collapse chatbox__collapse--down" onClick={() => onHandleCollapseDown()}>
          <CollapseDown />
        </div>
      </div>
    </div>
  )
}

export default CHeaderChat
