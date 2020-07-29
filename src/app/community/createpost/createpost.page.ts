import { PostService } from './../../services/community/post.service';
import { Subscription } from 'rxjs';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { currentUser } from 'src/app/model/user';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.page.html',
  styleUrls: ['./createpost.page.scss'],
})
export class CreatepostPage implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute,
    private sharedService: SharedService,
    private postService: PostService
  ) { }

  currentCommunity;

  selectedMedia: any[] = [];
  previewSelectedMedia: any[] = [];

  ngOnInit() {
    // get current community
    this.route.paramMap.subscribe(param => {
      if (!param.has('id')) {
        return;
      }
      this.currentCommunity = param.get('id')
    })
  }

  onSubmit(post) {
    this.postService.createPost(post, this.currentCommunity, this.previewSelectedMedia);
  }

  // on media select? display media media types [images, video, music/audio]
  // show delete button for each media to remove from array
  onFileInput(files) {
    this.selectedMedia = files.target.files;
    this.previewFile();
  }

  // preview media
  previewFile() {
    if (this.selectedMedia.length > 0) {
      // preview container
      let previews = document.querySelector('.previewMedia');
      // loop media to preview
      for (let i = 0; i < this.selectedMedia.length; i++) {
        var index = Math.floor(Math.random() * Math.floor(20))
        var mimeType = this.selectedMedia[i].type;
        // image 
        if (mimeType.indexOf('image') !== -1) {
          let reader = new FileReader();
          reader.readAsDataURL(this.selectedMedia[i]);
          reader.onload = (_event) => {
            this.previewSelectedMedia.push({
              'type': 'image',
              'data': reader.result,
              'index': index + i,
              'file': this.selectedMedia[i],
            })
          }
        }
        // video
        if (mimeType.indexOf('video') !== -1) {
          let reader = new FileReader();
          reader.readAsDataURL(this.selectedMedia[i]);
          reader.onload = (_event) => {
            this.previewSelectedMedia.push({
              'type': 'video',
              'data': reader.result,
              'index': index + i,
              'file': this.selectedMedia[i],
            })
          }
        }
      }
    }
  }

  removeMedia(index) {
    this.previewSelectedMedia = this.previewSelectedMedia.filter(media => media.index !== index)
    console.log(this.selectedMedia)
  }

  ngOnDestroy(): void {

  }
}
