import '../styles/globals.css'
import {useEffect} from "react";
import {Provider, useSelector} from "react-redux";
import store from "../states/store/store";
import Router from "next/router";
import {selectUser} from "../states/reducer/userSlice";

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