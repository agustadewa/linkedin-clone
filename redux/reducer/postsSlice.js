import {createSlice} from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    lastPostSnapshot: null
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action) => {
      const posts = state.posts;
      const idx = posts.findIndex(post => post.id === action.payload);
      posts.splice(idx, 1)
      state.posts = posts;
    },
    removeAllPosts: (state) => {
      state.posts = [];
    },

    /* firebase snapshot document */
    addLastPostSnapshot: (state, action) => {
      state.lastPostSnapshot = action;
    },
    removeLastPostSnapshot: (state) => {
      state.lastPostSnapshot = null;
    }
  }
})

export default postsSlice.reducer;

// posts
export const {addPost, removePost, removeAllPosts} = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;

// lastPostSnapshot
export const {addLastPostSnapshot, removeLastPostSnapshot} = postsSlice.actions;
export const selectPostsSnapshot = (state) => state.posts.lastPostSnapshot;
