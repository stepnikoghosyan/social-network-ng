import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationMenuComponent } from './bottom-navigation-menu.component';

describe('BottomNavigationMenuComponent', () => {
  let component: BottomNavigationMenuComponent;
  let fixture: ComponentFixture<BottomNavigationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomNavigationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
