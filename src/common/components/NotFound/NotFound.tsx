import s from './NotFound.module.css'

type NotFoundProps = {
  message?: string
}

export const NotFound = ({ message }: NotFoundProps) => {
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
          <div className={s.cruve}>
            <svg
              className={s.curve_svg}
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 189.929 189.929'
            >
              <path d='M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13 C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z' />
            </svg>
          </div>

          <div className={s.display_div}>
            <div className={s.screen_out}>
              <div className={s.screen_out1}>
                <div className={s.screen}>
                  <div className={s.notfound_wrapper}>
                    <span className={s.notfound_text}>
                      {message || 'NOT FOUND'}
                    </span>
                  </div>
                </div>
                <div className={s.screenM}></div>
              </div>
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
