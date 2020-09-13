import { Injectable } from '@angular/core';
import { EntityCollectionDataService } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { ThreadID } from '@textile/hub';
import { ThreadModel } from './thread.model';
import { HubClientService } from '../services/hub-client.service';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

@Injectable({
  providedIn: 'root'
})
export class ThreadDataCollectionsService implements EntityCollectionDataService<ThreadModel>{
  constructor(private readonly hubClient: HubClientService) { }
  get name(): string {
    return 'Threads'
  };
  add(entity: ThreadModel): Observable<ThreadModel>{
    return this.hubClient.client$.pipe(
      tap(client => console.log('client', client)),
      switchMap(client => client.newDB(undefined, entity.name)),
      map(thread => ({id: thread.toString(), name: entity.name} as ThreadModel))
    )
  };
  delete(id: string): Observable<string> {
    return this.hubClient.client$.pipe(
      switchMap(client => client.deleteDB(ThreadID.fromString(id))),
      map(() => id)
    )
  }
  getAll(): Observable<ThreadModel[]>{
    return this.hubClient.client$.pipe(
      switchMap(client => client.listThreads()),
      map(list => list.listList)
    )
  }
  getById(name: string): Observable<ThreadModel>{
    return this.hubClient.client$.pipe(
      switchMap(client => client.getThread(name))
    )
  }
  getWithQuery(params: string): Observable<ThreadModel[]>{
    return this.hubClient.client$.pipe(
      switchMap(client => client.getThread(params)),
      map(threadId => [threadId])
    )
  }
  update(update: Update<ThreadModel>): Observable<ThreadModel>{
    throw new Error('Update method not implemented.');
  }
  upsert(entity: ThreadModel): Observable<ThreadModel> {
    const threadId = this.getThreadFromId(entity.id);
    return this.hubClient.client$.pipe(
      switchMap(client => client.getThread(entity.name)),
      switchMap((thread) => this.update({id: threadId.toString(), changes: entity})),
      catchError(error => this.hubClient.client$.pipe(
        switchMap(client => client.newDB(threadId, entity.name)),
        map(() => entity)
      ))
    )
  }
  private getThreadFromId(id: string | Uint8Array): ThreadID {
    if (!id) return undefined;
    return typeof id === 'string' ? ThreadID.fromString(id) : ThreadID.fromBytes(id);
  }
}