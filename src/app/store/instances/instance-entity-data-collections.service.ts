import { Injectable } from '@angular/core';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { Observable, from } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ThreadID, QueryJSON } from '@textile/hub';
import { switchMap, map, tap } from 'rxjs/operators';
import { HubClientService } from '../services/hub-client.service';
import { CollectionConfig } from '../collections/collection.model';
import { ApplicationService } from 'src/app/services/application.service';

@Injectable({
  providedIn: 'root'
})
export class InstanceEntityDataCollectionsService implements EntityCollectionDataService<any> {

  constructor(
    private readonly hubClient: HubClientService,
    private readonly applicationService: ApplicationService
    ) { }
  get name(): string {
    return `${this.threadId.toString()}-${this.collectionConfig.name}`;
  }

  get threadId(): ThreadID {
    if (!this.applicationService.selectedThread) throw Error("Thread is not selected");
    return ThreadID.fromString(this.applicationService.selectedThread.id);
  }

  get collectionConfig(): CollectionConfig {
    if (!this.applicationService.selectedCollection) throw Error("Collection is not selected");
    return this.applicationService.selectedCollection;
  }

  add(entity: string): Observable<any> {
    const entityObj = JSON.parse(entity)
    return this.hubClient.client$.pipe(
      map(client => client.writeTransaction(this.threadId, this.collectionConfig.name)),
      switchMap(transaction => 
        from(transaction.start()).pipe(
          switchMap(() => from(transaction.create([entityObj])).pipe(
            switchMap((ids) => from(transaction.end()).pipe(
              map(() => ids[0])
            ))
          ))
        )
      ),
      map((id) => ({...entityObj, _id: id})),
    )
  }
  delete(id: string): Observable<number | string> {
    return this.hubClient.client$.pipe(
      map(client => client.writeTransaction(this.threadId, this.collectionConfig.name)),
      switchMap(transaction => from(transaction.start()).pipe(
        switchMap(() => from(transaction.delete([id])).pipe(
          switchMap(() => transaction.end())
        ))
      )),
      map(() => id)
    )
  }
  getAll(): Observable<any[]> {
    return this.hubClient.client$.pipe(
      switchMap(client => client.find(this.threadId, this.collectionConfig.name, {})),
      map(list => list.instancesList),
    )
  }
  getById(id: any): Observable<any> {
    return this.hubClient.client$.pipe(
      map(client => client.readTransaction(this.threadId, this.collectionConfig.name)),
      switchMap(transaction => from(transaction.start()).pipe(
        switchMap(() => from(transaction.findByID(id)).pipe(
          switchMap(instance => from(transaction.end()).pipe(
            map(() => instance)
          ))
        ))
      )),
      map(instance => instance.instance)
    )
  }
  getWithQuery(params: string | QueryParams): Observable<any[]> {
    const query = this.mapParamsToQueryJSON(params)
    return this.hubClient.client$.pipe(
      map(client => client.readTransaction(this.threadId, this.collectionConfig.name)),
      switchMap(transaction => transaction.find(query)),
      map(list => list.instancesList)
    )
  }
  private mapParamsToQueryJSON(params: string | QueryParams): QueryJSON {
    if (typeof params === 'string')
      return JSON.parse(params) as QueryJSON;

    throw new Error('QueryParams not defined for mapping to QueryJSON.');
  }
  update(update: Update<any>): Observable<any>{
    if (typeof update.id === 'number') throw new Error('Update on number id not defined.');
    return this.hubClient.client$.pipe(
      map(client => client.readTransaction(this.threadId, this.collectionConfig.name)),
      switchMap(transaction => transaction.findByID(update.id as string)),
      switchMap((item) => this.hubClient.client$.pipe(
        map(client => client.writeTransaction(this.threadId, this.collectionConfig.name)),
        switchMap(transaction => transaction.save([{...item.instance, ...update.changes}]))
      ))
    )
  }
  upsert(entity: any): Observable<any> {
    return this.hubClient.client$.pipe(
      map(client => client.writeTransaction(this.threadId, this.collectionConfig.name)),
      switchMap(transaction => transaction.save([entity]))
    )
  }
}

export interface InstanceEntityCollectionConfig {
  threadId: ThreadID,
  collectionConfig: CollectionConfig
}