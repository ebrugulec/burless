import Head from 'next/head'

function HeadComponent() {
  return (
    <Head>
      <title>Burless | URL Shortener</title>
      <link rel="shortcut icon" href="../public/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  )
}

export default HeadComponent