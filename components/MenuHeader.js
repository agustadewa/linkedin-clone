import {ArrowDropDown} from "@material-ui/icons";

export default function MenuHeader({Icon, Title, HasChild}) {
  return <>
    <div className="inline-block flex flex-col my-auto px-1 cursor-pointer text-gray-500 hover:text-black">
      <Icon className="mx-auto"/>
      <div className="flex flex-row justify-center">
        <p className="text-xs font-normal">{Title}</p>
        {HasChild ? <ArrowDropDown className="-ml-1 -mt-1" fontSize="medium"/> : null}
      </div>
    </div>
  </>
}
