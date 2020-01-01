import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from '../../providers/post-provider';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AlertController } from '@ionic/angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logindata: any = {};
  anggota: any;
  username: string;
  pass: string;
  user_id: string;
  user:any = {username: "",user_id: ""};
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public http: HttpClient,
    private alertCtrl: AlertController,
    public cookie: Cookie
  ) { 
    this.logindata.username = "";
    this.logindata.pass = "";
    this.logindata.user_id = "";
    //this.user= Cookie.get('cookieName')!="" ?JSON.parse(Cookie.get('cookieName')):{username: "",user_id: ""};
  }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['/register']);
  }

   async prosesLogin() {
    if(this.logindata.username != "" && this.logindata.pass!= ""){
      console.log("username:",this.logindata.username);
      //console.log("user_id:",this.logindata.user_id);

      let url:string = "https://devman01.000webhostapp.com/server_api/login.php";
      /*let dataPost = JSON.stringify({
        username:this.logindata.username,
        pass:this.logindata.pass 
      }); */
       let dataPost = new FormData();
        dataPost.append('username', this.logindata.username);
        dataPost.append('pass', this.logindata.pass);

        /* let dataPost = {
          username: this.logindata.username,
          pass: this.logindata.pass,
          aksi: 'login'
        }; */

      let data:Observable<any>  = this.http.post(url,dataPost);
      data.subscribe(async res =>{
      var alertpesan = res.msg;
       if(res != null){
        this.storage.set('session_storage', res[0].user_id);
        console.log(res);
        //this.alertPopup("แจ้งเตือน","ลงชื่อเข้าใช้งานสำเร็จ");
        Cookie.set('cookieName', JSON.stringify(res[0]));
        this.user = await res[0];
        const toast = await this.toastCtrl.create({
          message: 'ล็อคอินเข้าใช้งานสำเร็จ!',
          duration: 2000
        });
        toast.present();

        console.log(this.user);
        this.router.navigate(['/tabs/tab1']); 
        
		  }else{
        console.log("Login Fail.");
        //this.alertPopup("แจ้งแตือน","Login Fail.");
        const toast = await this.toastCtrl.create({
          message: alertpesan,
          duration: 2000
        });
          toast.present();
      }
    });

    }else{
      const toast = await this.toastCtrl.create({
        message: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง',
        duration: 2000
        });
        toast.present();        
    }
    console.log();
  }

  /* async alertPopup(title:string, Msg:string){
    const alert = await this.alertCtrl.create({
      header: Msg,
      subHeader: title,
      buttons: ['OK']
    });
    await alert.present
  }  */

  /* async prosesLogin(){
    if(this.username != "" && this.username != ""){
      let body = {
        username: this.username,
        pass: this.pass,
        aksi: 'login'
      };

      this.postPvdr.postData(body, 'proses_api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.storage.set('session_storage', data.result);
          this.router.navigate(['/tabs']);
          const toast = await this.toastCtrl.create({
		    message: 'ล็อคอินเข้าใช้งานสำเร็จ!',
		  	duration: 2000
		  });
		  toast.present();
		  this.username = "";
		  this.pass = "";
          console.log(data);
        }else{
          const toast = await this.toastCtrl.create({
		    message: alertpesan,
		    duration: 2000
		  });
    	  toast.present();
        }
      });

    }else{
      const toast = await this.toastCtrl.create({
		message: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง',
		duration: 2000
	  });
	  toast.present();
    }
    console.log();
  
  } */
  doRefresh(event){
  	setTimeout(() =>{
  	//	this.ionViewWillEnter();
  		event.target.complete();
  	}, 500);
  }

}
