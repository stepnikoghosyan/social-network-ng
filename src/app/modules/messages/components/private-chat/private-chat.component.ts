import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject, Subscription} from 'rxjs';

// services
import {SelectProfileInteractionService} from '../../services/select-profile-interaction.service';
import {PrivateChatService} from './services/private-chat.service';
import {ProfileModel} from '../profiles-list/models/profile.model';
import {takeUntil} from 'rxjs/operators';
import {MessageModel} from './models/message.model';
import {ResponseModel} from '../../../../shared/models/response.model';

// models

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit, OnDestroy {

  public showActionMenu = false;
  public profile: ProfileModel;
  public messages: MessageModel[] = [];
  private $selectProfileSubscription: Subscription;
  private $getMessages = new Subject();

  constructor(
    private readonly selectProfileInteractionService: SelectProfileInteractionService,
    private readonly chatService: PrivateChatService,
  ) {
  }

  ngOnInit() {
    this.$selectProfileSubscription = this.selectProfileInteractionService.profilesSource
      .subscribe(profile => this.onProfileChanged(profile));
  }

  ngOnDestroy(): void {
    if (this.$selectProfileSubscription) {
      this.$selectProfileSubscription.unsubscribe();
    }
  }

  private onProfileChanged(profile: ProfileModel): void {
    if (!profile) {
      this.profile = null;
      return;
    }

    this.profile = profile;
    this.getMockData()
      .pipe(takeUntil(this.$getMessages))
      .subscribe((messages: ResponseModel<MessageModel[]>) => {
        if (messages.data && messages.data.length > 0) {
          this.messages.push(...messages.data);
        }
      });
    // this.chatService.getMessagesWithUser(this.profile.id)
    //   .pipe(takeUntil(this.$getMessages))
    //   .subscribe((messages: ResponseModel<MessageModel[]>) => {
    //     if (messages.data && messages.data.length > 0) {
    //       this.messages.push(...messages.data);
    //     } else {
    //       // TODO: show message no more messages (You're up to date)
    //     }
    //   });
  }

  private getMockData(): Observable<ResponseModel<MessageModel[]>> {
    const x: ResponseModel<MessageModel[]> = {
      statusCode: 200,
      errorMessage: null,
      data: [],
    };

    for (let i = 0; i < 5; i++) {
      x.data.push({
        _id: `${i}`,
        message: `message ${i}`,
        roomId: '1',
        date: new Date(),
      });
    }
    return of(x);
  }
}
