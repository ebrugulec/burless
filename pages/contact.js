import Layout from '../components/Layout'
import React from 'react'
import cookies from "next-cookies";
import '../styles/Contact.scss'

export default function Contact () {
  return (
    <Layout>
      <div className="envelope">
        <div id="e1"></div>
        <div id="e2"></div>
        <p>You can let us know your suggestions and comments from <span>contact@burless.com</span><br />
          Thanks for using burless.</p>
      </div>
    </Layout>
  )
}
