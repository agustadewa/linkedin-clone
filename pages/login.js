import Link from "next/link";
import {auth, googleAuthProvider} from "../firebase";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {doLogin} from "../states/reducer/userSlice";
import Router from "next/router";
import {addAccount, getAccount} from "../firestore/accounts";
// import Router from "next/router";

export default function Login() {
    let [EmailField, setEmailField] = useState("")
    let [PasswordField, setPasswordField] = useState("")
    const emailFieldListener = (el) => setEmailField(el.currentTarget?.value);
    const passwordFieldListener = (el) => setPasswordField(el.currentTarget?.value);

    const dispatch = useDispatch();

    const goToMainPage = () => Router.push("/");

    async function dispatchUser(userAuth, accountID) {
        await dispatch(doLogin({
            uid: userAuth.uid,
            name: userAuth.user.displayName,
            email: userAuth.user.email,
            photoURL: userAuth.user.photoURL,
            accountID: accountID
        }));
    }

    async function doLoginWithGoogle() {
        try {
            const userAuth = await auth.signInWithPopup(googleAuthProvider)

            const currentAccount = await getAccount(userAuth.user.uid);
            if (!currentAccount.exists) {
                await addAccount({
                    uid: userAuth.user.uid,
                    photoURL: userAuth.user.photoURL
                })
            }

            await dispatchUser(userAuth, currentAccount.id)
            await goToMainPage()
        } catch (err) {
            console.log(err)
        }
    }

    async function doLoginWithEmail() {
        try {
            const userAuth = await auth.signInWithEmailAndPassword(EmailField, PasswordField)
            await dispatchUser(userAuth)
            await goToMainPage()
        } catch (err) {
            console.log(err)
        }
    }

    return <>
        <div className="bg-[#F3F2EF] min-h-screen">
            <div className="text-center py-6">
                <img className="mx-auto" width="140px" alt="linkedin logo"
                     src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
                />
                <div className="text-3xl py-5">
                    Make the most of your professional life
                </div>

                <div className="flex flex-row justify-center">
                    <form className="p-6 rounded-lg bg-white flex flex-col text-left space-y-1 w-96">
                        <label className="text-sm text-gray-500/90">Email</label>
                        <input onChange={emailFieldListener}
                               type="text"
                               className="focus:outline-none border border-gray-800 p-1 focus:ring-1
                                          ring-gray-700/90 rounded-md text-sm text-gray-700 px-2"/>

                        <label className="text-sm text-gray-500/90">Password</label>
                        <input onChange={passwordFieldListener}
                               type="password"
                               className="focus:outline-none border border-gray-800 p-1 focus:ring-1
                                          ring-gray-700/90 rounded-md text-sm text-gray-700 px-2"/>

                        <div className="py-4">
                            <div onClick={doLoginWithEmail}
                                 className="py-3 bg-[#0a66c2] hover:bg-[#004182] text-center text-white text-md
                                        font-medium rounded-full ease-in duration-100 cursor-pointer">
                                Sign In
                            </div>
                        </div>

                        <div className="grid grid-rows-3 grid-cols-12 pb-4 flex flex-row justify-center
                                        text-black/70 space-x-2">
                            <div className="row-span-2 col-span-5 border-b-2 w-full"/>
                            <div className="row-span-3 text-black/90 col-span-2 justify-self-center self-stretch">
                                or
                            </div>
                            <div className="row-span-2 col-span-5 border-b-2 w-full"/>
                        </div>

                        <div onClick={doLoginWithGoogle}
                             className="flex flex-row justify-center space-x-3 py-3 border border-blue-800 bg-white
                                        hover:bg-[#ECF4FE] text-center hover:ring-1 ring-blue-600 rounded-full
                                        ease-in duration-100 cursor-pointer">
                            <img width="20" className="my-auto"
                                 src="https://cdn.iconscout.com/icon/free/png-512/google-91-93413.png"/>
                            <div className="text-md font-medium text-blue-600">Join with Google</div>
                        </div>

                        <div className="py-1 text-md text-center">
                            Don't have account? <Link href="/signup">
                            <a className="font-medium text-blue-700/90 hover:underline">Sign up</a></Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </>
}