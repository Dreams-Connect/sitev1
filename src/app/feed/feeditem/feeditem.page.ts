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
  commentLikeCounterSub: Subscription;

  nestedlikeCounterSub: Subscription;
  nestedCommentLikeCounterSub: Subscription;

  commentSub: Subscription;
  nestedCommentSub: Subscription;


  likes: likesCounter;
  comments: Comments[] = [];

  userComment = '';

  today;

  postPhotoURL = '';

  commentType; // reply || comment

  replyToUserName = '';
  replyToUserUID = '';
  parentCommentId = '';

  ngOnInit() {
    this.commentType = 'comment';

    this.today = new Date();
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
          this.postPhotoURL = this.post.photoURL;
        }
      )

      // get likes counter
      this.likeCounterSub = this.postService.onLikesChanges().subscribe(changes => {
        this.likes = this.postService.getPost(this.postID)[0]
        // console.log(this.postService.getPost(this.postID)[0])
      })
    })

    // fetch comments
    this.commentSub = this.postService.fetctFeedItemComment(this.postID).subscribe(
      comments => {
        if (comments != undefined) {
          this.comments = comments.comments;
        }

        // append likes to comments
        this.comments.map(comment => {
          this.postService.getCommentLikesCount(comment.commentId).subscribe(likes => {
            comment.likes = likes;
          });
        })

        this.comments.sort((a: any, b: any) => {
          return b.createdAt - a.createdAt
        })

        // re fetch nested comment
        // fetch nested comment
        this.nestedCommentSub = this.postService.getNestedComment(this.postID).subscribe(
          res => {
            if (res) {
              // filter nested comment for this comment
              this.comments.map(comment => {
                comment.nestedComments = res.comments.filter(c => c.parentCommentId == comment.commentId);
                // append nested comments likes
                comment.nestedComments.map(nestedComment => {
                  this.postService.getCommentLikesCount(nestedComment.commentId).subscribe(likes => {
                    nestedComment.likes = likes;
                  })
                })
                // sort
                comment.nestedComments.sort((a, b) => {
                  return b.createdAt - a.createdAt
                })
              })
            }
          }
        )
      })

    // fetch nested comment
    this.nestedCommentSub = this.postService.getNestedComment(this.postID).subscribe(
      res => {
        if (res) {
          // filter nested comment for this comment
          this.comments.map(comment => {
            comment.nestedComments = res.comments.filter(c => c.parentCommentId == comment.commentId);
            // append nested comments likes
            comment.nestedComments.map(nestedComment => {
              this.postService.getCommentLikesCount(nestedComment.commentId).subscribe(likes => {
                nestedComment.likes = likes;
              })
            })
            // sort
            comment.nestedComments.sort((a, b) => {
              return b.createdAt - a.createdAt
            })
          })
        }
      }
    );

    // fetch comments likes
    this.commentLikeCounterSub = this.postService.onCommentLikesChanges().subscribe(
      likes => {
        // append likes to comments
        this.comments.map(comment => {
          this.postService.getCommentLikesCount(comment.commentId).subscribe(likes => {
            comment.likes = likes;
          });
          // console.log(comment)
        })
      }
    )

    // fetch nestedComments likes
    this.nestedlikeCounterSub = this.postService.onCommentLikesChanges().subscribe(
      likes => {
        // append likes to nested comments


      }
    )
  }

  onLike(postid) {
    this.postService.onPostLike(postid)
  }

  onLikeComment(commentId) {
    this.postService.likeComment(commentId)
  }

  unlikeComment(commentId) {
    this.postService.unlikeComment(commentId)
  }

  play() {
    this.player.play();
  }

  onplay() {
    this.player = videojs(document.querySelector('video'), { preload: "auto", controls: false, fill: true })
    this.player.play();
  }

  onComment(postid) {
    this.postService.postComment(this.communityName, postid, this.userComment);
    this.userComment = ''
    this.commentType = 'comment'
  }


  onReplyToCommentDetails(replyToUserName, replyToUserUID, parentCommentId) {
    this.replyToUserName = replyToUserName;
    this.replyToUserUID = replyToUserUID;
    this.parentCommentId = parentCommentId;
    this.commentType = 'reply';
  }

  onReplyTo() {
    this.postService.replypToComment(
      this.communityName,
      this.postID,
      this.userComment,
      this.replyToUserName,
      this.replyToUserUID,
      this.parentCommentId
    )
    this.commentType = 'comment';
    this.replyToUserName = '';
    this.replyToUserUID = '';
    this.parentCommentId = '';
    this.userComment = ''
  }

  cancelReplyingTo() {
    this.commentType = 'comment'
    this.replyToUserName = '';
    this.replyToUserUID = '';
    this.parentCommentId = '';
  }

  ngOnDestroy(): void {
    this.likeCounterSub.unsubscribe();
    this.commentSub.unsubscribe();
    this.nestedCommentSub.unsubscribe();
  }
}
