import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirportListComponent } from './features/airports/airport-list/airport-list.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { AirportDetailsComponent } from './features/airports/airport-details/airport-details.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { TopTenListComponent } from './features/airports/top-ten-list/top-ten-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AirportListComponent,
    HeaderComponent,
    AirportDetailsComponent,
    TopTenListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: LoadingInterceptor, 
      multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
