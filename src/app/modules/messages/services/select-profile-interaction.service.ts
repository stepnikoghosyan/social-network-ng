import {Injectable} from '@angular/core';

// models
import {ProfileModel} from '../components/profiles-list/models/profile.model';
import {Subject} from 'rxjs';

@Injectable()
export class SelectProfileInteractionService {

  public profilesSource = new Subject<ProfileModel>();
  public currentProfile = this.profilesSource.asObservable();

  public changeProfile(profile: ProfileModel): void {
    console.log('Profile changed:', profile);
    this.profilesSource.next(profile);
  }
}

