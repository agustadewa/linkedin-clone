import {useSelector} from "react-redux";
import {selectUser} from "/redux/reducer/userSlice";

export function CardProfile(){
    const userState = useSelector(selectUser)

    return <>
        <div className="rounded-md ring-gray-300 bg-white ring-1">
            <img className="rounded-t-md" src="https://static-exp1.licdn.com/sc/h/9e0ckeb27mzi70ne80f4hv7il"
                 alt=""/>
            <img width="80" className="-mt-11 mx-auto rounded-full"
                 src={userState.photoURL}
                 alt=""/>

            <div className="text-center mb-2">
                <div className="font-medium">{userState.displayName}</div>
                <div className="font-light text-sm text-gray-600">{userState.email}</div>
            </div>

            <div className="border-b border-gray-200"/>

            <div className="py-2">
                <div className="flex justify-between px-3 font-normal text-sm text-gray-400">
                    <p>Who viewed your profile</p>
                    <p className="text-blue-500 font-medium">190</p>
                </div>
                <div className=" flex justify-between px-3 font-normal text-sm text-gray-400">
                    <p>Views on post</p>
                    <p className="text-blue-500 font-medium">696</p>
                </div>
            </div>
        </div>
    </>
}
