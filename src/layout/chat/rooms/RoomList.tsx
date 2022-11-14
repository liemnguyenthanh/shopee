import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../stores'
import { selectRoom } from '../../../stores/gateway/gatewaySlice'
import { IRoom } from '../../../utils/types/Gateway'
const url = 'https://cf.shopee.vn/file/a54ee33917fe0607c3c2229ac688845f_tn'

const CRoomList = () => {
  const { roomList, selectedRoomId } = useSelector((state: RootState) => state.gateway)
  const { user } = useSelector((state: RootState) => state.common)
  const dispatch: AppDispatch = useDispatch();

  const onHandleSelectRoom = (roomId: string) => {
    console.log(roomId);
    
    if (selectedRoomId === roomId) return;
    dispatch(selectRoom(roomId))
  }

  if (roomList.length === 0) return <></>;
  return (
    <div className="chatbox__rooms">
      {
        roomList.map((room: IRoom, index: number) => {
          if (room.name !== user?.username) {
            return <div
              className={`room-item ${room.id === selectedRoomId ? 'room-item--active' : ''}`}
              key={index}
              onClick={() => onHandleSelectRoom(room.id)}
            >
              <img className="room-item__img" alt='avatar' src={url} />
              <div className="room-item__user">
                <div className="room-item__name">{room?.name}</div>
                <div className="room-item__last-message">
                  {room?.lastMessage}
                </div>
              </div>
            </div>
          }
          return <></>
        }
        )
      }
    </div >
  )
}

export default CRoomList
