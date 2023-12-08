import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import PostData from './post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class RequestService {  
  loadedPosts:PostData[]=[];
  
  constructor(private http:HttpClient) { }
  
  createStorePost(title:string,content:string): void {
    const postData:PostData={title:title,content:content}
    this.http.post<{name:string,content:string}>('https://ng-complete-guide-30000-default-rtdb.firebaseio.com/posts.json',postData)
    .subscribe(response =>{
      console.log(response);
    });
  }

  deletePost(): Observable<PostData[]> {
    return this.http.delete<PostData[]>('https://ng-complete-guide-30000-default-rtdb.firebaseio.com/posts.json');
  }

  fetchPost(): Observable<PostData[]> {
    return this.http
        .get<PostData[]>(
          'https://ng-complete-guide-30000-default-rtdb.firebaseio.com/posts.json'
        )
        .pipe(
          map(responseData => {
            const postsArray: PostData[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key], id: key });
              }
            }
            return postsArray;
          })
        );
    }
}

