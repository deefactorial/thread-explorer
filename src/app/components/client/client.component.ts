import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '@textile/hub';
import { HubClientService } from 'src/app/store/services/hub-client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent implements OnInit {
  client$: Observable<Client>;
  constructor(private readonly hubClient: HubClientService) {}
  ngOnInit(): void {
    this.client$ = this.hubClient.client$;
  }
}
