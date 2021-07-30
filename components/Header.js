import {BusinessCenter, Chat, Home, Notifications, Search, SupervisorAccount} from "@material-ui/icons";
import MenuHeader from "./MenuHeader";
import MenuProfile from "./MenuProfile";
import {useSelector} from "react-redux";
import {selectUser} from "../states/reducer/userSlice";

export default function Header() {
    const userState = useSelector(selectUser)

    return <>
        <div className="border-b-2">
            <div className="container mx-auto px-2 flex justify-evenly">

                {/* Header left */}
                <div className="flex mx-2 space-x-2">
                    <img width="30" src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt=""/>
                    <div className=" flex p-1 my-3 rounded-md px-3 space-x-2 bg-gray-200/60">
                        <Search className="font-bolder text-gray-500 my-auto" fontSize="small"/>
                        <input type="text" placeholder="Search"
                               className="focus:outline-none px-1 bg-transparent rounded-sm ring-gray-300"/>
                    </div>
                </div>

                {/* Header right */}
                <div className="flex space-x-4">
                    <MenuHeader Icon={Home} Title="Home"/>
                    <MenuHeader Icon={SupervisorAccount} Title="My Network"/>
                    <MenuHeader Icon={BusinessCenter} Title="Jobs"/>
                    <MenuHeader Icon={Chat} Title="Messaging"/>
                    <MenuHeader Icon={Notifications} Title="Notifications"/>
                    <MenuProfile photoURL={userState.photoURL}/>
                </div>
            </div>
        </div>

    </>;
}