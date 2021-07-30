import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducer/userSlice'
import postsReducer from '../reducer/postsSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer
    }
});