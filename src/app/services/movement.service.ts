import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovementIn } from '../models/movement-in.model';
import { MovementOut } from '../models/movement-out.model';
import { API_URL, HTTP_OPTIONS } from '../properties';

@Injectable({
    providedIn: 'root'
})
export class MovementService {

    declarationLocation: string = "RapidCargo CDG";

    constructor(private http: HttpClient) { }

    public postNewInputMovement(dataToPost: MovementIn): Observable<any> {
        const url = API_URL + '/movement?type=in';
        return this.http.post<any>(url, dataToPost, HTTP_OPTIONS);
    }

    public postNewOutputMovement(dataToPost: MovementOut): Observable<any> {
        const url = API_URL + '/movement?type=out';
        return this.http.post<any>(url, dataToPost, HTTP_OPTIONS);
    }

    public getLastMovements(): Observable<any[]> {
        return this.http.get<any[]>(`${API_URL}/movements/latest`);
    }

}
