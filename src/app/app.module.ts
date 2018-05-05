///<reference path="../../node_modules/@angular/platform-browser/animations/src/module.d.ts"/>
///<reference path="../../node_modules/@angular/material/menu/typings/menu-module.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatCardModule, MatDialog, MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './shared/authentication.service';
import { DataComponent } from './data/data.component';
import {NewBookInstanceDialog, NominalBookComponent} from './book/nominal-book.component';
import { BookService } from './book/shared/book.service';
import { AuthGuard } from './shared/auth.guard';
import { AboutComponent } from './about/about.component';
import { DonationComponent } from './donation/donation.component';
import { UserResolver } from './shared/user.resolver';
import { SearchComponent } from './search/search.component';
import { NewOrEditNominalBookComponent } from './book/new-or-edit-nominal-book/new-or-edit-nominal-book.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DonationsComponent } from './notifications/donations/donations.component';
import {DonationsService} from './notifications/donations/donations.service';
import { LocationsComponent } from './notifications/locations/locations.component';
import {UserService} from './shared/user.service';
import {LocationsService} from './notifications/locations/locations.service';
import { NewLocationComponent } from './location/new-location.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    resolve: {
      user: UserResolver
    },
    children: [
      { path: 'sobre', component: AboutComponent},
      {
        path: 'doacao',
        component: DonationComponent
      },
      { path: 'login', component: LoginComponent },
      {
        path: 'dados',
        component: DataComponent,
        canActivate: [AuthGuard]
      },
      { path: 'buscar/:termo', component: SearchComponent },
      {
        path: 'livro',
        children: [
          { path: 'novo', component: NewOrEditNominalBookComponent },
          {
            path: ':cod',
            children: [
              {path: 'editar', component: NewOrEditNominalBookComponent },
              {path: '', component: NominalBookComponent }
            ]
          }
        ]
      },
      { path: 'locacao/nova', component: NewLocationComponent },
      { path: 'notificacoes', component: NotificationsComponent },
      { path: '' , component: HomeComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    DataComponent,
    NominalBookComponent,
    AboutComponent,
    DonationComponent,
    SearchComponent,
    NewOrEditNominalBookComponent,
    NotificationsComponent,
    DonationsComponent,
    LocationsComponent,
    NewLocationComponent,
    NewBookInstanceDialog
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    routing,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTabsModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  entryComponents: [
    NewBookInstanceDialog
  ],
  providers: [
    AuthenticationService,
    BookService,
    AuthGuard,
    UserResolver,
    DonationsService,
    UserService,
    LocationsService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
