import { Component } from '@angular/core';
import { MovementService } from '../services/movement.service';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-movement-form',
    templateUrl: './movement-form.component.html',
    styleUrls: ['./movement-form.component.scss']
})
export class MovementFormComponent {

    form!: FormGroup;

    constructor(
        public movementService: MovementService,
        private rootFormGroup: FormGroupDirective) { }

    ngOnInit(): void {
        this.form = this.rootFormGroup.control;
    }

}
