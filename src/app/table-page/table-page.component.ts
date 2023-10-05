import { Component, OnInit } from '@angular/core';
import { MovementService } from '../services/movement.service';
import { Observable, map } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

    lastMovements$!: Observable<any[][]>;

    headers = [
        'Horodatage',
        'Type',
        'De',
        'Vers',
        'Reference',
        'Quantité',
        'Poids',
        'Statut douanier',
    ];

    constructor(
        private movementService: MovementService,
        private datePipe: DatePipe) { }

    ngOnInit(): void {

        this.lastMovements$ = this.movementService.getLastMovements()
            .pipe(map(val => {
                let mappedMovements: any[][] = [];
                let mappedMovement: any[] = [];
                val.forEach(movement => {
                    mappedMovement = [
                        this.datePipe.transform(movement.dateTime, 'dd-MM-yyyy hh:mm:ss'),
                        movement.isTypeOut ? 'SORTIE' : 'ENTREE',
                        movement.warehouseOriginCode,
                        movement.warehouseDestCode,
                        movement.merchandise.reference.type + ' 0' + movement.merchandise.reference.value,
                        movement.merchandise.quantity,
                        movement.merchandise.weight,
                        movement.customsStatus,
                    ];
                    mappedMovements.push(mappedMovement);
                });
                return mappedMovements;
            }))
    }

}
