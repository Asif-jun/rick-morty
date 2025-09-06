import s from './SearchBox.module.css'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
}

export const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const circles = Array.from({ length: 25 }) // 25 кружков glow

  return (
    <div className={s.searchWrapper}>
      <input
        type='text'
        placeholder='Search characters...'
        value={value}
        onChange={e => onChange(e.target.value)}
        className={s.searchInput}
      />

      <div className={s.searchGlow}>
        {circles.map((_, idx) => {
          const size = Math.floor(Math.random() * 8 + 4) // размер 4–12px
          const top = Math.floor(Math.random() * 40) // позиция сверху
          const left = Math.floor(Math.random() * 95) // позиция слева %
          const delay = Math.random() * 4 // задержка анимации сек

          return (
            <div
              key={idx}
              className={s.circle}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}px`,
                left: `${left}%`,
                animationDelay: `${delay}s`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
