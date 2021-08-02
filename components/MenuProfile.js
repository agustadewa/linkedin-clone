import {ArrowDropDown} from "@material-ui/icons";
import {Menu, Transition} from "@headlessui/react";
import React from "react";
import Router from "next/router"
import {useDispatch, useSelector} from "react-redux";
import {selectUser, doLogout} from "../redux/reducer/userSlice";
import {auth} from "../firebase";

export default function MenuProfile() {
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();

  async function signOut(){
    await auth.signOut()
  }

  return <>
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex flex-col mx-auto my-auto pt-2 cursor-pointer text-gray-500 hover:text-black">
        <img width="24" className="mx-auto rounded-full" src={userState.photoURL} alt=""/>
        <div className="flex flex-row mx-auto">
          <p className="text-xs font-normal">Me</p>
          <ArrowDropDown className="-ml-1 -mt-1" fontSize="medium"/>
        </div>
      </Menu.Button>
      <Transition
          as={React.Fragment}
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
      >
        <Menu.Items
            className="absolute right-0 mt-3 origin-top-right bg-white divide-y divide-gray-100 rounded-md rounded-tr-none
                       min-w-max shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">


          {/* Profile */}
          <div className="p-2 flex flex-col space-y-2">
            <div className="flex flex-row space-x-2 pb-1">
              <div className="my-auto">
                <img width="45" className="rounded-full" src={userState.photoURL} alt=""/>
              </div>
              <div className="">
                <div className="text-md">{userState.displayName}</div>
                <div className="text-sm text-gray-500">-</div>
              </div>
            </div>
            <button className="w-full px-2 border border-blue-700 text-blue-600 font-bold
                               hover:ring-1 hover:ring-inset hover:ring-blue-500 hover:bg-blue-400/20 rounded-full text-sm">
              View Profile
            </button>
          </div>


          {/* Account */}
          <div className="p-2 px-3">
            <div className="text-md font-bold">Account</div>
            <Menu.Item as="button" className="w-full text-left text-sm text-gray-500">Settings & Privacy</Menu.Item>
            <Menu.Item as="button" className="w-full text-left text-sm text-gray-500">Help</Menu.Item>
            <Menu.Item as="button" className="w-full text-left text-sm text-gray-500">Language</Menu.Item>
          </div>

          {/* Manage */}
          <div className="p-2 px-3">
            <div className="text-md font-bold">Manage</div>
            <Menu.Item as="button" className="w-full text-left text-sm text-gray-500">Posts & Activity</Menu.Item>
            <Menu.Item as="button" className="w-full text-left text-sm text-gray-500">Job Posting Account</Menu.Item>
          </div>

          {/* Sign Out */}
          <Menu.Item as="button" onClick={signOut} className="p-2 px-3 text-sm w-full text-left text-gray-500">Sign Out</Menu.Item>

        </Menu.Items>
      </Transition>
    </Menu>
  </>
}
