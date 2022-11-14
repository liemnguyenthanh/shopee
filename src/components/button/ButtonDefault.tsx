import { PropsWithChildren } from 'react'

export interface ButtonDefaultProps extends PropsWithChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {
  typeBtn: 'main' | 'outline-main'
}

const ButtonDefault = ({ children, typeBtn, ...props }: ButtonDefaultProps) => {
  return (
    <button className={`c-btn c-btn--${typeBtn}`} {...props}>
      {children}
    </button>
  )
}

ButtonDefault.defaultProps = {
  typeBtn: 'main'
}

export default ButtonDefault;