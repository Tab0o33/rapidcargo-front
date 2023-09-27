import { HttpHeaders } from "@angular/common/http";

export const API_URL = 'http://localhost:9000/api/v1';

export const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    withCredentials: true
};