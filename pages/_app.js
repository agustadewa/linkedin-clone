import '/styles/globals.css'
import {useEffect} from "react";
import {Provider} from "react-redux";
import store from "/redux/store/store";

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
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default App
