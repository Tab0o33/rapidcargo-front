import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { OutputFormComponent } from './output-form/output-form.component';

const routes: Routes = [
    { path: 'movement/in', component: InputFormComponent },
    { path: 'movement/out', component: OutputFormComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
