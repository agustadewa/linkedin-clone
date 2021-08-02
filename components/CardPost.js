import {InsertCommentOutlined, MoreHorizOutlined, Public, SendOutlined, ShareOutlined} from "@material-ui/icons";
import ButtonIcon from "./ButtonIcon";
import {ThumbUpAltOutlined} from '@material-ui/icons'

export function CardPost({photoURL, displayName, content, timestamp}) {
  function formatTimestamp(timestamp) {
    const seconds = new Date().getTime() / 1000 - timestamp;

    // TODO: simplify this
    // Sec, Min, Hour, Day, Week, Month, Year
    return Math.floor(seconds / 29030400) > 0 ? `${Math.floor(seconds / 29030400)}Y` :
        Math.floor(seconds / 2419200) > 0 ? `${Math.floor(seconds / 2419200)}M` :
            Math.floor(seconds / 604800) > 0 ? `${Math.floor(seconds / 604800)}w` :
                Math.floor(seconds / 86400) > 0 ? `${Math.floor(seconds / 86400)}d` :
                    Math.floor(seconds / 3600) > 0 ? `${Math.floor(seconds / 3600)}h` :
                        Math.floor(seconds / 60) > 0 ? `${Math.floor(seconds / 60)}m` :
                            `${Math.floor(seconds)}s`;
  }

  return <>
    <div className="rounded-md bg-white ring-gray-300 ring-1 ">
      {/* Top */}
      <div className="flex flex-row gap-2">
        <div className="p-3 flex flex-row gap-2">
          <img width="45" className="rounded-full"
               src={photoURL ? photoURL : ""}
               alt={displayName ? displayName : ""}/>

          <div className="flex flex-col">
            <div className="text-sm font-medium">{displayName ? displayName : "-"}</div>
            <div className="text-gray-500 text-xs leading-3">
              <div>-</div>
              <div className="flex flex-row space-x-1">
                <div>{timestamp ? formatTimestamp(timestamp) : "-"} •</div>
                <Public style={{fontSize: "14px"}}/>
              </div>
            </div>
          </div>
        </div>

        <div className="test ml-auto py-1 px-2">
          <div className="p-1 rounded-full cursor-pointer hover:bg-gray-300/30">
            <MoreHorizOutlined/>
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="px-3 py-2 flex justify-between text-sm text-gray-700 whitespace-pre-wrap">
        {content}
      </div>

      {/* Menu */}
      <div className="flex flex-row px-1 pb-1">
        <ButtonIcon Title="Like" Icon={ThumbUpAltOutlined} Color="text-gray-700/80"/>
        <ButtonIcon Title="Comment" Icon={InsertCommentOutlined} Color="text-gray-700/80"/>
        <ButtonIcon Title="Share" Icon={ShareOutlined} Color="text-gray-700/80"/>
        <ButtonIcon Title="Send" Icon={SendOutlined} IconClassName="-rotate-45" Color="text-gray-700/80"/>
      </div>

      {/* Comment */}
      <button className="w-full text-left p-2 px-3 bg-gray-200/70">
        <p className="text-xs">Be the first to comment on this</p>
      </button>
    </div>
  </>
}
