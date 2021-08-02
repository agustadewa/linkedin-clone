import HeaderBar from "/components/HeaderBar";
import AppBody from "/components/AppBody";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {doLogin, doLogout, selectUser} from "/redux/reducer/userSlice";
import React, {useEffect} from "react";
import {auth} from "/firebase";

export default function Home() {
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);
  const Router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(doLogin({
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoURL: userAuth.photoURL
        }));

      } else {
        dispatch(doLogout());
        Router.push("/login");
      }
    })
  }, [])

  return <>
    {/* prevent flickering */}
    {userState ? <>
      <div>
        <HeaderBar/>
        <AppBody/>
      </div>
    </> : null}

  </>;
}
