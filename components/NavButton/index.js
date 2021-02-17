import Link from 'next/link'

const Index = (props) => (
  <Link href={props.path} as={props.path} prefetch>
    <div>
      {console.log('path', props.path)}

      {/*<div className={style.Icon}>{props.icon}</div>*/}
      <span>{props.label}</span>
    </div>
  </Link>
)

export default Index
