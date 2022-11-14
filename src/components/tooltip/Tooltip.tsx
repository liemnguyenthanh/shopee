import { PropsWithChildren, useEffect, useRef, useState } from 'react'
export interface TooltipProps extends PropsWithChildren {
  Component: React.ReactNode
}

const Tooltip = ({ children, Component }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [styleWrap, setStyleWrap] = useState<any>({})

  useEffect(() => {
    if (tooltipRef.current) {
      setStyleWrap({
        top: `${tooltipRef.current.clientHeight + 10}px`,
        right: `calc(50% - 25px)`
      })
    }
  }, [])

  return (
    <div className='tooltip'>
      <div className="tooltip__title" ref={tooltipRef}>
        {children}
      </div>
      <div className="tooltip__wrap" style={styleWrap}>
        {Component}
      </div>
    </div>
  )
}

export default Tooltip
