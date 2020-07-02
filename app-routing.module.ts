import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './src/app/home/home.component';
import { CityDetailsComponent } from './src/app/city-details/city-details.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'city/:location', component: CityDetailsComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }