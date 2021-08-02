import {Apps, BusinessCenter, Chat, Home, Notifications, Search, SupervisorAccount} from "@material-ui/icons";
import MenuHeader from "./MenuHeader";
import MenuProfile from "./MenuProfile";
import {useSelector} from "react-redux";
import {selectUser} from "/redux/reducer/userSlice";

export default function HeaderBar() {
  const userState = useSelector(selectUser)

  return <>
    <div className="fixed border-b-2 z-10 bg-white w-full">
      <div className=" container mx-auto flex justify-between">

        {/* HeaderBar left */}
        <div className="flex mx-2 space-x-2">
          <img width="30" src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt=""/>
          <div className=" flex p-1 my-3 rounded-md px-3 space-x-2 bg-gray-200/60">
            <Search className="font-bolder text-gray-500 my-auto" fontSize="small"/>
            <input type="text" placeholder="Search"
                   className="focus:outline-none px-1 bg-transparent rounded-sm ring-gray-300"/>
          </div>
        </div>

        {/* HeaderBar right */}
        <div className="flex flex-row">
          <div className="grid grid-rows-1 grid-cols-6 text-center">
            <MenuHeader Icon={Home} Title="Home"/>
            <MenuHeader Icon={SupervisorAccount} Title="My Network"/>
            <MenuHeader Icon={BusinessCenter} Title="Jobs"/>
            <MenuHeader Icon={Chat} Title="Messaging"/>
            <MenuHeader Icon={Notifications} Title="Notifications"/>
            <MenuProfile photoURL={userState.photoURL}/>
          </div>
          <div className="border-l"/>
          <div className="my-auto ml-4">
            <MenuHeader Icon={Apps} HasChild={true} Title="Work"/>
          </div>
        </div>


      </div>
    </div>

  </>;
}
