import {db} from "/firebase";
import {getAccountsByUIDs} from "./accounts";

const postsColl = db.collection("posts");

const createPost = ({uid, displayName, content, timestamp}) => {
  return postsColl.add({
    uid: uid,
    displayName: displayName,
    content: content,
    timestamp: timestamp
  });
}

const getPostsHelper = async (query, setter, lastPostSetter) => {
  let results = [];

  // Get Posts
  const res = await query.get()
  if (res.docs.length > 0) {
    lastPostSetter(res.docs[res.docs.length - 1])
  }
  res.docs.forEach(post => {
    let res = post.data();

    // Modify timestamp to seconds
    res.timestamp = res.timestamp.seconds;
    results.push(res);
  })

  // Extract UIDs
  const UIDs = new Set(results.map(doc => doc.uid));

  // Get photoURL
  await getAccountsByUIDs(Array.from(UIDs), account => {
    results.map((result) => {
      if (result.uid === account.uid) result.photoURL = account.photoURL;
    });
  });

  results.map(setter)
}

const getPosts = async (setter, lastPostSetter) => {
  const query = postsColl
      .orderBy("timestamp", "desc")
      .limit(8)

  await getPostsHelper(query, setter, lastPostSetter)
      .catch(err => console.log("---- getPosts ----", err))
}

const getMorePosts = async (lastDoc, setter, lastPostSetter) => {
  const query = postsColl
      .orderBy("timestamp", "desc")
      .startAfter(lastDoc)
      .limit(8)

  await getPostsHelper(query, setter, lastPostSetter)
      .catch(err => console.log("---- getMorePosts ----", err))
}

export {createPost, getPosts, getMorePosts}
