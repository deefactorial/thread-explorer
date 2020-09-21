import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Tabs } from 'src/app/models/tabs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-tabs',
  templateUrl: './editor-tabs.component.html',
  styleUrls: ['./editor-tabs.component.scss']
})
export class EditorTabsComponent implements OnInit {
  tab$: Observable<Tabs>;
  Tabs = Tabs;
  constructor(private readonly applicationService: ApplicationService) { }
  ngOnInit(): void {
    this.tab$ = this.applicationService.selectedTab$;
  }
  setTab(tab: Tabs) {
    this.applicationService.tab = tab;
  }
}
