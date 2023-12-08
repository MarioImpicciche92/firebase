import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 

import { postData } from './post.model';
import { RequestService } from './request.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:postData[]=[];
  isFetching = true;

  constructor(private http: HttpClient,private requestService:RequestService) {}

  ngOnInit():void {
    this.onFetchPosts();
  }

  onCreatePost(postData:postData) {
    // Send Http request
    this.requestService.createStorePost(postData.title,postData.content);
    
  }

  onFetchPosts() {
    this.fetchPost();    // Send Http request
  }

  onClearPosts() {
    // Send Http request
    this.requestService.deletePost();
    
  }
  fetchPost()
  {
    
      this.isFetching = true;
      this.http
        .get<{ [key: string]: postData }>(
          'https://ng-complete-guide-30000-default-rtdb.firebaseio.com/posts.json'
        )
        .pipe(
          map(responseData => {
            const postsArray: postData[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key], id: key });
              }
            }
            return postsArray;
          })
        )
        .subscribe(posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
        });
  }
  
}
