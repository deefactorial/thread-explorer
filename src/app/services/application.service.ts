import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { ThreadModel } from '../store/threads/thread.model';
import { CollectionConfig } from '../store/collections/collection.model';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { Tabs } from '../models/tabs';
import { Instance } from '../store/instances/instance.model';

@Injectable()
export class ApplicationService {
    private collectionsService: EntityCollectionService<CollectionConfig>;
    private _selectedTab = new BehaviorSubject<Tabs>(Tabs.json);

    private _selectedThread$ = new BehaviorSubject<ThreadModel>(undefined);
    get selectedThread$(): Observable<ThreadModel> {
        return this._selectedThread$.asObservable();
    }
    get selectedThread(): ThreadModel {
        return this._selectedThread$.value;
    }
    set selectedThread(thread: ThreadModel) {
        // clear the selected collection
        this._selectedCollection$.next(undefined);
        // clear the collection store
        this.collectionsService.clearCache();
        // set the selected thread
        this._selectedThread$.next(thread);
    }
    isSelected(threadId: string): boolean {
        if (!this._selectedThread$.value) return false;
        return this._selectedThread$.value.id === threadId;
    }
    private _selectedCollection$ = new BehaviorSubject<CollectionConfig>(undefined);
    get selectedCollection$(): Observable<CollectionConfig> {
        return this._selectedCollection$.asObservable();
    }
    get selectedCollection(): CollectionConfig {
        return this._selectedCollection$.value;
    }
    set selectedCollection(collection: CollectionConfig) {
        this._selectedCollection$.next(collection);
    }
    isSelectedCollection(collectionName: string): boolean {
        if (!this._selectedCollection$.value) return false;
        return this._selectedCollection$.value.name === collectionName;
    }

    set tab(tab: Tabs) {
        this._selectedTab.next(tab);
    }

    get selectedTab$(): Observable<Tabs> {
        return this._selectedTab.asObservable()
    }

    private _selectedInstance$ = new BehaviorSubject<Instance>(undefined);
    get selectedInstance$(): Observable<Instance> {
        return this._selectedInstance$.asObservable();
    }
    get selectedInstance(): Instance {
        return this._selectedInstance$.value;
    }
    set selectedInstance(instance: Instance) {
        this._selectedInstance$.next(instance);
    }
    isSelectedInstance(instanceId: string): boolean {
        if (!this._selectedInstance$.value) return false;
        return this._selectedInstance$.value._id === instanceId;
    }

    constructor(private readonly entityServices: EntityServices,) {
        this.collectionsService = this.entityServices.getEntityCollectionService('Collection');
    }
}