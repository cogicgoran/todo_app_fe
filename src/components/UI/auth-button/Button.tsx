import { ReactChild } from 'react'

interface Props {
    children: ReactChild ;
    className?: string;
    type?: 'submit' | 'button' | 'reset';

}

function Button({children, className, type = 'button'}: Props) {
  return (
    <button className={className} type={type}>{children}</button>
  )
}

export default Button