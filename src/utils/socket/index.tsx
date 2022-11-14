/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { AppDispatch, RootState } from "../../stores";
import { setUser } from "../../stores/common/commonSlice";
import { clearEvent, receiveEventSocket } from "../../stores/gateway/gatewaySlice";
import { convertUrlToObject } from "../helpers";
import { EVENT_SOCKET } from "./event";

const url = 'http://localhost:1612';

const SocketProvider = () => {
  const [socket, setSocket] = useState<any>(null)
  const { event } = useSelector((state: RootState) => state.gateway)
  const { user } = useSelector((state: RootState) => state.common)
  const dispatch: AppDispatch = useDispatch();
  //fake user from params
  const { search } = useLocation()

  useEffect(() => {
    if (!socket && user) {
      const query = {
        "user_id": user.username
      }
      setSocket(io(url, { query }))
    }
  }, [user])

  useMemo(() => {
    const objectUrl = convertUrlToObject(search)
    if (objectUrl && 'username' in objectUrl) {
      dispatch(setUser(objectUrl.username))
    }
  }, [search])

  useEffect(() => {
    if (event) {
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
          console.log(`receive::::`, response);
          dispatch(receiveEventSocket(response))
        })
      }
    }
  }, [socket])

  if (event) console.log(`event::::`, event);
  return (
    <div className="socket"></div>
  )
}

export default SocketProvider
