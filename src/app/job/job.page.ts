import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlertController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  jobs: any = [];
  /* limit: number = 4;
  start: number = 0; */
  username: string;
  job_id: number;
  locations: string;
  lo_address: string;
  lo_tell: string;
  work_start: string;
  work_stop: string;
  work_name: string;
  w_id: string;
  //anggota: any;
  user_id: string;
  myCookie: string;

  jobdata: any = {};
  user:any /* = JSON.parse(Cookie.get('cookieName')) */;

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
    public cookie: Cookie,
  ) { 
    /* this.locations = "";
    this.lo_address = "";
    this.lo_tell = "";
    this.work_start = "";
    this.work_stop = ""; 
    this.user_id = "";  */
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.user= Cookie.get('cookieName')!="" ?JSON.parse(Cookie.get('cookieName')):{username: "",user_id: ""};
    /* this.storage.get('session_storage').then((res)=>{
      this.user_id= this.user_id;
      this.w_id= this.w_id;
      this.work_name= this.work_name;
      this.lo_address= this.lo_address;
      this.lo_tell= this.lo_tell;
      this.work_start= this.work_start;
      this.work_stop= this.work_stop;
      console.log(res); 
      
      this.loadJob(this.user.user_id); 
    });  */
    /* this.jobs = [];
    this.start = 0;*/
    this.loadJob(this.user.user_id); 
   console.log("656565");
  }
  
  loadJob(id){
    let url:string = "https://devman01.000webhostapp.com/server_api/showjob.php";  
      
  		let dataPost = new FormData();
      //dataPost.append('user_id', this.jobdata.user_id);
      dataPost.append('user_id', id);
      //dataPost.append(this.jobdata.aksi , 'job');

    
     let data:Observable<any>  = this.http.post(url,dataPost);
        data.subscribe( res => {
                
          if(res != null){
            this.jobdata=res[0];
                   
            console.log(res);

          }else{
            console.log("Job Fail.");
            console.log(res);
           // this.alertPopup("แจ้งแตือน","Login Fail.");
          }
    });
    
  }
  
  doRefresh(event){
  	setTimeout(() =>{
      this.ionViewWillEnter();
      event.target.complete();
  	}, 500);
  }

}
