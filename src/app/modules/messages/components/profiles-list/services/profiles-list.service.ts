import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// models
import {ResponseModel} from '../../../../../shared/models/response.model';
import {ProfileModel} from '../models/profile.model';
import {IParam} from '../../../../../shared/models/param.model';

// services
import {BaseRestService} from '../../../../../shared/services/base-rest.service';

// utils
import {anyToHttpParams} from '../../../../../shared/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class ProfilesListService extends BaseRestService<ProfileModel> {
  private readonly URL = 'users/lastChattedUsers';

  constructor(
    private http: HttpClient,
  ) {
    super(http);
  }

  public getLastChattedProfiles(params: IParam): Observable<ResponseModel<ProfileModel[]>> {
    return this.getByPagination(this.URL, anyToHttpParams(params));
  }
}
