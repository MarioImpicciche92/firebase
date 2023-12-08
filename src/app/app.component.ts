import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 

import PostData from './post.model';
import { RequestService } from './request.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:PostData[]=[];
  isFetching = true;

  constructor(private requestService:RequestService) {}

  ngOnInit():void {
    this.onFetchPosts();
  }

  onCreatePost(postData:PostData):void {
    // Send Http request
    this.requestService.createStorePost(postData.title,postData.content);
    
  }

  onFetchPosts():void {
    this.fetchPost();    // Send Http request
  }

  onClearPosts():void {
    // Send Http request
    this.requestService.deletePost().subscribe(() => this.loadedPosts = []);
  }

  fetchPost():void {
      this.isFetching = true;
      this.requestService.fetchPost()
        .subscribe(posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
        });
  }
  
}

