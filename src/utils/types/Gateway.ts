export interface IKeyObject<T> {
  [key: string]: T
}

export interface GatewayState {
  event: IKeyObject<any> | null,
  receive: IKeyObject<any> | null,
  roomList: IRoom[],
  usersOnline: IKeyObject<IUserOnline> | null,
  newMessage: IMessage | null,
  selectedRoomId: string | null,
  roomMain: IRoomMain,
  messagesAllRoom: IKeyObject<IMessage[]>,
}

export interface IRoomMain {
  room: IRoom | null,
  messageList: any
}

export interface IRoom {
  id: string,
  name: string,
  users: string[]
  lastMessage: string,
}

export interface IUserOnline {
  user_id: string,
  client_id: string,
}

export interface IMessage {
  client_id: string,
  server_id: string | null,
  sender_id: string,
  room_id: string,
  message: string,
  timestamp: number,
  attachments: string[] | null
}

export interface ResponseSocket {
  key: string,
  data: any,
}
