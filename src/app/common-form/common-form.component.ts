import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovementService } from '../services/movement.service';
import { referenceValidator } from '../validators/reference.validator';
import { isGreaterThanValidator } from '../validators/isGreaterThan.validator';
import { notEqualValidator } from '../validators/notEqual.validator';
import { MovementIn } from '../models/movement-in.model';
import { Router } from '@angular/router';
import { MovementOut } from '../models/movement-out.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-common-form',
    templateUrl: './common-form.component.html',
    styleUrls: ['./common-form.component.scss']
})
export class CommonFormComponent implements OnInit {

    isMovementTypeOut!: boolean;

    globalForm!: FormGroup;
    commonForm!: FormGroup;
    merchandiseForm!: FormGroup;
    customsDocumentForm!: FormGroup;
    customsStatusRegex!: RegExp;
    alert!: { type: string, message: string } | undefined;
    warehouseCodePlaceholder = "-- Code --";
    warehouseCodes = ["MBEO", "TFE", "SLG", "FGLP", "AG"];
    customsStatusPlaceholder = "-- Statut --";
    customsStatus = ["X", "X", "C", "F", "C"];
    refTypePlaceholder = "-- Type --";
    referenceTypes = ["ARTU", "AWB", "VCR", "LSPE", "FM"];
    documentTypePlaceholder = "-- Type --";
    documentTypes = ["A1", "C4", "T1", "L23", "F8"];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private movementService: MovementService) { }

    ngOnInit(): void {
        this.isMovementTypeOut = this.router.url.split('/').pop() === 'out' ? true : false;
        this.customsStatusRegex = /^[A-Z]$/;
        this.initFormControls();
        this.initMainForm();
    }

    onSubmitForm() {
        let callAPI: Observable<any>;
        if (this.isMovementTypeOut) {
            const dataToSubmit: MovementOut = new MovementOut(
                this.commonForm.value.technicalId,
                this.commonForm.value.creationDateTime,
                this.commonForm.value.creationUserName,
                this.commonForm.value.dateTime,
                this.movementService.declarationLocation,
                this.globalForm.value.merchandiseInfo,
                this.commonForm.value.warehouseCode,
                this.commonForm.value.warehouseLabel,
                this.commonForm.value.customsStatus,
                this.customsDocumentForm.value.documentType,
                this.customsDocumentForm.value.documentRef
            );
            callAPI = this.movementService.postNewOutputMovement(dataToSubmit);
        } else {
            const dataToSubmit: MovementIn = new MovementIn(
                this.commonForm.value.technicalId,
                this.commonForm.value.creationDateTime,
                this.commonForm.value.creationUserName,
                this.commonForm.value.dateTime,
                this.movementService.declarationLocation,
                this.globalForm.value.merchandiseInfo,
                this.commonForm.value.warehouseCode,
                this.commonForm.value.warehouseLabel,
                this.commonForm.value.customsStatus
            );
            callAPI = this.movementService.postNewInputMovement(dataToSubmit);
        }
        callAPI.subscribe({
            next: async (v) => {
                await this.displayAlert('valid', 'Mouvement enregistré avec succès');
                this.onResetForm();

            },
            error: (e) => {
                this.displayAlert('error', 'Service indisponible');
            }
        });
    }

    initMainForm(): void {
        if (this.isMovementTypeOut) {
            this.globalForm = this.formBuilder.group({
                commonInfo: this.commonForm,
                merchandiseInfo: this.merchandiseForm,
                customsDocument: this.customsDocumentForm
            });
        } else {
            this.globalForm = this.formBuilder.group({
                commonInfo: this.commonForm,
                merchandiseInfo: this.merchandiseForm,
            });
        }
    }

    initFormControls() {
        this.commonForm = this.formBuilder.group({
            technicalId: [null, Validators.required],
            creationDateTime: [null, Validators.required],
            creationUserName: [null, Validators.required],
            dateTime: [null, Validators.required],
            warehouseCode: [this.warehouseCodePlaceholder, [Validators.required, notEqualValidator(this.warehouseCodePlaceholder)]],
            warehouseLabel: ['', Validators.required],
            customsStatus: [this.customsStatusPlaceholder, [Validators.required, Validators.pattern(this.customsStatusRegex)]],
        });
        this.merchandiseForm = this.formBuilder.group({
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
        });

        if (this.isMovementTypeOut) {
            this.customsDocumentForm = this.formBuilder.group({
                documentType: [this.documentTypePlaceholder, [Validators.required, notEqualValidator(this.documentTypePlaceholder)]],
                documentRef: [null, Validators.required],
            });
        }

    }

    onResetForm() {
        const url = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([url]);
        });
    }

    displayAlert(type: string, message: string): Promise<void> {
        this.alert = { type, message };
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                this.alert = undefined;
                resolve();
            }, 3000);
        });
    }

}
