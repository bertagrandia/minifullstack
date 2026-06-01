import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleteaList } from './bubbletea-list';

describe('BubbleteaList', () => {
  let component: BubbleteaList;
  let fixture: ComponentFixture<BubbleteaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleteaList],
    }).compileComponents();

    fixture = TestBed.createComponent(BubbleteaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
