import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Plugins, NetworkStatus } from '@capacitor/core';
import { PluginListenerHandle } from '@capacitor/core/dist/esm/web/network';
const { Network } = Plugins;
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;

  //scannedData:any={};
  locationCoords: any;
  timetest: any;
  
  qr_id: string /* ="QmlUZWNo" */;
  gps_in: string;
  user_id: string;
  myCookie: string;
  user:any = {};
  Tdata:any = {};
  constructor(
    private router: Router,
    public scanner:BarcodeScanner,  
    private geo: Geolocation,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    public cookie: Cookie,
    public http: HttpClient,
    private storage: Storage
    ) {

      this.locationCoords = {
        latitude: "",
        longitude: "",
        accuracy: "",
        timestamp: ""
      }
      this.timetest = Date.now();

      //this.user;
      /* this.user_id = '',
      this.qr_id = '',
      this.time_in = '',
      this.gps_in = '' */
      
      
    }

  async ngOnInit() { 
    
    /* this.router.navigate[('/login')];

    this.networkListener = Network.addListener(
      'networkStatusChange', 
      status => {
      console.log(`Network status changed`, status);
      this.networkStatus = status;
      alert('Network!');
      },
    );
    this.networkStatus = await Network.getStatus(); */
  }

  /* ngOnDestroy(): void {
    this.networkListener.remove();
  } */

ionViewWillEnter(){
  
  
  /* Cookie.set('cookieName', this.user.user_id);
  
  this.myCookie = Cookie.get('cookieName'); */
  
  //this.user= Cookie.get('cookieName')!="" ? JSON.parse(Cookie.get('cookieName')):{username: "",user_id: ""};
  
    //this.loaduser(this.user.user_id);
    console.log(this.user);
}

  getuser(){
    this.user= Cookie.get('cookieName')!="" ? JSON.parse(Cookie.get('cookieName')):{username: "",user_id: ""};
    return this.user.username;
  }

  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          this.askToTurnOnGPS();
        } else {
       
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
    
  }
 
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
 
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.scanin()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }


  scanin() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      //prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      //formats: 'QR_CODE,PDF_417 ',
      //orientation: 'landscape',
    };

    this.scanner.scan(options).then(barcodedata => {
      this.qr_id = barcodedata.text;
      //alert(this.scannedData.text);
    }).catch(err => {
        console.log('Error', err);
        alert('Error' +err);
    });
             
    this.geo.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
      this.testInsert();
    }).catch((error) => {
      alert('Error getting location' + error);
    });
        
  }
   
  testInsert(){


    let url:string = "https://devman01.000webhostapp.com/server_api/insert_time.php";
    
    let dataPost = new FormData();
    
    dataPost.append('user_id', this.user.user_id);
    dataPost.append('qr_id', this.qr_id); 
    dataPost.append('gps_in', this.locationCoords.latitude.toString()+',' +this.locationCoords.longitude.toString());
    
    let callback:Observable<any>  = this.http.post(url,dataPost);
    callback.subscribe(async call =>{
      var alertmsg = call.msg;
   if(call.status == 200){
    //alert(call.msg);
    
    console.log(call);
    this.router.navigate(['/tabs/tab1']);
    const toast = await this.toastCtrl.create({
      message: 'สำเร็จ!',
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
  }

  async Logout(){   
    this.storage.clear();
    //Cookie.set('cookieName', "");
    this.router.navigate(['/login']);
    const toast = await this.toastCtrl.create({
        message: 'ออกจากระบบเรียบร้อยแล้ว',
        duration: 3000
      });
    toast.present();
  }

  doRefresh(event){
  	setTimeout(() =>{
  		this.ionViewWillEnter();
  		event.target.complete();
  	}, 500);
  }

}
