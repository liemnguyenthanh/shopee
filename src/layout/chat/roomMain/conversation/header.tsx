import { useSelector } from 'react-redux'
import { RootState } from '../../../../stores'

const CRoomHeader = () => {
  const { roomMain } = useSelector((state: RootState) => state.gateway)
  return (
    <div className="chatbox__room-title">{roomMain.room?.name}</div>
  )
} 

export default CRoomHeader
