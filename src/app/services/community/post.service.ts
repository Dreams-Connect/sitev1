import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private afs: AngularFirestore) { }

  newPost: Post;

  createPost(post: Post) {
    // upload files
    // retrieve file id
    // build post
    // add media download url to post mediaList

  }
}
