import {ArrowDropDown} from "@material-ui/icons";

export default function MenuProfile({photoURL}) {
  return <>
    <div className="flex flex-col mx-auto my-auto pt-1 cursor-pointer text-gray-500 hover:text-black">
      <img width="24" className="mx-auto rounded-full" src={photoURL} alt=""/>
      <div className="flex flex-row">
        <p className="mx-auto text-xs font-normal">Me</p>
        <ArrowDropDown className="-ml-1 -mt-1" fontSize="medium" />
      </div>
    </div>
  </>;
}
