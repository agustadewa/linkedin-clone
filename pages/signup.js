import Link from "next/link";
import {auth} from "../firebase";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {doLogin} from "../states/reducer/userSlice";
import Router from "next/router";
import {addAccount} from "../firestore/accounts";

export default function SignUp() {
    let [NameField, setNameField] = useState("")
    let [EmailField, setEmailField] = useState("")
    let [PasswordField, setPasswordField] = useState("")
    const nameFieldListener = (el) => setNameField(el.currentTarget?.value);
    const emailFieldListener = (el) => setEmailField(el.currentTarget?.value);
    const passwordFieldListener = (el) => setPasswordField(el.currentTarget?.value);

    const dispatch = useDispatch();

    const goToMainPage = () => Router.push("/");

    async function doRegister() {
        try {
            const createdUser = await auth.createUserWithEmailAndPassword(EmailField, PasswordField);
            const account = await addAccount({
                uid: createdUser.user.uid,
                photoURL: createdUser.user.photoURL
            })
            await createdUser.user.updateProfile({
                displayName: NameField,
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3NvxOiEXe0UskjqMBaXIHHDD2wQEYeh-BnVRrBsTsDbLfE-L0iK6tHrcBFHI5iZQ1i4o&usqp=CAU"
            });
            await dispatch(doLogin({
                uid: createdUser.user.uid,
                displayName: createdUser.user.displayName,
                accountID: account.id,
                email: createdUser.user.email,
                photoURL: createdUser.user.photoURL
            }));
            await goToMainPage();

        } catch (err) {
            console.log("ERROR -->", err);
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


                        <label className="text-sm text-gray-500/90">Full Name</label>
                        <input onChange={nameFieldListener}
                               type="text"
                               className="focus:outline-none border border-gray-800 p-1 focus:ring-1
                                          ring-gray-700/90 rounded-md text-sm text-gray-700 px-2"/>

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

                        <div className="text-gray-500/90 text-xs p-3 text-center mx-auto">
                            By clicking Agree & Join, you agree to the LinkedIn <a
                            href="#" className="font-medium text-blue-700/90 hover:underline">
                            User Agreement</a>, <a href="#" className="font-medium text-blue-700/90 hover:underline">
                            Privacy Policy</a>, and <a href="#"
                                                       className="font-medium text-blue-700/90 hover:underline">
                            Cookie Policy</a>.
                        </div>

                        <div onClick={doRegister}
                             className="py-3 bg-[#0a66c2] hover:bg-[#004182] text-center text-white text-md
                                        font-medium rounded-full ease-in duration-100 cursor-pointer">
                            Agree & Join
                        </div>

                        <div className="grid grid-rows-3 grid-cols-12 py-4 flex flex-row justify-center
                                        text-black/70 space-x-2">
                            <div className="row-span-2 col-span-5 border-b-2 w-full"/>
                            <div className="row-span-3 text-black/90 col-span-2 justify-self-center self-stretch">or
                            </div>
                            <div className="row-span-2 col-span-5 border-b-2 w-full"/>
                        </div>

                        <div className="py-1 text-md text-center">
                            Already on LinkedIn? <Link href="/login">
                            <a className="font-medium text-blue-700/90 hover:underline">Sign in</a></Link>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </>
}