import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { ReactiveComponentModule } from '@ngrx/component';
import { IdentityComponent } from './components/identity/identity.component';
import { ClientComponent } from './components/client/client.component';
import { ThreadsComponent } from './components/threads/threads.component';
import { AppStoreModule } from './store/store.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CollectionsComponent } from './components/collections/collections.component';
import { ApplicationService } from './services/application.service';

@NgModule({
  declarations: [
    AppComponent,
    IdentityComponent,
    ClientComponent,
    ThreadsComponent,
    CollectionsComponent
  ],
  imports: [
    ReactiveComponentModule,
    NgxJdenticonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppStoreModule.forRoot(),
    FormsModule,
    IonicModule.forRoot()
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
