import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/posts.model';

export const fetchPosts = createAction('[Posts] Fetch Posts'); // An effect is assigned to this action
export const postsLoaded = createAction('[Posts] Posts Loaded', props<{ posts:  Post[]}>());
export const fetchingPostsFailed = createAction('[Posts] Fetching Posts Failed', props<{ error: string }>());