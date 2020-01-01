import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  cusdata:any = {};
  postdata:any = {};
  U_ID:number;
  //U_ID: number;
  user_id: string;
  u_name: string= "";
  position: string= "";
  tell: string= "";
  username: string= "";
  Npass: string= "";
  customer_pass_con: string= "";
  user:any = JSON.parse(Cookie.get('cookieName'));
  constructor(
    private router: Router,
    private storage: Storage,
    private actRoute: ActivatedRoute,
    public http: HttpClient,
    public cookie: Cookie,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
   /*  this.actRoute.params.subscribe((data: any) =>{
      this.U_ID = data.U_ID;
      this.name = data.name;
      
  		console.log(data);
  	}); */
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

  async updateProses(){
    if(this.cusdata.u_name==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก ชื่อ',
        duration: 3000
      });
      toast.present();
    }else if(this.cusdata.position==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก ตำแหน่ง',
        duration: 3000
      });
      toast.present();  
    }else if(this.cusdata.tell==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก เบอร์โทร',
        duration: 3000
      });
      toast.present();  
    }else if(this.cusdata.username==""){
      const toast = await this.toastCtrl.create({
        message: 'กรุณากรอก Username',
        duration: 3000
      });
      toast.present();
      
    }else{

  	let url:string = "https://devman01.000webhostapp.com/server_api/update_profile.php";
    
        let dataPost = new FormData();
        dataPost.append('user_id', this.cusdata.user_id);
        dataPost.append('u_name', this.cusdata.u_name);
        dataPost.append('username', this.cusdata.username);
        dataPost.append('position', this.cusdata.position);
        dataPost.append('tell', this.cusdata.tell);

      let callback:Observable<any>  = this.http.post(url,dataPost);
      callback.subscribe(async call =>{
        var alertmsg = call.msg;
       if(call.status == 200){
        //alert(call.msg);  
        console.log(call);
        this.router.navigate(['/tabs/tab4']);
        const toast = await this.toastCtrl.create({
          message: 'แก้ไขข้อมูลสำเร็จ',
          duration: 4000
        });
        toast.present();
          
        }else{
        // alert(call.msg);
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
