import { Component, Input } from '@angular/core';
import { MovementService } from '../services/movement.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-movement-form',
    templateUrl: './movement-form.component.html',
    styleUrls: ['./movement-form.component.scss']
})
export class MovementFormComponent {

    @Input() controlTechnicalId: FormControl = new FormControl();
    @Input() controlCreationDateTime: FormControl = new FormControl();
    @Input() controlCreationUserName: FormControl = new FormControl();
    @Input() controlDateTime: FormControl = new FormControl();

    constructor(public movementService: MovementService) { }

}
