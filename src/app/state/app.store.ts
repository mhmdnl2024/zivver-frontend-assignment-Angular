import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postsReducer } from './reducers/posts.reducer';
import { PostsEffects } from './effects/posts.effects';

export const store = StoreModule.forRoot({
  posts: postsReducer
});

export const effects = EffectsModule.forRoot([
  PostsEffects,
]);