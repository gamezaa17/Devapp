import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {

  cusdata:any = {};
  //Npass: string= "";
  customer_pass_con: string= "";
  con_pass: string= "";
  user:any = JSON.parse(Cookie.get('cookieName'));
  constructor(
    private router: Router,
    private storage: Storage,
    public http: HttpClient,
    public cookie: Cookie,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      
      console.log(res);
      this.loadcus(this.user.user_id);
    });

  }

  loadcus(U_ID){
    let url:string = "https://devman01.000webhostapp.com/server_api/show_profile.php";

    let dataPost = new FormData();
    //dataPost.append('user_id', this.jobdata.user_id);
    dataPost.append('user_id', U_ID);
    //dataPost.append(this.jobdata.aksi , 'job');

  
   let data:Observable<any>  = this.http.post(url,dataPost);
      data.subscribe( res => {
              
        if(res != null){
          this.cusdata=res[0];         
          console.log(res);

        }else{
          console.log("load Fail.");
          console.log(res);
         // this.alertPopup("แจ้งแตือน","Login Fail.");
        }
  });
  }

  async updatePass(){
     /* if(this.cusdata.con_pass==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก รหัสผ่านเดิม!!!',
        duration: 3000
      });
      toast.present();

    }else if(this.cusdata.con_pass!=this.cusdata.Cus_pass){
      const toast = await this.toastCtrl.create({
        message: 'รหัสผ่านเดิมไม่ตรงกัน',
        duration: 3000
      });
      toast.present();

    }else if(this.cusdata.cus_new_pass==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก รหัสผ่านใหม่!!!',
        duration: 3000
      });
      toast.present();

    }else if(this.cusdata.cus_new_pass!=this.cusdata.cus_confirm_pass){
      const toast = await this.toastCtrl.create({
        message: 'รหัสผ่านไม่ตรงกัน!!!',
        duration: 3000
      });
      toast.present();
      
    }else{  */

  	let url:string = "https://devman01.000webhostapp.com/server_api/update_pass.php";
    
        let dataPost = new FormData();
        dataPost.append('user_id', this.cusdata.user_id);
        dataPost.append('pass' , this.cusdata.pass);
        /* dataPost.append('cus_new_pass' , this.cusdata.cus_new_pass);
        dataPost.append('cus_confirm_pass' , this.cusdata.cus_confirm_pass); */

      let callback:Observable<any>  = this.http.post(url,dataPost);
      callback.subscribe(async call =>{
        //var alertmsg = call.msg;
       if(call.status == 200){
        alert(call.msg);
        
        console.log(call);
        this.router.navigate(['/tabs/tab4']);
        /* const toast = await this.toastCtrl.create({
          message: 'เปลี่ยนรหัสผ่านแล้ว',
          duration: 4000
        });
        toast.present(); */
          
		  }else{
        alert(call.msg);
        console.log(call);
        /* const toast = await this.toastCtrl.create({
          message: alertmsg,
          duration: 3000
        });
        toast.present(); */
      }    
        
      });

    }
  
  

}
