import {Component, Input, OnInit} from '@angular/core';

import {ProfileModel} from '../profiles-list/models/profile.model';

@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.css']
})
export class SingleProfileComponent implements OnInit {

  @Input() profile: ProfileModel;

  constructor() {
  }

  ngOnInit() {
  }
}
