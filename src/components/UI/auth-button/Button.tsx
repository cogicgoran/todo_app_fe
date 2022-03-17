import { ReactChild } from 'react'

interface Props {
  children: ReactChild;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: true | false;
}

function Button({ children, className, type = 'button', disabled }: Props) {
  return (
    <button className={className} type={type} disabled={disabled}>{children}</button>
  )
}

export default Button