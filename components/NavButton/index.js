import Link from 'next/link'

import style from './NavButton.module.scss'

const Index = props => (
  <Link href={props.path}>
    <div className={style.NavButton}>
      {console.log('path', props.path)}

      {/*<div className={style.Icon}>{props.icon}</div>*/}
      <span className={style.Label}>{props.label}</span>
    </div>
  </Link>
)

export default Index
