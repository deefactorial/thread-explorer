import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstancesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
