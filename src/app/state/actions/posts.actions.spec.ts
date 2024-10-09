import { fetchPosts, postsLoaded, fetchingPostsFailed } from './posts.actions';
import { Post } from '../../models/posts.model';

describe('Test PostsActions:', () => {
  it('fetchPosts action should be created', () => {
    const action = fetchPosts();
    expect(action.type).toBe('[Posts] Fetch Posts');
  });

  it('postsLoaded action should be created and return the proper data', () => {
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

    expect(action.type).toBe('[Posts] Posts Loaded');
    expect(action.posts).toEqual(mockPostsData);
  });

  it('should create a fetchingPostsFailed action with an error payload', () => {
    const message = 'test message';
    const action = fetchingPostsFailed({ error: message });

    expect(action.type).toBe('[Posts] Fetching Posts Failed');
    expect(action.error).toEqual(message);
  });
});
