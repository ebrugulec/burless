import Head from 'next/head'

function HeadComponent() {
  return (
    <Head>
      <title>Burless | URL Shortener</title>
      {/*<link rel="shortcut icon" href="../public/favicon.ico" />*/}
      <meta content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />

      <script async src="https://www.googletagmanager.com/gtag/js?id=G-R1J2KL6YM1"></script>

      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-R1J2KL6YM1');
            `,
        }}
      />
    </Head>
  )
}

export default HeadComponent
