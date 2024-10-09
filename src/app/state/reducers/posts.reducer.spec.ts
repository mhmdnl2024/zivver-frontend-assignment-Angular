import { postsReducer, initState, PostsState } from './posts.reducer';
import { fetchPosts, postsLoaded, fetchingPostsFailed } from '../actions/posts.actions';
import { Post } from '../../models/posts.model';

describe('Posts Reducer', () => {
  let state: PostsState;

  beforeEach(() => {
    state = { ...initState };
  });

  it('reducer should return the initialState at runtime', () => {
    const action = {} as any;
    const currentState = postsReducer(state, action);
    expect(currentState).toEqual(initState);
  });

  it('loading should be true after dispatching fetchPosts action', () => {
    const action = fetchPosts();
    const currentState = postsReducer(state, action);
    expect(currentState.loading).toBe(true);
  });

  it('error message should be returned after dispatching fetchingPostsFailed', () => {
    const message = 'test error message';
    const action = fetchingPostsFailed({ error: message });
    const currentState = postsReducer(state, action);
    expect(currentState.error).toEqual(message);
  });

  it('proper data should be returned after dispatching postsLoaded, no error and loading is off', () => {
    const mockPostsData: Post[] = [
      {
        id: 1,
        userId: 22,
        title: 'first title',
        body: 'first body'
      },
      {
        id: 2,
        userId: 33,
        title: 'second title',
        body: 'second body'
      }
    ];
    const action = postsLoaded({ posts: mockPostsData });
    const currentState = postsReducer(state, action);
    expect(currentState.posts).toEqual(mockPostsData);
    expect(currentState.loading).toEqual(false);
    expect(currentState.error).toBeUndefined();
  });
});
