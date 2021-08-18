import { useState } from 'react';
import Head from "next/head";
import { Container } from "semantic-ui-react";
import Header from "./Header";
import HeadContent from "./HeadContent";
import Overlay from './Overlay';
import styles from '../../static/styles/layout.module.scss'

function Layout({ children, user }) {
  const [overlayHeight, setOverlayHeight] = useState("0%");

  function toggleOverlay(height){
    setOverlayHeight(height)
  }

  return (
    <div id={styles.layoutContainer}>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" /> */}
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@900&family=Montserrat&family=Merriweather&family=Noto+Sans+JP:wght@300&family=Rubik&family=Ubuntu:wght@300&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.typekit.net/uqi8xbk.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>Damaged Records</title>
      </Head>
      <Header id={styles.headerComponent} user={user} toggleOverlay={toggleOverlay} style={{zIndex:99}}/>
      <Overlay id={styles.overlayComponent} user={user} overlayHeight={overlayHeight} style={{zIndex:100}} toggleOverlay={toggleOverlay} />
      {/* <Container style={{ paddingTop: "1em" }}> */}
      <div id={styles.childrenComponent} >
        {children}
      </div>
      {/* </Container> */}
    </div>
  );
}

export default Layout;
