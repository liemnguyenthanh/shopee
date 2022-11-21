import { IMessage, MessageGroupByUser } from "../types/Gateway";
import { v4 as randomV4 } from 'uuid'
import { IUser } from "utils/types/Users";
import { randomNameGenerator } from ".";

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

const createMessagesByUser = (user: IUser, message_group: IMessage[]) => ({ user: { ...user }, message_group, key: randomV4() })
/**
 * Returns x raised to the n-th power.
 *
 * @param {list} message_list.
 * @return {group_list} group message by user.
 * example :
 * input: [{sender_id : 1, .....}, {sender_id : 1, .....}, {sender_id : 2, .....}]
 * output: [{user: {sender_id: 1,...}, message_group : [{....}, {....}]},
 *          {user: {sender_id: 2,...}, message_group : [{....}]}]
 */
export const convertMessagesByUser = (list: IMessage[]) => {
  let new_list: MessageGroupByUser[] = [];
  let messages_user: MessageGroupByUser = { user: null, key: null, message_group: null };

  list.forEach((item, index) => {
    if (!messages_user.user) {
      messages_user = createMessagesByUser({ username: item.sender_id }, [])
    }

    if (messages_user.user && messages_user.user.username === item.sender_id && messages_user.message_group) {
      messages_user.message_group.push(item)
    } else {
      new_list.push(messages_user)
      messages_user = createMessagesByUser({ username: item.sender_id }, [item])
    }

    if (list.length - 1 === index) {
      new_list.push(messages_user)
    }
  });
  return new_list;
}
/* 
**** TH1: merge bên trên
- lấy phần từ đầu 
- reverse list message để duyệt từ dưới lên
- loop message
-> kiểm tra cùng user thì push message
-> dừng khi khác user và convertMessagesByUser số phần tử còn lại 
=>>> concat list mới vào list cũ  
**** TH2: merge bên dưới
*/
export const mergeMessagesByUser = (newList: IMessage[], list: MessageGroupByUser[], isLoadMore = false) => {
  if (isLoadMore) newList = newList.reverse()
  const element = isLoadMore ? list[0] : list[list.length - 1]
  const newListCopy = [...newList]

  for (let index = 0; index < newList.length; index++) {
    if (newList[index].sender_id === element.user?.username && element.message_group) {
      newListCopy.splice(0, 1)
      element.message_group = isLoadMore ? [newList[index], ...element.message_group] : [...element.message_group, newList[index]]
    } else break;
  }

  if (newListCopy.length > 0)
    list = isLoadMore ? 
      convertMessagesByUser(newListCopy).concat(list) : 
      list.concat(convertMessagesByUser(newListCopy))

  return list
}

export const loadMoreMessageFake = (username: string, room_id: string) => {
  const list: IMessage[] = []
  let message: IMessage = {
    client_id: randomV4(),
    server_id: null,
    sender_id: username,
    room_id,
    timestamp: new Date().getTime(),
    attachments: null,
    message: ''
  }

  for (let index = 0; index < 20; index++) {
    message.client_id = randomV4()
    message.message = randomNameGenerator(5) + ' ' + (index + 1)

    list.push({ ...message })
  }
  return list
}