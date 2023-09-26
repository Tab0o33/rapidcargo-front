import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    items!: { title: string, route: string }[];

    ngOnInit() {
        this.items = [
            { title: 'Mouvement d\'entrée', route: 'movement/in' },
            { title: 'Mouvement de sortie', route: 'movement/out' }
        ];
    }

}