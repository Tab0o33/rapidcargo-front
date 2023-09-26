import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { notEqualValidator } from '../validators/notEqual.validator';
import { isGreaterThanValidator } from '../validators/isGreaterThan.validator';
import { referenceValidator } from '../validators/reference.validator';
import { MovementService } from '../services/movement.service';
import { MovmentIn } from '../models/movement-in.model';

@Component({
    selector: 'app-input-form',
    templateUrl: './input-form.component.html',
    styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

    inputForm!: FormGroup;
    customsStatusRegex!: RegExp;
    alert!: { type: string, message: string } | undefined;

    warehouseCodePlaceholder = "-- Code --";
    warehouseCodes = ["MBEO", "TFE", "SLG", "FGLP", "AG"];
    customsStatusPlaceholder = "-- Statut --";
    customsStatus = ["X", "X", "C", "F", "C"];
    refTypePlaceholder = "-- Type --";
    referenceTypes = ["ARTU", "AWB", "VCR", "LSPE", "FM"];

    constructor(
        private formBuilder: FormBuilder,
        private movementService: MovementService) { }

    ngOnInit(): void {
        this.customsStatusRegex = /^[A-Z]$/;
        this.onResetForm();
    }

    onSubmitForm() {
        const dataToSubmit: MovmentIn = new MovmentIn(
            this.inputForm.value.technicalId,
            this.inputForm.value.creationDateTime,
            this.inputForm.value.creationUserName,
            this.inputForm.value.dateTime,
            this.movementService.declarationLocation,
            this.inputForm.value.merchandise,
            this.inputForm.value.warehouseCode,
            this.inputForm.value.warehouseLabel,
            this.inputForm.value.customsStatus
        );
        this.movementService.postNewInputMovement(dataToSubmit).subscribe({
            next: (v) => {
                this.displayAlert('valid', 'Mouvement enregistré avec succès');
                this.onResetForm();
            },
            error: (e) => {
                this.displayAlert('error', 'Service indisponible');
            }
        });
    }

    onResetForm() {
        this.inputForm = this.formBuilder.group({
            technicalId: [null, Validators.required],
            creationDateTime: [null, Validators.required],
            creationUserName: [null, Validators.required],
            dateTime: [null, Validators.required],
            warehouseCode: [this.warehouseCodePlaceholder, [Validators.required, notEqualValidator(this.warehouseCodePlaceholder)]],
            warehouseLabel: ['', Validators.required],
            customsStatus: [this.customsStatusPlaceholder, [Validators.required, Validators.pattern(this.customsStatusRegex)]],
            merchandise: this.formBuilder.group({
                referenceType: [this.refTypePlaceholder, [Validators.required, notEqualValidator(this.refTypePlaceholder)]],
                referenceValue: [null, Validators.required],
                quantity: [null, [Validators.required]],
                weight: [null, [Validators.required]],
                totalQuantity: [null, [Validators.required]],
                totalWeight: [null, [Validators.required]],
                description: ['', Validators.required],
            }, {
                validator: [
                    referenceValidator('referenceType', 'referenceValue'),
                    isGreaterThanValidator('totalWeight', 'weight'),
                    isGreaterThanValidator('totalQuantity', 'quantity')]
            })
        });
    }

    displayAlert(type: string, message: string) {
        this.alert = { type, message };
        setTimeout(() => {
            this.alert = undefined;
        }, 3000);
    }

}
