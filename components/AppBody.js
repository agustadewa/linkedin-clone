import {CardCreatePost} from "./CardCreatePost";
import {CardProfile} from "./CardProfile";
import {CardPost} from "./CardPost";
import {connect} from "react-redux";
import {getMorePosts, getPosts} from "../firestore/posts";
import {addPost, removeAllPosts} from "../states/reducer/postsSlice";
import {Component} from "react";


class AppBody extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
    }


    componentDidMount() {
        this.props.removeAllPosts();
        getPosts(post => {
            this.props.addPost(post);
        }).catch(err => {
            console.log("Error getting posts data:", err);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const isDifferentPage = this.state.currentPage !== prevState.currentPage
        if (this.ste) {
            const lastPost = this.props.postsState && this.props.postsState[this.props.postsState.length - 1];

            console.log("--- UPDATE ---")
            getMorePosts(lastPost, post => {
                this.props.addPost(post);
            }).catch(err => {
                console.log("Error getting posts data:", err);
            })
        }
    }

    render() {
        return <>
            <div className="bg-gray-100 p-6 grid grid-cols-12 justify-between gap-x-6">

                {/* Profile Card */}
                <div className="grid-cols-1 col-span-3">
                    <CardProfile/>
                </div>

                {/* Body Card */}
                <div className="grid-cols-1 gap-3 col-span-6 space-y-2">
                    <CardCreatePost/>
                    {this.props.postsState.map(post => <CardPost photoURL={post.photoURL}
                                                                 displayName={post.displayName}
                                                                 content={post.content}
                                                                 timestamp={post.timestamp}/>
                    )}
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
        </>
    }
}

const mapStateToProps = state => ({
    postsState: state.posts.posts
});

const mapDispatchToProps = () => {
    return {addPost, removeAllPosts};
};

export default connect(mapStateToProps, mapDispatchToProps())(AppBody)