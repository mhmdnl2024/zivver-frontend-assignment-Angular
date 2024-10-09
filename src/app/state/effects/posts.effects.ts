import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { PostsService } from '../../services/posts/posts.service';
import { fetchPosts, postsLoaded, fetchingPostsFailed } from '../actions/posts.actions';

@Injectable()
export class PostsEffects {
  private actions$: Actions = inject(Actions);
  private postsService: PostsService = inject(PostsService);

  fetchPosts$ = createEffect(() => (
    this.actions$.pipe(
      ofType(fetchPosts),
      mergeMap(() => (
        this.postsService.getPosts().pipe(
          map((posts) => postsLoaded({ posts })),
          // TODO: Find a better way to show this error, something like toast message
          catchError(() => of(fetchingPostsFailed({ error: 'Something went wrong!' })))
        )
      ))
    )
  ));
}
