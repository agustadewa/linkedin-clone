import '/styles/globals.css'
import React, {useEffect} from "react";
import {Provider} from "react-redux";
import store from "/redux/store/store";
import Head from "next/head";

function App({Component, pageProps}) {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
          .register("/sw.js")
          .then(
              registration => console.log("Service Worker registration successful with scope: ", registration.scope),
              err => console.log("Service Worker registration failed: ", err)
          );
    }
  }, [])


  return <>
    <Head>
      <title>Linkedin Clone</title>
      <meta name="google-signin-client_id" content="974034574666-21hf2stbaaf881jtfut3dj44ccqh0kdg.apps.googleusercontent.com"/>
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default App
