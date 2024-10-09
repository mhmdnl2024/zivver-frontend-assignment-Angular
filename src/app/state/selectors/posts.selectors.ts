import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from '../reducers/posts.reducer';

export const POSTS_FEATURE_KEY = 'posts';

export const selectPostsState = createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);

export const selectPostsList = createSelector(selectPostsState, (state) => state.posts);
export const selectPostsLoading = createSelector(selectPostsState, (state) => state.loading);
export const selectPostsError = createSelector(selectPostsState, (state) => state.error);
