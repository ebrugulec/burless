import Head from 'next/head'
import Header from './Header/Header'
import NavBar from './NavBar/NavBar'
import navButtons from '../../config/buttons'

const Layout = (props) => {
  const appTitle = 'Burless'
  return (
    <div>
      <Head>
        <title>Burless</title>
      </Head>
      <div className="row">
        <div className={'col-3 ' + ''}>
          <Header appTitle={appTitle} />
          <NavBar navButtons={navButtons} />
        </div>
        <div className="col-9">
          <div className="Content">{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
