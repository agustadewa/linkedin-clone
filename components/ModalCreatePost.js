import {Dialog} from "@headlessui/react";
import {
  BusinessCenter,
  Close, Comment,
  Description,
  Equalizer,
  Image,
  MoreHoriz,
  Person,
  Public,
  Star,
  YouTube
} from "@material-ui/icons";
import ButtonIconPill from "./ButtonIconPill";
import TextareaAutosize from 'react-textarea-autosize'
import ButtonIconCircle from "./ButtonIconCircle";
import {useState} from "react";
import firebase from "firebase";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "/redux/reducer/userSlice";
import {createPost, getPosts} from "/firestore/posts";
import {addLastPostSnapshot, addPost, removeAllPosts} from "/redux/reducer/postsSlice";

export default function ModalCreatePost({closeRef, isOpenState, closeTrigger}) {
  const dispatch = useDispatch()

  const userState = useSelector(selectUser)
  const [contentPostField, setContentPostField] = useState("");

  function postDisabler(element) {
    const data = element.currentTarget.value;
    data ? setContentPostField(data) : setContentPostField("");
  }

  function postNow() {
    const payloadData = {
      uid: userState.uid,
      displayName: userState.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      content: contentPostField
    };

    // TODO: use transaction and set buffer progress
    // setTimeout(() => {
    //     return Promise.reject("Unable to create a post, timeout exceeded");
    // }, 4000);

    createPost(payloadData)
        .catch(err => {
          console.log("Unable to create a post", err);
        })
        .then(() => {
          setContentPostField("");
          dispatch(removeAllPosts());
          getPosts(
              post => dispatch(addPost(post)),
              lastPost => dispatch(addLastPostSnapshot(lastPost))
          ).catch(err => {
            console.log("Error getting posts data:", err);
          })

          closeTrigger();
        })

  }


  return <>
    <Dialog as="div" className="fixed inset-0 z-10 overflow-hidden" onClose={closeTrigger} open={isOpenState} initialFocus={closeRef}>
      <div className="px-4 mt-4 text-center">

        {/* Overlay */}
        <Dialog.Overlay className="bg-black/60 fixed inset-0"/>

        {/* Modal Main */}
        <div className="flex-row py-2 max-h-screen max-w-lg inline-block w-1/2 overflow-auto text-left align-middle
                                    transform bg-white shadow-sm rounded-lg">

          {/* Modal Head */}
          <div className="border-b border-gray-400/20 text-xl text-gray-800 pb-1 px-3 flex justify-between">
            <div className="self-start">Create a post</div>
            <Close ref={closeRef} onClick={closeTrigger} fontSize="large"
                   className="-mt-1 -mr-1 p-2 cursor-pointer text-gray-500 rounded-full hover:bg-gray-300/50"/>
          </div>

          {/* Modal Body */}
          <div className="px-3">

            <div className="flex flex-row space-x-3 py-2">
              <img width="45" className="rounded-full"
                   src={userState.photoURL}
                   alt=""/>
              <div className="flex space-x-2">
                <ButtonIconPill Icon={Person} Title={userState.displayName}/>
                <ButtonIconPill Icon={Public} Title="Anyone"/>
              </div>
            </div>

            <TextareaAutosize minRows="3" placeholder="What do you want to talk about?"
                              className="outline-none resize-none w-full" onChange={postDisabler}
            />

          </div>

          <div className="p-3 flex flex-row">
            <div className="p-1 px-2 cursor-pointer text-blue-700/90 rounded-md hover:bg-blue-300/30
                                        font-medium text-md">
              Add hashtag
            </div>
          </div>

          <div className="flex flex-row p-3 pl-4 pb-1">
            <div className="border-r border-gray-500/10 text-gray-500 flex flex-row pr-3">
              <ButtonIconCircle Icon={Image}/>
              <ButtonIconCircle Icon={YouTube}/>
              <ButtonIconCircle Icon={Description}/>
              <ButtonIconCircle Icon={BusinessCenter}/>
              <ButtonIconCircle Icon={Star}/>
              <ButtonIconCircle Icon={Equalizer}/>
              <ButtonIconCircle Icon={MoreHoriz}/>
            </div>

            <div className="ml-2 py-1 px-3 space-x-1 text-gray-500/90
                                        rounded-full hover:bg-gray-500/20 cursor-pointer flex flex-row">
              <Comment fontSize="small" className="my-auto"/>
              <p className="text-sm font-medium">Anyone</p>
            </div>

            <button onClick={postNow}
                    disabled={contentPostField === ""}
                    className="ml-auto py-1 px-4 rounded-full bg-blue-600 hover:bg-blue-800 text-white
                                cursor-pointer disabled:bg-gray-300 disabled:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>

        </div>
      </div>

    </Dialog>
  </>;
}
