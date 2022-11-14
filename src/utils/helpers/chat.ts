import { IKeyObject, IMessage, IRoom, IUserOnline } from "../types/Gateway";

export const convertRoomListByUserOnline = (usersOnline: IKeyObject<IUserOnline>) => {
  const rooms: IKeyObject<IRoom> = {}
  for (const key in usersOnline) {
    // if (!(key in rooms)) {
    //   rooms[key] = {
    //     id: usersOnline[key].client_id,
    //     name: usersOnline[key].user_id,
    //   }
    // }

  }
  return rooms;
}

export const createMessage = (
  client_id: string,
  server_id: string | null,
  sender_id: string,
  room_id: string,
  message: string,
  timestamp: number,
  attachments: string[] | null
) => {
  return {
    client_id, server_id, sender_id, room_id, message, timestamp, attachments
  } as IMessage
}