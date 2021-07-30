import {CalendarViewDay, EventNote, Image, Subscriptions} from "@material-ui/icons";
import ButtonIcon from "./ButtonIcon";
import {useState} from "react";
import ModalCreatePost from "./ModalCreatePost";
import {useSelector} from "react-redux";
import {selectUser} from "../states/reducer/userSlice";

export function CardCreatePost() {
    const userState = useSelector(selectUser)

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true);
    }

    return <>
        <div className="rounded-md bg-white ring-gray-300 ring-1 p-3 pb-0">
            {/* Top */}
            <div className="flex space-x-2">
                <img width="45" className="rounded-full"
                     src={userState.photoURL}
                     alt=""/>
                <div onClick={openModal} className="ease-in duration-150 active:bg-gray-300/70 bg-gray-300/30 my-auto p-3 px-4 rounded-full
                                    w-full cursor-pointer border border-gray-400">
                    <div className="text-sm text-gray-500/90 active:text-gray-700 font-medium">Start a post</div>
                </div>
            </div>

            {/* ModalCreatePost */}
            <ModalCreatePost onClose={closeModal} isOpenState={isOpen} closeTrigger={closeModal}/>

            {/* Bottom */}
            <div className="flex justify-between text-sm py-1">
                <ButtonIcon Title="Photo" Icon={Image} Color="text-[#70B5F9]"/>
                <ButtonIcon Title="Video" Icon={Subscriptions} Color="text-[#7FC15E]"/>
                <ButtonIcon Title="Event" Icon={EventNote} Color="text-[#e7a33e]"/>
                <ButtonIcon Title="Write article" Icon={CalendarViewDay} Color="text-[#FC9295]"/>
            </div>
        </div>
    </>
}