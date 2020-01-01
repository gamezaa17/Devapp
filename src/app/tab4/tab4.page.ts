import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController} from '@ionic/angular';
//import { NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  [x: string]: any;
  anggota: any;
  username: string = "";
  user_id: string = "";

  dataitem:any = {};
  
  U_ID:number;
  
  customers: any = [];
  limit: number = 13; // LIMIT GET PERDATA
  start: number = 0;
  user:any = JSON.parse(Cookie.get('cookieName'));
  constructor(
    private router: Router,
    public toastCtrl: ToastController,
    private storage: Storage,
    public http: HttpClient,
    public cookie: Cookie,
    //public navParams: NavParams
  ) { 

    /*  */
    /* this.loadData(); */
  }

  ngOnInit() {
    
  }
  
  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
        this.dataitem = res;
      this.user_id= this.dataitem.user_id;
      this.u_name = this.dataitem.u_name;
      console.log(res);
      this.loadData(this.user.user_id);
    });

  	/* this.customers = [];
  	this.start = 0;
  	 this.loadCustomer(); */ 
  }

  updateCustomer(U_ID:number,name: string,user: string,position: string,tell: string){
  	this.router.navigate(['/tabs/customer',{user_id:U_ID,u_name:name,username:user,position:position,tell:tell}]);
  }
  updatePass(U_ID:number,pass: string){
    this.router.navigate(['/tabs/security',{user_id:U_ID,pass:pass}]);
  }

  loadData(id){
    let url:string = "https://devman01.000webhostapp.com/server_api/show_profile.php";

    let dataPost = new FormData();
    
    dataPost.append('user_id', id);

   let data:Observable<any>  = this.http.post(url,dataPost);
      data.subscribe( res => {
              
        if(res != null){
          this.dataitem=res[0];         
          console.log(res);

        }else{
          console.log("load Fail.");
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

  async Logout(){   
    //this.storage.clear();
    Cookie.set('cookieName', "");
    this.router.navigate(['/login']);
    const toast = await this.toastCtrl.create({
        message: 'ออกจากระบบเรียบร้อยแล้ว',
        duration: 3000
      });
    toast.present();
  }

  

}
