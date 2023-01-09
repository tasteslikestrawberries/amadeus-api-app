import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirportListComponent } from './features/airports/airport-list/airport-list.component';
import { AirportResolver } from './shared/guards/airport.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "airports",
    pathMatch: 'full'
  },
  {
    path: "airports",
    component: AirportListComponent,
  },
  {
    path: "airports/:id",
    component: AirportListComponent,

    resolve: {
      airport: AirportResolver
    },
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
