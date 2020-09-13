import { Injectable } from '@angular/core';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { CollectionConfig } from './collection.model';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';
import { HubClientService } from '../services/hub-client.service';
import { switchMap, map } from 'rxjs/operators';
import { ThreadID } from '@textile/hub';
import { ApplicationService } from 'src/app/services/application.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionDataCollectionsService implements EntityCollectionDataService<CollectionConfig> {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly hubClient: HubClientService
    ) { }
  get name(): string {
    return 'Collections'
  }
  add(entity: CollectionConfig): Observable<CollectionConfig> {
    return this.hubClient.client$.pipe(
      switchMap(client => 
        client.newCollection(
          this.getThreadId(), entity.name, entity.schema, entity.indexesList
        )
      ),
      map(() => entity)
    )
  }
  delete(name: string): Observable<string> {
    return this.hubClient.client$.pipe(
      switchMap(client =>
        client.deleteCollection(
          this.getThreadId(), name
        )
      ),
      map(() => name)
    )
  }
  getAll(): Observable<CollectionConfig[]> {
    throw new Error('Method is not implemented at this time');
    // return this.hubClient.client$.pipe(
    //   switchMap(client =>
    //     client.listCollections(
    //       this.getThreadId()
    //     )
    //   )
    // )
  }
  getById(id: any): Observable<CollectionConfig> {
    throw new Error('Method is not implemented at this time');
    // return this.hubClient.client$.pipe(
    //   switchMap(client =>
    //     client.getCollectionInfo(this.getThreadId(), id) as Promise<CollectionConfig>
    //   )
    // )
  }
  getWithQuery(params: string | QueryParams): Observable<CollectionConfig[]> {
    throw new Error('getWithQuery method not implemented.');
  }
  update(update: Update<CollectionConfig>): Observable<CollectionConfig> {
    return this.hubClient.client$.pipe(
      switchMap(client =>
        client.updateCollection(this.getThreadId(), update.changes.name, update.changes.schema, update.changes.indexesList)
      ),
      map(() => update.changes as CollectionConfig)
    )
  }
  upsert(entity: CollectionConfig): Observable<CollectionConfig> {
    throw new Error('upsert method not implemented.');
  }

  private getThreadId(): ThreadID {
    if (!this.applicationService.selectedThread) throw new Error('Thread is not selected.');
    return ThreadID.fromString(this.applicationService.selectedThread.id);
  }
}
