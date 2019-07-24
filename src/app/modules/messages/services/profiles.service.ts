import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// services
import {BaseRestService} from '../../../shared/services/base-rest.service';

// models
import {ResponseModel} from '../../../shared/models/response.model';
import {ProfileModel} from '../components/profiles-list/models/profile.model';
import {IParam} from '../../../shared/models/param.model';

// utils
import {anyToHttpParams} from '../../../shared/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService extends BaseRestService<ProfileModel> {
  private readonly URL = 'users';

  constructor(
    private http: HttpClient,
  ) {
    super(http);
  }

  public getLastChattedProfiles(params: IParam): Observable<ResponseModel<ProfileModel[]>> {
    return this.getByPagination(`${this.URL}/lastChattedUsers`, anyToHttpParams(params));
  }

  public getFriendProfile(userId: string): Observable<ResponseModel<ProfileModel>> {
    return this.getById(this.URL, userId);
  }

  public getFriendsProfiles(params: IParam): Observable<ResponseModel<ProfileModel[]>> {
    return this.getByPagination(this.URL, anyToHttpParams(params));
  }
}
