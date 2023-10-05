import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { OutputFormComponent } from './output-form/output-form.component';
import { TablePageComponent } from './table-page/table-page.component';

const routes: Routes = [
    { path: 'movement/in', component: InputFormComponent },
    { path: 'movement/out', component: OutputFormComponent },
    { path: 'movement/list', component: TablePageComponent }
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
