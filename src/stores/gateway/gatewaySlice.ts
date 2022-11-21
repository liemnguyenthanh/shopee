import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwapItemInArray } from 'utils/helpers';
import { convertMessagesByUser, mergeMessagesByUser } from 'utils/helpers/chat';
import { GatewayState, IKeyObject, IMessage, ResponseSocket } from 'utils/types/Gateway';
import { fetchRoomListThunk } from './gatewayThunk';

const initialState: GatewayState = {
  event: null,
  receive: null,
  roomList: [],
  usersOnline: null,
  newMessage: null,
  selectedRoomId: null,
  roomMain: {
    room: null,
    messageList: []
  },
  messagesAllRoom: {}
};

export const gatewaySlice = createSlice({
  name: 'gateway',
  initialState,
  reducers: {
    sendEventSocket: (state, action: PayloadAction<IKeyObject<any>>) => {
      state.event = action.payload
    },
    receiveEventSocket: (state, action: PayloadAction<ResponseSocket>) => {
      const { data, key } = action.payload
      state[key as keyof GatewayState] = data
      // xử lý tạm thay thế list room vì chưa có đăng kí user
      if (key === 'usersOnline') {
        // state.roomList = convertRoomListByUserOnline(data)
      }

      if (key === 'newMessage') {
        // state.messageListMain.push(data)
        if (data.room_id === state.selectedRoomId) {
          state.roomMain.messageList.push(data)
        }
        if (data.room_id in state.messagesAllRoom) {
          state.messagesAllRoom[data.room_id] = mergeMessagesByUser([data], state.messagesAllRoom[data.room_id])
        } else {
          state.messagesAllRoom[data.room_id] = convertMessagesByUser([data]);
        }

        const roomIndex = state.roomList.findIndex(d => d.id === data.room_id)
        if (roomIndex !== -1)
          state.roomList[roomIndex].lastMessage = data.message
        state.roomList = SwapItemInArray(state.roomList, 0, roomIndex)
      }
    },
    loadMoreMessage: (state, action: PayloadAction<{ room_id: string, new_list: IMessage[] }>) => {
      const { room_id, new_list } = action.payload;
      if (room_id in state.messagesAllRoom) {
        state.messagesAllRoom[room_id] = mergeMessagesByUser(new_list, state.messagesAllRoom[room_id], true)
      } else {
        // state.messagesAllRoom[room_id] = new_list
      }
    },
    clearEvent: (state, action: PayloadAction<"event" | "receive">) => {
      state[action.payload as "event" | "receive"] = null
    },
    selectRoom: (state, action: PayloadAction<string>) => {
      state.selectedRoomId = action.payload
      const room = state.roomList.find(d => d.id === action.payload)
      if (room) state.roomMain.room = room
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRoomListThunk.fulfilled, (state, action) => {
        console.log('fetchRoomListThunk', action.payload.data);
        state.roomList = action.payload.data
      })
});

export const {
  sendEventSocket,
  receiveEventSocket,
  clearEvent,
  selectRoom,
  loadMoreMessage
} = gatewaySlice.actions;
export default gatewaySlice.reducer;