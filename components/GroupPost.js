import React, {Component} from 'react'
import {connect} from "react-redux";
import {addLastPostSnapshot, addPost, removeAllPosts, removeLastPostSnapshot} from "../redux/reducer/postsSlice";
import {CardPost} from "./CardPost";
import {getPosts} from "/firestore/posts";

class GroupPost extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.removeAllPosts();
    this.props.removeLastPostSnapshot();
    getPosts(
        post => this.props.addPost(post),
        lastPost => this.props.addLastPostSnapshot(lastPost)
    ).catch(err => {
      console.log("Error getting posts data:", err);
    })
  }

  render() {
    return <>
      {this.props.postsState.map(
          (post, idx) => <CardPost
              key={idx}
              photoURL={post.photoURL}
              displayName={post.displayName}
              content={post.content}
              timestamp={post.timestamp}
          />
      )}
    </>
  }
}

const mapStateToProps = state => ({
  postsState: state.posts.posts,
  lastPostSnapshotState: state.posts.lastPostSnapshot
});

const mapDispatchToProps = () => {
  return {addPost, removeAllPosts, addLastPostSnapshot, removeLastPostSnapshot};
};

export default connect(mapStateToProps, mapDispatchToProps())(GroupPost)
