import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockBackendInterceptor } from './services/mock-backend-interceptor.service';
import { MovementFormComponent } from './movement-form/movement-form.component';
import { HeaderComponent } from './header/header.component';
import { CommonFormComponent } from './common-form/common-form.component';
import { OutputFormComponent } from './output-form/output-form.component';
import { TablePageComponent } from './table-page/table-page.component';
import { TableComponent } from './table/table.component';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        InputFormComponent,
        MovementFormComponent,
        HeaderComponent,
        CommonFormComponent,
        OutputFormComponent,
        TablePageComponent,
        TableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockBackendInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
