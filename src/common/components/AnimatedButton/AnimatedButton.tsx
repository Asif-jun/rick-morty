import React from 'react'
import styles from './AnimatedButton.module.css'

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  delay?: string
  children: React.ReactNode
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  delay = '0s',
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={styles.animatedButton}
      style={{ '--animation-delay': delay } as React.CSSProperties}
    >
      <span>{children}</span>
    </button>
  )
}
