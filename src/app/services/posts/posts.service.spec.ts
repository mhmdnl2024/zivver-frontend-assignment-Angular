import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostsService } from './posts.service';
import { ApiService } from '../api.service';
import { Post } from '../../models/posts.model';

describe('Test PostsService:', () => {
  let postsService: PostsService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [ PostsService, { provide: ApiService, useValue: apiServiceSpy }]
    });

    postsService = TestBed.inject(PostsService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('getPosts function should return the proper response', () => {
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

    apiService.get.and.returnValue(of(mockPostsData));

    postsService.getPosts().subscribe(response => {
      expect(response).toEqual(mockPostsData);
    });

    expect(apiService.get).toHaveBeenCalledOnceWith('/posts');
  });
});
