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

  likesCounterSub: Subscription;
  likes: likesCounter;
  likesCount: number;

  transform(postid: string) {
    // this.likes = this.postService.getPostLikes(postid)[0]
    // if (this.likes != undefined) {
    //   return this.likes.likes
    // }
    this.postService.fetchPostLikes();
    this.likesCounterSub = this.postService.communitylikesCounterSubject.subscribe(commLikes => {
      this.likesCount = commLikes.filter(likes => likes.postId === postid)[0].likes
      console.log(this.likesCount)
    })
  }

  ngOnDestroy(): void {
    this.likesCounterSub.unsubscribe();
  }
}
