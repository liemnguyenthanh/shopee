import React, { FC } from 'react'
import { MessageGroupByUser } from 'utils/types/Gateway'
import CMessageGroupByUser from '../message'


export type Props = {
  messagelist: MessageGroupByUser[] | null
}

export const CMessageMainList: FC<Props> = (props) => {
  const { messagelist } = props
  
  if (!messagelist) return <></>
  return (
    <React.Fragment>
      {
        messagelist.map((messageGroup: MessageGroupByUser) =>
          <CMessageGroupByUser messageGroup={messageGroup} key={messageGroup.key} />)
      }
    </React.Fragment>
  )
}

