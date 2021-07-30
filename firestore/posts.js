import {db} from "../firebase";
import {getAccount, getAccountsByUIDs} from "./accounts";

const postsColl = db.collection("posts");

const createPost = ({uid, displayName, content, timestamp}) => {
    return postsColl.add({
        uid: uid,
        displayName: displayName,
        content: content,
        timestamp: timestamp
    });
}

const getPostsHelper = async (query, setter) => {
    let results = [];

    // Get Posts
    await query.get()
        .then(res => res.docs.forEach(post => {
            let res = post.data();

            // Modify timestamp to seconds
            res.timestamp = res.timestamp.seconds;
            results.push(res);

            // console.log("eachPost ==>", res)
        }))

    // Extract UIDs
    const UIDs = new Set(results.map(doc => doc.uid));
    // console.log("extract UIDs ==>", Array.from(UIDs));

    // Get photoURL
    await getAccountsByUIDs(Array.from(UIDs), account => {
        results.map((result) => {
            if (result.uid === account.uid) result.photoURL = account.photoURL;
            // console.log(account, result);
        });
    });

    // results.map(res => {
    //     console.log("RES -->", res)
    // })

    results.map(setter)
}

const getPosts = async (setter) => {
    const query = postsColl
        .orderBy("timestamp", "desc")
        .limit(10)

    try {
        await getPostsHelper(query, setter)
    } catch (err) {
        return err
    }
}

const getMorePosts = async (lastDoc, setter) => {
    const query = postsColl
        .orderBy("timestamp", "desc")
        .startAfter(lastDoc)
        .limit(10)
    try {
        await getPostsHelper(query, setter)
    } catch (err) {
        return err
    }
}

export {createPost, getPosts, getMorePosts}