export default function ButtonIcon({Color, Title, Icon, className, IconClassName}) {
  return <>
    <div className={`ease-out duration-150 flex space-x-2 py-3 px-2 hover:bg-gray-300/40 rounded-md cursor-pointer ${className}`}>
      {Icon ? <Icon className={`${Color ? Color : null} ${IconClassName}`}/> : null}
      <p className="text-sm my-auto text-gray-700/90 font-medium">{Title ? Title : ""}</p>
    </div>
  </>;
}
