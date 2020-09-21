import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApplicationService } from './services/application.service';
import { Observable } from 'rxjs';
import { Tabs } from './models/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  tab$: Observable<Tabs>;
  Tabs = Tabs;
  title = 'thread-explorer';
  constructor(private readonly applicationService: ApplicationService){}
  ngOnInit(): void {
    this.tab$ = this.applicationService.selectedTab$;
  }
}
