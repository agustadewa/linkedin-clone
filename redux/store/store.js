import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducer/userSlice'
import postsReducer from '../reducer/postsSlice';
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer
  },
  middleware: [thunk]
});
