import {InsertCommentOutlined, Public, SendOutlined, ShareOutlined} from "@material-ui/icons";
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
    <div className="rounded-md bg-white ring-gray-300 ring-1 p-3 pb-0">
      {/* Top */}
      <div className="flex space-x-2">
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


      {/* Content */}
      <div className="flex justify-between text-sm py-2 text-gray-700">
        {content}
      </div>

      {/* Bottom */}
      <div className="flex flex-row pb-1">
        <ButtonIcon Title="Like" Icon={ThumbUpAltOutlined}/>
        <ButtonIcon Title="Comment" Icon={InsertCommentOutlined}/>
        <ButtonIcon Title="Share" Icon={ShareOutlined}/>
        <ButtonIcon Title="Send" Icon={SendOutlined} IconClassName={"-rotate-45"}/>
      </div>
    </div>
  </>
}
