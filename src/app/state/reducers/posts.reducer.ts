import { createReducer, on } from '@ngrx/store';
import { fetchPosts, postsLoaded, fetchingPostsFailed } from '../actions/posts.actions';
import { Post } from '../../models/posts.model';

export interface PostsState {
  posts: Post[],
  loading: boolean,
  error?: string
}

export const initState: PostsState = {
  posts: [],
  loading: false
};

export const postsReducer = createReducer(
  initState,
  on(fetchPosts, (state) => ({ ...state, loading: true })),
  on(postsLoaded, (state, { posts }) => ({ ...state, loading: false, posts })),
  on(fetchingPostsFailed, (state, { error }) => ({ ...state, loading: false, error }))
);