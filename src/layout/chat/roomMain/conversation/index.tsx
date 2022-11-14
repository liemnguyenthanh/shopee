import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../stores'
import { IMessage } from '../../../../utils/types/Gateway'

const CConversation = () => {
  const { messagesAllRoom, selectedRoomId } = useSelector((state: RootState) => state.gateway)
  const { user } = useSelector((state: RootState) => state.common)
  console.log("roomMain", messagesAllRoom);

  return (
    <div className="chatbox__message-list">
      <div className="chatbox__wrap-list">
        {
          selectedRoomId &&
          messagesAllRoom[selectedRoomId] && messagesAllRoom[selectedRoomId].length > 0 &&
          messagesAllRoom[selectedRoomId].map((message: IMessage, index: number) =>
            <div className={`message message--${message.sender_id === user?.username ? 'right' : 'left'}`} key={index}>
              <div className={`message__wrap`}>
                {message.message}
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default CConversation