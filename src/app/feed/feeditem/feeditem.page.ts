import { PostService } from 'src/app/services/community/post.service';
import { Subscription } from 'rxjs';
import { Post, likesCounter, Comments } from './../../model/post';
import { CommunityService } from './../../services/community/community.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import videojs from 'video.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feeditem',
  templateUrl: './feeditem.page.html',
  styleUrls: ['./feeditem.page.scss'],
})
export class FeeditemPage implements OnInit, OnDestroy {
  constructor(
    private acRoute: ActivatedRoute,
    private communityService: CommunityService,
    private postService: PostService) { }

  // slide options
  slideOpts = {
    speed: 400
  };
  userUID;

  player: videojs.Player; //init player

  communityName;
  postID;

  post: Post;

  likeCounterSub: Subscription;
  commentSub: Subscription;

  likes: likesCounter;
  comments: Comments[] = [];


  userComment = '';

  ngOnInit() {
    // get user uid
    this.userUID = localStorage.getItem('dcUserUID');
  }

  ionViewWillEnter() {
    // get community name and post id from activated route
    this.acRoute.paramMap.subscribe(maps => {
      if (!maps.has('id')) {
        return;
      }
      this.communityName = maps.get('id:id');
      this.postID = maps.get('id')

      // get post 
      this.communityService.fetchPost(this.communityName).subscribe(
        community => {
          // console.log(community)
          this.post = { ...community.posts.filter(post => post.id == this.postID)[0] }
          // console.log(this.post)
        }
      )

      // get likes counter
      this.likeCounterSub = this.postService.onLikesChanges().subscribe(changes => {
        this.likes = this.postService.getPost(this.postID)[0]
        // console.log(this.postService.getPost(this.postID)[0])
      })


      // fetch comments
      this.commentSub = this.postService.fetctFeedItemComment(this.postID).subscribe(
        comments => {
          this.comments = comments.comments;
          this.comments.sort((a:any, b:any) => {
            return b.createdAt - a.createdAt
          })
        })
    })
  }

  onLike(postid) {
    this.postService.onPostLike(postid)
  }

  play() {
    this.player.play();
  }

  onplay() {
    this.player = videojs(document.querySelector('video'), { preload: "auto", controls: false, fill: true })
    this.player.play();
  }

  onComment(postid) {
    this.postService.postComment(this.communityName, postid, this.userComment)
  }

  ngOnDestroy(): void {
    this.likeCounterSub.unsubscribe();
    this.commentSub.unsubscribe();
  }
}
