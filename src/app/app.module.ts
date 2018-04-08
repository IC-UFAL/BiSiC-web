///<reference path="../../node_modules/@angular/platform-browser/animations/src/module.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule, MatInputModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';
import { MaterializeModule } from 'angular2-materialize';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { DataService } from './data/data.service';
import { BookComponent } from './book/book.component';
import { BookService } from './book/book.service';
import { AuthGuard } from './auth.guard';

const APP_ROUTES: Routes = [
  { path: 'login', component: AuthenticationComponent},
  {
    path: 'data',
    component: DataComponent,
    canActivate: [AuthGuard]
  },
  { path: '' , component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AuthenticationComponent,
    DataComponent,
    BookComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MaterializeModule,
    routing,
  ],
  providers: [AuthenticationService, DataService, BookService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
