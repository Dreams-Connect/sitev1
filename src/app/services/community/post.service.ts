import { currentUser } from 'src/app/model/user';
import { SharedService } from './../shared.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable, OnDestroy } from '@angular/core';
import { Post, likesCounter } from 'src/app/model/post';
import { Observable, Subject, Subscription } from 'rxjs';
import { finalize, take, map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy {
  constructor(
    private afs: AngularFirestore,
    private afstorage: AngularFireStorage,
    private toastController: ToastController,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.currentUserSub = this.sharedService.currentUserSubject.subscribe(user => {
      this.currentUser = user
    })
    this.sharedService.fetchUser();

    this.fetchPostLikes();

    // fetch post likes counter
    this.fetchLikesCounters();
  }

  postLikesSubject = new Subject<any>();
  postLikes: any[] = [];

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadPercentageSubject = new Subject<any>();
  downloadPercentage;

  currentUserSub: Subscription;
  currentUser: currentUser;

  createPost(form, community, mediaList) {
    let mediaFiles: any[] = [];

    // loop through mediaList
    if (mediaList.length > 0) {
      for (let i = 0; i < mediaList.length; i++) {
        let id = this.afs.createId(); // generate id
        let file = mediaList[i].file;
        let filePath = `${mediaList[i].type}/${id}`  // seperate path for audio & video

        // console.log(filePath)
        // console.log(file)

        let fileRef = this.afstorage.ref(filePath);

        // upload files
        let task = this.afstorage.upload(filePath, file) // upload

        //observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL()
            this.downloadURL.subscribe(url => {
              // get download url
              // retrieve file id
              if (url) {
                // add media download url to post mediaList
                mediaFiles.push({
                  'url': url,
                  'type': mediaList[i].type
                })
                console.log(mediaFiles)
                if (mediaFiles.length === mediaList.length) {
                  let userUID = localStorage.getItem('dcUserUID');
                  let id = this.afs.createId(); // generate id
                  const newPost = {
                    id: id,
                    userUID: userUID,
                    name: this.currentUser.firstname + ' ' + this.currentUser.lastname,
                    photoURL: '',
                    post: form.post,
                    community: community,
                    mediaList: mediaFiles,
                    createdAt: Date.now()
                  }

                  // add post to collection
                  this.afs.collection<Post>('post').doc(community).update({
                    posts: firebase.firestore.FieldValue.arrayUnion(newPost) // merge in context community
                  })
                    .then(resp => {
                      this.router.navigateByUrl('dc/community/feed/' + community);
                      this.postToast()
                    })
                    .catch(err => {
                      this.afs.collection<Post>('post').doc(community).set({
                        posts: firebase.firestore.FieldValue.arrayUnion(newPost) // merge in context community
                      }).then(resp => {
                        this.router.navigateByUrl('dc/community/feed/' + community);
                        this.postToast()
                      })
                    })
                }
              }
            })
          })
        ).subscribe(task => {
          this.downloadPercentage = ((task.bytesTransferred / task.totalBytes) * 100);
          this.downloadPercentageSubject.next(this.downloadPercentage)
        })
      }
    }

    // if mediaList upload complete?
    // build post
    if (mediaFiles.length === mediaList.length) {
      let userUID = localStorage.getItem('dcUserUID');
      let id = this.afs.createId(); // generate id
      const newPost = {
        id: id,
        userUID: userUID,
        name: this.currentUser.firstname + ' ' + this.currentUser.lastname,
        photoURL: '',
        post: form.post,
        community: community,
        mediaList: mediaFiles,
        createdAt: Date.now()
      }

      // add post to collection
      this.afs.collection<Post>('post').doc(community).update({
        posts: firebase.firestore.FieldValue.arrayUnion(newPost) // merge in context community
      })
        .then(resp => {
          this.router.navigateByUrl('dc/community/feed/' + community);
          this.postToast()
        })
        .catch(err => {
          // modify or remove the <Post> type
          this.afs.collection<Post>('post').doc(community).set({
            posts: firebase.firestore.FieldValue.arrayUnion(newPost) // merge in context community
          }).then(resp => {
            this.router.navigateByUrl('dc/community/feed/' + community);
            this.postToast()
          })
        })
    }
  }

  // fetch user timeline or home feed
  // contains every post from all communities the current user opted in

  fetchUserFeeds() {
    // user uid
    const userUID = localStorage.getItem('dcUserUID');
    // fetch post
    return this.afs.collection<any>('post').valueChanges();
  }

  // comment on post
  postComment(community, postId, comment, photoUrl, name) {
    // get post deep in community
    // merge the comment array with new comment
    this.afs.collection('post').doc(community).update({

    })
  }

  fetchLikesCounters() {
    this.afs.collection('likesCounter').valueChanges().subscribe(postLikes => {
      this.postLikes = postLikes;
      this.postLikesSubject.next(this.postLikes);

      console.log(this.postLikes)
    })
  }

  // like post
  // toggle post like
  likesSub = new Subject<any>();
  postIsLiked = false;

  // check if user liked the post
  isPostLike(postid, userUID) {
    this.postLikesSubject.next(this.postLikes);
    var resp;
    this.postLikes.forEach(posts => {
      if (posts.userUID.includes(userUID)) {
        resp = true
        return true;
      }
      else {
        resp = false
        return false
      }
    })
    return resp;
  }


  // check if post exist
  postExitSub = new Subject<any>();
  postExit = false;

  isPostExist(postid) {
    this.postLikesSubject.next(this.postLikes);
    var resp;
    this.postLikes.forEach(posts => {
      console.log(posts)
      if (posts.postId == postid) {
        resp = true
        return true;
      }
      else {
        resp = false
        return false
      }
    })
    return resp;
  }

  // like post
  onPostLike(postid) {
    // post exist
    if (this.isPostExist(postid) === true) {
      // check if user already like post
      if (this.isPostLike(postid, localStorage.getItem('dcUserUID')) === true) {
        console.log('has liked')
        this.afs.collection('likesCounter').doc(postid).update({
          likes: firebase.firestore.FieldValue.increment(-1),
          userUID: firebase.firestore.FieldValue.arrayRemove(localStorage.getItem('dcUserUID'))
        })
      }
      // user has not liked post
      if (this.isPostLike(postid, localStorage.getItem('dcUserUID')) === false) {
        console.log('not liked')
        this.afs.collection('likesCounter').doc(postid).update({
          likes: firebase.firestore.FieldValue.increment(1),
          userUID: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('dcUserUID'))
        })
      }
    }
    // post does not exist
    if (this.isPostExist(postid) === false) {
      console.log('Post does not exit')
      this.afs.collection('likesCounter').doc(postid).set({
        postId: postid,
        likes: firebase.firestore.FieldValue.increment(1),
        userUID: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('dcUserUID'))
      })
    }


  }

  communitylikesCounterSubject = new Subject<likesCounter[]>();
  communitylikesCounter: likesCounter[] = [];

  // fetch all post Likes
  fetchPostLikes() {
    this.afs.collection<any>('likesCounter').valueChanges().subscribe(
      commLikes => {
        this.communitylikesCounter = commLikes;
        this.communitylikesCounterSubject.next(this.communitylikesCounter)
      }
    );
  }

  getPostLikes(id) {
    return this.communitylikesCounter.filter(e => e.postId === id)
  }

  // post toast controller
  async postToast() {
    const toast = await this.toastController.create({
      duration: 3000,
      message: 'Post added to timeline',
      position: 'top',
    });
    toast.present();
  }
} 
