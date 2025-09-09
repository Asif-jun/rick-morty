import React, { useEffect, useRef, useState } from 'react'
import s from './AnimatedButton.module.css'

type Props = {
  children: string
  onClick: () => void
  disabled?: boolean
}

export const AnimatedButton: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
}) => {
  const [displayText, setDisplayText] = useState<string>(children)
  const modeRef = useRef<'idle' | 'hover' | 'click'>('idle')
  const intervalRef = useRef<number | null>(null)

  // если children поменялся — вернуть оригинальный текст (если не анимируем)
  useEffect(() => {
    if (modeRef.current === 'idle') {
      setDisplayText(children)
    }
  }, [children])

  // очистка при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [])

  const symbols = [
    '#',
    '.',
    '^{',
    '-!',
    '#$_',
    '№:0',
    '#{+.',
    '@}-?',
    '?{4@%',
    '=.,^!',
    '?2@%',
    '\\;1}]',
    '?{%:%',
    '|{f[4',
    '{4%0%',
    "'1_0<",
    '{0%',
    "]>'",
    '4',
    '2',
  ]

  const startHover = () => {
    if (disabled) return
    if (modeRef.current === 'click') return // не перебиваем click
    modeRef.current = 'hover'

    let i = 0
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(() => {
      setDisplayText(symbols[i % symbols.length])
      i++
    }, 90) // скорость при hover
  }

  const stopHover = () => {
    if (modeRef.current === 'hover') {
      modeRef.current = 'idle'
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setDisplayText(children)
    }
  }

  const handleClick = () => {
    if (disabled) return
    modeRef.current = 'click'
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    let i = 0
    const len = symbols.length
    intervalRef.current = window.setInterval(() => {
      setDisplayText(symbols[i])
      i++
      if (i >= len) {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        modeRef.current = 'idle'
        setDisplayText(children)
      }
    }, 50) // скорость при клике

    onClick()
  }

  return (
    <button
      type='button'
      className={s.animatedButton}
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      onFocus={startHover}
      onBlur={stopHover}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {displayText}
    </button>
  )
}
