import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private postPvdr: PostProvider,
    private storage: Storage,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public cookie: Cookie,
  ) { }

  
  limit: number = 4;
  start: number = 0;
  username: string;
  leave_id: number;
  user_id: string;
  leave_app: string;
  allow: string;
  type_leave: string;
  leave_day: string;
  leave_note: string;
  staff_name: string;

  allows: any = {};
  user:any = JSON.parse(Cookie.get('cookieName'));
  
  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
     this.user_id= this.user_id;
     this.leave_id = this.leave_id;
     this.staff_name = this.staff_name;
     this.type_leave = this.type_leave;
     this.leave_day = this.leave_day;
     this.leave_note = this.leave_note;
     this.allow = this.allow;
     this.leave_app = this.leave_app;
     console.log(res);
     this.loadAllow(this.user.user_id);
   }); 
   /* this.allows = [];
   this.start = 0; */
   
 }

 loadAllow(id){
  let url:string = "https://devman01.000webhostapp.com/server_api/showallow.php";  
      
  let dataPost = new FormData();
  //dataPost.append('user_id', this.jobdata.user_id);
  dataPost.append('user_id', id);
  //dataPost.append(this.jobdata.aksi , 'job');


 let data:Observable<any>  = this.http.post(url,dataPost);
    data.subscribe( res => {
            
      if(res != null){
        this.allows=res[0];
        console.log(res);   
      }else{
        console.log("Allow Fail.");
        console.log(res);
      }
});
  /* return new Promise(resolve => {
    
    let body = {
      user_id : this.user_id,
      aksi : 'ShowAllow',
      limit : this.limit,
      start : this.start,
    };

    this.postPvdr.postData(body,'proses_api.php').subscribe(data => {
      for(let Allow of data.result){
        this.allows.push(Allow);
      }
      resolve(true);
    });
  }); */
}
doRefresh(event){
  setTimeout(() =>{
    this.ionViewWillEnter();
    event.target.complete();
  }, 300);
}


}
