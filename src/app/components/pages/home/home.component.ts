import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { SquareComponent } from '../../shared/square/square.component';
import { selectPostsLoading, selectPostsList, selectPostsError } from '../../../state/selectors/posts.selectors';
import { fetchPosts } from '../../../state/actions/posts.actions';
import { Post } from '../../../models/posts.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, SquareComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | undefined>;

  selectedPostId: number;
  postProperties: Array<string> = Post.getKeys();
  activeProperty: keyof Post = 'title';

  private store: Store = inject(Store);

  constructor() {
    this.posts$ = this.store.select(selectPostsList);
    this.loading$ = this.store.select(selectPostsLoading);
    this.error$ = this.store.select(selectPostsError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPosts());
  }

  onSelectPost(id: number) {
    this.selectedPostId = id;

    // Circular array rotation to get the next property name
    const nextPropertyIndex = (this.postProperties.indexOf(this.activeProperty) + 1) % this.postProperties.length;
    this.activeProperty = this.postProperties[nextPropertyIndex] as keyof Post;
  }
}