import { Pipe, PipeTransform, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { likesCounter } from '../model/post';
import { PostService } from '../services/community/post.service';
import { map, filter } from 'rxjs/operators';

@Pipe({
  name: 'likes'
})
export class LikesPipe implements PipeTransform, OnInit, OnDestroy {
  constructor(private postService: PostService
  ) {

  }
  ngOnInit(): void {

  }

  transform(postid: string) {
  }

  ngOnDestroy(): void {
   
  }
}
