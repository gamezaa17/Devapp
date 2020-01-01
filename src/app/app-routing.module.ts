import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'scanner', loadChildren: './scanner/scanner.module#ScannerPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  /*{ path: 'test', loadChildren: './test/test.module#TestPageModule' },
   { path: 'security', loadChildren: './security/security.module#SecurityPageModule' },
  { path: 'customer', loadChildren: './customer/customer.module#CustomerPageModule' },
  { path: 'job', loadChildren: './job/job.module#JobPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' } */
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
