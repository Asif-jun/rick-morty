// NotFound.tsx
import s from './NotFound.module.css'

type NotFoundProps = {
  type?: 'character' | 'location' | 'episode' | 'network'
  message?: string
}

const messages: Record<string, string> = {
  character: 'Character not found',
  location: 'Location not found',
  episode: 'Episode not found',
  network: 'Network error',
}

export const NotFound = ({ type, message }: NotFoundProps) => {
  const displayMessage = message || (type ? messages[type] : 'NOT FOUND')

  return (
    <div className={s.main_wrapper}>
      <div className={s.main}>
        {/* Антенна */}
        <div className={s.antenna}>
          <div className={s.antenna_shadow}></div>
          <div className={s.a1}></div>
          <div className={s.a1d}></div>
          <div className={s.a2}></div>
          <div className={s.a2d}></div>
          <div className={s.a_base}></div>
        </div>

        {/* Телевизор */}
        <div className={s.tv}>
          <div className={s.display_div}>
            <div className={s.screen_out1}>
              <div className={s.screen}>
                <div className={s.notfound_wrapper}>
                  <span className={s.notfound_text}>{displayMessage}</span>
                </div>
              </div>
              <div className={s.screenM}></div>
            </div>
          </div>

          <div className={s.lines}>
            <div className={s.line1}></div>
            <div className={s.line2}></div>
            <div className={s.line3}></div>
          </div>

          <div className={s.buttons_div}>
            <div className={s.b1}>
              <div></div>
            </div>
            <div className={s.b2}></div>
            <div className={s.speakers}>
              <div className={s.g1}>
                <div className={s.g11}></div>
                <div className={s.g12}></div>
                <div className={s.g13}></div>
              </div>
              <div className={s.g}></div>
              <div className={s.g}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
