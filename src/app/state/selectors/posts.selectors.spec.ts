import { selectPostsList, selectPostsLoading, selectPostsError } from './posts.selectors';
import { PostsState } from '../reducers/posts.reducer';
import { POSTS_FEATURE_KEY } from './posts.selectors';

describe('Test Posts Selectors:', () => {
  const initState: PostsState = {
    posts: [],
    loading: false,
    error: '',
  };

  it('selectPostsList should return the proper data', () => {
    const testState = {
      ...initState,
      posts: [{
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
      }]
    }
    const selectedState = selectPostsList({ [POSTS_FEATURE_KEY]: testState });
    expect(selectedState).toEqual(testState.posts);
  });

  it('selectPostsLoading should return the proper value', () => {
    const testState = { ...initState, loading: true }
    const selectedState = selectPostsLoading({ [POSTS_FEATURE_KEY]: testState });
    expect(selectedState).toEqual(testState.loading);
  });

  it('selectPostsError should return the proper error message', () => {
    const testState = { ...initState, error: 'test error message' }
    const selectedState = selectPostsError({ [POSTS_FEATURE_KEY]: testState });
    expect(selectedState).toEqual(testState.error);
  });
});
