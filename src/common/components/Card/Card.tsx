import React from 'react'
import c from './Card.module.css'

type CardProps = {
  title: string
  details: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ title, details }) => {
  return (
    <div className={c.card}>
      <div className={c.title}>{title}</div>
      <div className={c.details}>{details}</div>
    </div>
  )
}
