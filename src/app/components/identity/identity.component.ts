import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { HubClientService } from 'src/app/store/services/hub-client.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityComponent implements OnInit {
  identity$: Observable<string>;
  constructor(private readonly hubClient: HubClientService) {}
  ngOnInit(): void {
    this.identity$ = this.hubClient.publicKeyIdentity;
  }
}
