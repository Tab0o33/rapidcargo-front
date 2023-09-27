import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovementIn } from '../models/movement-in.model';
import { MovementOut } from '../models/movement-out.model';

const API_URL = "http://localhost:9000/api/v1";

const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    withCredentials: true
};

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

}
