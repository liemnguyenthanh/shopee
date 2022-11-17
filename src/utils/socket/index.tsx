/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "services/api";
import { AppDispatch, RootState } from "stores";
import { setUser } from "stores/common/commonSlice";
import { clearEvent, receiveEventSocket } from "stores/gateway/gatewaySlice";
import { convertUrlToObject } from "../helpers";
import { EVENT_SOCKET } from "./event";


const SocketProvider = () => {
  const [socket, setSocket] = useState<Socket>()
  const { event } = useSelector((state: RootState) => state.gateway)
  const { user } = useSelector((state: RootState) => state.common)
  const { search } = useLocation() //fake user from params:: ?username=example
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!socket && user) {
      const query = {
        "user_id": user.username
      }
      setSocket(io(SOCKET_URL, { query }))
    }
  }, [user])

  useEffect(() => {
    const objectUrl = convertUrlToObject(search)
    if (objectUrl && 'username' in objectUrl) {
      dispatch(setUser(objectUrl.username))
    }
  }, [search])

  useEffect(() => {
    if (event && socket) {
      for (let key in event) {
        socket.emit(key, event[key])
        dispatch(clearEvent('event'))
      }
    }
  }, [event])

  useEffect(() => {
    if (socket) {
      for (const key in EVENT_SOCKET) {
        socket.on(key, (response: any) => {
          dispatch(receiveEventSocket(response))
        })
      }
    }
  }, [socket])

  return (
    <div className="socket"></div>
  )
}

export default SocketProvider
