import {CardCreatePost} from "./CardCreatePost";
import {CardProfile} from "./CardProfile";
import {connect} from "react-redux";
import {getMorePosts} from "/firestore/posts";
import React from 'react'
import {addLastPostSnapshot, addPost} from "/redux/reducer/postsSlice";
import GroupPost from "./GroupPost"

class AppBody extends React.Component {
  constructor(props) {
    super(props);
  }

  getMore() {
    getMorePosts(
        this.props.lastPostSnapshotState?.payload,
        post => this.props.addPost(post),
        lastPost => this.props.addLastPostSnapshot(lastPost)
    ).catch(err => {
      console.log("Error getting more post data:", err);
    })
  }

  render() {
    return <>
      <div className={"min-h-screen bg-gray-100 pt-12"}>

        <div className="p-6 grid grid-cols-12 gap-x-6 container mx-auto flex justify-between">

          {/* Profile Card */}
          <div className="grid-cols-1 col-span-3">
            <CardProfile/>
          </div>

          {/* Body Card */}
          <div className="grid-cols-1 gap-3 col-span-6 space-y-2">
            <CardCreatePost/>
            <GroupPost/>
            <div onClick={() => this.getMore()} className={
              `text-center text-md text-white bg-blue-400/70 rounded-md px-3 py-2
               hover:bg-blue-400/50 hover:cursor-pointer`}
            >
              Load More
            </div>
          </div>

          {/* Widget Card */}
          <div className="grid-cols-1 col-span-3">
            <div className="rounded-md ring-gray-300 ring-1 p-2 w-3/12">
              <div className="h-40">
                Widget
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  }
}

const mapStateToProps = state => ({
  lastPostSnapshotState: state.posts.lastPostSnapshot
});

const mapDispatchToProps = () => {
  return {addPost, addLastPostSnapshot};
};

export default connect(mapStateToProps, mapDispatchToProps())(AppBody)
