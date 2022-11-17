import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'stores'
import { sendEventSocket } from 'stores/gateway/gatewaySlice'
import { createMessage } from 'utils/helpers/chat'
import { IMessage } from 'utils/types/Gateway'
import { v4 as random } from 'uuid';

const CChatInput = () => {
  const { selectedRoomId } = useSelector((state: RootState) => state.gateway)
  const { user } = useSelector((state: RootState) => state.common)
  const dispatch: AppDispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null);

  const onHandleSendMessage = () => {
    if (!user) throw new Error("Not found user to send message!");
    if (!selectedRoomId) throw new Error("Not found room id to send message!");
    if (inputRef.current?.value.trim()) {
      let { value } = inputRef.current
      const request_message: IMessage = createMessage(
        random(), null, user.username, selectedRoomId, value, new Date().getTime(), null
      )
      console.log({request_message});
      dispatch(sendEventSocket({ 'SEND_MESSAGE': request_message }));
      inputRef.current.value = '';
    }
  }

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onHandleSendMessage()
  }
  return (
    <div className="chatbox__form">
      <input ref={inputRef} type="text" className="chatbox__input" onKeyDown={onEnter} />
      <div className="chatbox__form-action">
        <div className="chatbox__icons">
          a
        </div>
        <button className="chatbox__sent"
          onClick={onHandleSendMessage}
        >
          send
        </button>
      </div>
    </div>
  )
}

export default CChatInput

function v4(): any {
  throw new Error('Function not implemented.')
}
