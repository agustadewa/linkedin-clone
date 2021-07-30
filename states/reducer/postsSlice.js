import {createSlice} from '@reduxjs/toolkit';

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
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
        }
    }
})

export const {addPost, removePost, removeAllPosts} = postsSlice.actions;

export default postsSlice.reducer;

// Select posts
export const selectPosts = (state) => state.posts.posts;

