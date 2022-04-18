import { useState } from 'react';
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import HeadContent from "./HeadContent";
import Overlay from './Overlay';

function Layout({ children, user }) {
  const [overlayHeight, setOverlayHeight] = useState("0%");

  function toggleOverlay(height){
    setOverlayHeight(height)
  }

  return (
    <div id="melted-wax">
      <Head>
        <HeadContent />
        
        <title>Melted Wax Records</title>
      </Head>
      {/* <body> */}
        <Header user={user} toggleOverlay={toggleOverlay} style={{zIndex:99}}/>
        <Overlay user={user} overlayHeight={overlayHeight} style={{zIndex:100}} toggleOverlay={toggleOverlay} />
        <div id="layout">
          {children}
        </div>
        <Footer />
      {/* </body> */}
    </div>
  );
}

export default Layout;
