export default function ButtonIcon({Color, Title, Icon}) {
    return <>
        <div className="ease-out duration-150 flex space-x-2 p-3 hover:bg-gray-300/50 rounded-md cursor-pointer">
            <Icon className={Color ? Color : null}/>
            <p className="text-sm text-gray-500/90 font-medium">{Title ? Title : ""}</p>
        </div>
    </>;
}