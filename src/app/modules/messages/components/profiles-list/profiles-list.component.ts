import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

// services
import {ProfilesService} from '../../services/profiles.service';
import {SelectProfileInteractionService} from '../../services/select-profile-interaction.service';

// models
import {ProfileModel} from './models/profile.model';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.css']
})
export class ProfilesListComponent implements OnInit, OnDestroy {

  private $subscription: Subscription;
  public filters = {
    page_size: 5,
    page: 1,
    search: '',
  };

  public profilesList: ProfileModel[] = [];

  constructor(
    private readonly profilesListService: ProfilesService,
    private readonly selectProfileInteractionService: SelectProfileInteractionService
  ) {
  }

  ngOnInit() {
    this.getMockData();
    // this.$subscription = this.profilesListService.getLastChattedProfiles(this.filters)
    //   .subscribe((res: ResponseModel<ProfileModel[]>) => {
    //     if (res.errorMessage) {
    //       console.log('Error occurred:', res.statusCode, res.errorMessage);
    //     } else {
    //       console.log('DATA received:', res.data);
    //       this.profilesList = res.data;
    //     }
    //   });
  }

  public changeProfile(profile: ProfileModel): void {
    this.selectProfileInteractionService.changeProfile(profile);
  }

  ngOnDestroy(): void {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  private getMockData(): void {
    const profile: ProfileModel = {
      id: '1',
      firstName: 'Khadija',
      lastName: 'Mehr',
      is_online: true,
      last_online: new Date(),
      profile_picture: 'https://www.freshmorningquotes.com/wp-content/uploads/2015/11/cute-and-beautifull-girls-profile-pictures.jpg',
    };

    for (let i = 1; i < 10; i++) {
      this.profilesList.push({
        ...profile,
        id: `${i}`,
      });
    }

    // this.profilesList = [
    //   profile,
    //   profile,
    //   profile,
    //   profile,
    //   profile,
    //   profile,
    //   profile,
    //   profile,
    // ];
  }

}
