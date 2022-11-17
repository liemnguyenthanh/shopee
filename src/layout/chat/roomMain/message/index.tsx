import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'stores'
import { MessageGroupByUser } from 'utils/types/Gateway'

export type Props = {
  messageGroup: MessageGroupByUser
}

const CMessageGroupByUser: FC<Props> = ({ messageGroup }) => {
  const { user } = useSelector((state: RootState) => state.common)
  let isYourself: boolean = messageGroup.user?.username === user?.username
  if (!user?.username || !messageGroup.user) return <></>

  return (
    <div className={`message__wrap`}>
      <div className="message__info">
        <div className={`message__info-wrap ${isYourself ? 'message__info-wrap--me' : 'message__info-wrap--not-me'}`}>
          {messageGroup.user.username}
        </div>
      </div>
      <div className="message__list">
        {messageGroup.message_group?.map((message) => (
          <div key={message.client_id} className={`message__item message__item--${isYourself ? 'right' : 'left'}`}>{message.message}</div>
        ))}
      </div>
    </div>
  )
}

export default CMessageGroupByUser
