import { Injectable } from '@angular/core';
import { EntityCollectionDataService, QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ThreadID, QueryJSON } from '@textile/hub';
import { switchMap, map } from 'rxjs/operators';
import { HubClientService } from '../services/hub-client.service';

@Injectable({
  providedIn: 'root'
})
export class InstanceEntityDataCollectionsService implements EntityCollectionDataService<any> {
  private _config: InstanceEntityCollectionConfig;
  public get config(): InstanceEntityCollectionConfig {
    return this._config;
  }
  public set config(value: InstanceEntityCollectionConfig) {
    this._config = value;
  }

  constructor(private readonly hubClient: HubClientService) { }
  get name(): string {
    return `${this._config.threadId.toString()}-${this._config.collectionConfig.name}`;
  }
  add(entity: any): Observable<any> {
    if (!this._config) throw new Error('Config is not defined.');
    return this.hubClient.client$.pipe(
      map(client => client.writeTransaction(this._config.threadId, this._config.collectionConfig.name)),
      switchMap(transaction => transaction.create([entity])),
      map(() => entity)
    )
  }
  delete(id: string | number): Observable<number | string> {
    if (!this._config) throw new Error('Config is not defined.');
    if (typeof id === 'number') throw new Error('Delete on number id not defined.');
    return this.hubClient.client$.pipe(
      map(client => client.writeTransaction(this._config.threadId, this._config.collectionConfig.name)),
      switchMap(transaction => transaction.delete([id])),
      map(() => id)
    )
  }
  getAll(): Observable<any[]> {
    if (!this._config) throw new Error('Config is not defined.');
    return this.hubClient.client$.pipe(
      map(client => client.readTransaction(this._config.threadId, this._config.collectionConfig.name)),
      switchMap(transaction => transaction.find({})),
      map(list => list.instancesList)
    )
  }
  getById(id: any): Observable<any> {
    if (!this._config) throw new Error('Config is not defined.');
    return this.hubClient.client$.pipe(
      map(client => client.readTransaction(this._config.threadId, this._config.collectionConfig.name)),
      switchMap(transaction => transaction.findByID(id)),
      map(instance => instance.instance)
    )
  }
  getWithQuery(params: string | QueryParams): Observable<any[]> {
    if (!this._config) throw new Error('Config is not defined.');
    const query = this.mapParamsToQueryJSON(params)
    return this.hubClient.client$.pipe(
      map(client => client.readTransaction(this._config.threadId, this._config.collectionConfig.name)),
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
    if (!this._config) throw new Error('Config is not defined.');
    if (typeof update.id === 'number') throw new Error('Update on number id not defined.');
    return this.hubClient.client$.pipe(
      map(client => client.readTransaction(this._config.threadId, this._config.collectionConfig.name)),
      switchMap(transaction => transaction.findByID(update.id as string)),
      switchMap((item) => this.hubClient.client$.pipe(
        map(client => client.writeTransaction(this._config.threadId, this._config.collectionConfig.name)),
        switchMap(transaction => transaction.save([{...item.instance, ...update.changes}]))
      ))
    )
  }
  upsert(entity: any): Observable<any> {
    if (!this._config) throw new Error('Config is not defined.');
    return this.hubClient.client$.pipe(
      map(client => client.writeTransaction(this._config.threadId, this._config.collectionConfig.name)),
      switchMap(transaction => transaction.save([entity]))
    )
  }
}

export interface InstanceEntityCollectionConfig {
  threadId: ThreadID,
  collectionConfig: CollectionConfig
}

export interface CollectionConfig {
  name: string,
  schema: Uint8Array | string,
  indexesList: Array<IndexConfig>,
}

export interface IndexConfig {
  path: string,
  unique: boolean,
}