import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// services
import {BaseRestService} from '../../../../../shared/services/base-rest.service';

// models
import {ResponseModel} from '../../../../../shared/models/response.model';
import {MessageModel} from '../models/message.model';

// utils
import {anyToHttpParams} from '../../../../../shared/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class PrivateChatService extends BaseRestService<MessageModel> {

  private readonly URL = 'messages/withUser';

  constructor(private http: HttpClient) {
    super(http);
  }

  public getMessagesWithUser(userId: string): Observable<ResponseModel<MessageModel[]>> {
    return this.getByPagination(this.URL, anyToHttpParams({id: userId}));
  }
}
