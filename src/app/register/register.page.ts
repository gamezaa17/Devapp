import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { AlertController } from '@ionic/angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  postdata: any = {};
  u_name: string= "";
  position: string= "";
  tell: string= "";
  username: string= "";
  pass: string= "";
  customer_pass_con: string= "";
 
  constructor(
    private router: Router,
    //private storage: Storage,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public http: HttpClient,
    //private alertCtrl: AlertController,
    public cookie: Cookie
  ) { }

  ngOnInit() {
  }

  async save(){
    if(this.u_name==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก ชื่อ',
        duration: 3000
      });
      toast.present();
    }else if(this.position==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก ตำแหน่ง',
        duration: 3000
      });
      toast.present();  
    }else if(this.tell==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก เบอร์โทร',
        duration: 3000
      });
      toast.present();  
    }else if(this.username==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก Username',
        duration: 3000
      });
      toast.present();
    }else if(this.pass==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก รหัสผ่าน',
        duration: 3000
      });
      toast.present();
    }else if(this.pass!=this.customer_pass_con){
      const toast = await this.toastCtrl.create({
        message: 'รหัสผ่านไม่ตรงกัน',
        duration: 3000
      });
      toast.present();
      
    }else{
  
        let url:string = "https://devman01.000webhostapp.com/server_api/insertdata.php";

        let dataPost = new FormData();
        dataPost.append('u_name', this.u_name);
        dataPost.append('username', this.username);
        dataPost.append('pass', this.pass);
        dataPost.append('position', this.position);
        dataPost.append('tell', this.tell);

        let callback:Observable<any>  = this.http.post(url,dataPost)
        callback.subscribe(async call =>{
        var alertmsg = call.msg;         
        if(call.status == 200){
          //alert(call.msg);
          console.log(call);
          this.router.navigate(['/login']);
          const toast = await this.toastCtrl.create({
            message: 'สมัครสมาชิกสำเร็จแล้ว',
            duration: 3000
          });
          toast.present();
          
        }else{
          //alert(call.msg);
          //alert(call.msg2);
          console.log(call);
          const toast = await this.toastCtrl.create({
            message: alertmsg,
            duration: 3000
          });
          toast.present();
        }    
        
      });
    
    }
  }

}
