import { Pipe, PipeTransform, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { likesCounter } from '../model/post';
import { PostService } from '../services/community/post.service';
import { map, filter, take } from 'rxjs/operators';

@Pipe({
  name: 'likes'
})
export class LikesPipe implements PipeTransform, OnInit, OnDestroy {
  constructor(private postService: PostService
  ) {
    // this.postService.fetchPostLikes();
    // // get all likesCounter
    // this.likesCounterSub = this.postService.communitylikesCounterSubject.pipe(
    //   take(1)).subscribe(commLikes => {
    //     console.log(commLikes)
    //     this.likes = commLikes;
    //     this.likesSub.next(this.likes)
    //   })
  }

  ngOnInit(): void { }

  likesCounterSub: Subscription;
  likesSub = new Subject<likesCounter[]>();
  likes: likesCounter[] = [];
  likesCount: number;

  getLikes(postid) {
    let post = { ...this.likes.filter(post => post.postId === postid) }
    return post;
  }

  transform(postid: string) {
    // if (this.getLikes(postid) != undefined) {
    //   return this.getLikes(postid)
    // }

  }

  ngOnDestroy(): void {
    this.likesCounterSub.unsubscribe();
  }
}
