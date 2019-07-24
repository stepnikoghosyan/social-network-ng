import {Component, Input} from '@angular/core';
import {ProfilesService} from '../../services/profiles.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent {

  @Input() public profileId;
  private $subscription = new Subject();

  constructor(
    private readonly profilesService: ProfilesService,
    private readonly router: Router,
  ) {
  }

  private isProfileIdSet(): boolean {
    return this.profileId && this.profileId !== '';
  }

  public onViewProfileClick(): void {
    if (this.isProfileIdSet()) {
      console.log('View Profile clicked.');
      // this.profilesService.getFriendProfile(this.profileId)
      //   .pipe(takeUntil(this.$subscription))
      //   .subscribe(data => {
      //     // this.loaderService.hideLoader();
      //     this.router.navigate(['/profiles']); // TODO: send data from here
      //   });
    }
  }

  public onAddToCloseFriendsClick(): void {
    console.log('Add to close friends clicked.');
  }

  public onAddToGroupClick(): void {
    console.log('Add to group clicked.');
  }

  public onBlockClick(): void {
    console.log('Block clicked.');
  }
}
