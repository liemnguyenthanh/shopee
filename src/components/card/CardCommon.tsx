import { PropsWithChildren } from "react";

function CardCommon({
  children
}: PropsWithChildren) {

  return (
    <div className="card">
      {children}
    </div>
  )
}
export default CardCommon;