import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiService: ApiService = inject(ApiService);

  getPosts(): Observable<Post[]> {
    return this.apiService.get<Post[]>('/posts');
  }
}
