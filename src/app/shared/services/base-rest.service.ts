import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

// models
import {ResponseModel} from '../models/response.model';

export abstract class BaseRestService<T> {
  protected apiUrl: string;

  protected constructor(protected httpClient: HttpClient) {
    this.apiUrl = environment.api;
  }

  protected create<Type>(endpoint: string, item: Type): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl + endpoint}/`, item);
  }

  protected post<Type, Resp>(endpoint: string, item: Type): Observable<Resp> {
    return this.httpClient.post<Resp>(`${this.apiUrl + endpoint}/`, item);
  }

  protected getByPagination(endpoint: string, params?: HttpParams): Observable<ResponseModel<T[]>> {
    return this.httpClient.get<ResponseModel<T[]>>(`${this.apiUrl}${endpoint}/`, {
      params
    });
  }

  protected getById(endpoint: string, id: number, headers?: HttpHeaders): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}${endpoint}/${id}/`, {
      headers
    });
  }

  protected editPatch<Type>(endpoint: string, data: any, id?: number): Observable<Type> {
    return this.httpClient.patch<Type>(`${this.apiUrl + endpoint}/${id && (id + '/')}`, data);
  }

  protected editPut<Type>(endpoint: string, id: number, data: T): Observable<Type> {
    return this.httpClient.put<Type>(`${this.apiUrl + endpoint}/${id}/`, data);
  }

  protected deleteById(endpoint: string, id: number) {
    return this.httpClient.delete(`${this.apiUrl + endpoint}/${id}/`);
  }
}
