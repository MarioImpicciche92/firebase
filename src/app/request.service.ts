import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { postData } from './post.model';

@Injectable({
  providedIn: 'root'

})
export class RequestService {  
  createStorePost(title:string,content:string)
  {
    const postData:postData={title:title,content:content}
    this.http.post<{name:string,content:string}>('https://ng-complete-guide-30000-default-rtdb.firebaseio.com/posts.json',postData)
    .subscribe(response =>{
      console.log(response);
    }
    );
  }
  loadedPosts:postData[]=[];

  deletePost()
{
  this.http.delete('https://ng-complete-guide-30000-default-rtdb.firebaseio.com/posts.json').subscribe(
    ()=>{
      this.loadedPosts=[];
    });
  
}
  constructor(private http:HttpClient) { }
}

