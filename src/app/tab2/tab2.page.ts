import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from '@ionic/angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  leave_id: string = '';
  user_id: string;
  staff_name: string;
  entry_isChecked:string;
  public form = [
    { val: 'ลาป่วย', isChecked: true },
    { val: 'ลากิจ', isChecked: false },
    { val: 'ลาพักร้อน', isChecked: false }
  ];
  type_leave: string;
  leave_start: string;
  leave_stop: string;
  leave_note: string;
  postdata: any = {};
  user:any = JSON.parse(Cookie.get('cookieName'));
  id:number;
  constructor(
    private router: Router,
    private storage: Storage,
    public http: HttpClient,
    public loadingController: LoadingController,
    public cookie: Cookie,
    public toastCtrl: ToastController,
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('session_storage').then((res)=>{
      
     console.log(res);
     this.loadAllow(this.user.user_id);
   }); 
  }

  loadAllow(id){
    let url:string = "https://devman01.000webhostapp.com/server_api/show_profile.php";  
        
    let dataPost = new FormData();
    //dataPost.append('user_id', this.jobdata.user_id);
    dataPost.append('user_id', id);
    //dataPost.append(this.jobdata.aksi , 'job');
  
  
   let data:Observable<any>  = this.http.post(url,dataPost);
      data.subscribe( res => {
              
        if(res != null){
          this.postdata=res[0];
          console.log(res);   
        }else{
          console.log("Fail.");
          console.log(res);
        }
  });
}

  onTypeleave() {

        let url:string = "https://devman01.000webhostapp.com/server_api/insert_leave.php";
    
        let dataPost = new FormData();
        //dataPost.append('leave_id', this.postdata.leave_id);
        dataPost.append('user_id', this.postdata.user_id);
        dataPost.append('staff_name', this.postdata.staff_name);
        dataPost.append('entry_isChecked' , this.postdata.entry_isChecked);
        dataPost.append('leave_start', this.postdata.leave_start);
        dataPost.append('leave_stop', this.postdata.leave_stop);
        dataPost.append('allow', this.postdata.allow);
        dataPost.append('leave_note', this.postdata.leave_note); 

        let callback:Observable<any>  = this.http.post(url,dataPost);
        callback.subscribe(async call =>{
          var alertmsg = call.msg;        
        if(call.status == 200){
        //alert(call.msg);
        console.log(call);
        this.router.navigate(['/tabs/tab3']);
        const toast = await this.toastCtrl.create({
          message: 'ส่งข้อมูลสำเร็จ',
          duration: 4000
        });
        toast.present();
          
		  }else{
        //alert(call.msg);
        console.log(call);
        const toast = await this.toastCtrl.create({
          message: alertmsg,
          duration: 3000
        });
        toast.present();
      }    
        
    });


    /* return new Promise(resolve => {
      let body = {
        aksi : 'addtypeleave',
        user_id : this.user_id,
        leave_id : this.leave_id,
        staff_name : this.staff_name,
        leave_start : this.leave_start,
        leave_stop : this.leave_stop,
        leave_note : this.leave_note,
        entry_isChecked:this.entry_isChecked,
        staff_id: this.staff_id,
        
      };
    
      this.postPvdr.postData(body, 'proses_api.php').subscribe(data => {
        this.router.navigate(['/tabs']);
          console.log('OK');   
          });    
        }); */
        
  }
        /* doRefresh(event){
          setTimeout(() =>{
            this.ionViewWillEnter();
            event.target.complete();
          }, 500);
        } */
}
