export default function MenuProfile({photoURL}) {
    return <>
        <div className="flex flex-col py-1 cursor-pointer text-gray-500 hover:text-black">
            <img width="24" className="rounded-full" src={photoURL} alt=""/>
            <p className="mx-auto text-sm font-normal">Me</p>
        </div>
    </>;
}