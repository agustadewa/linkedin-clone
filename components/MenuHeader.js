export default function MenuHeader({Icon, Title}) {
    return <>
        <div className="inline-block flex flex-col py-1 cursor-pointer text-gray-500 hover:text-black">
            <Icon className="mx-auto p-auto"/>
            <div className="text-sm font-normal">{Title}</div>
        </div>
    </>
}