import {ArrowDropDown} from "@material-ui/icons";

export default function ButtonIconPill({Icon, Title}) {
    return <>
        <div className="my-auto py-1 px-3 flex rounded-full hover:bg-gray-400/20
                           ring-1 ring-gray-700/90 hover:ring-2 hover:ring-gray-600
                           ease-in duration-150 cursor-pointer">
            <Icon fontSize="medium" className="p-1 text-gray-500"/>
            <p className="my-auto text-sm text-gray-600/80 font-medium">{Title ? Title : ""}</p>
            <ArrowDropDown className="text-gray-600/90"/>
        </div>
    </>;
}