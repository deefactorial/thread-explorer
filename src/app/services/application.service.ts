import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { ThreadModel } from '../store/threads/thread.model';
import { CollectionConfig } from '../store/collections/collection.model';

@Injectable()
export class ApplicationService {
    private _selectedThread$ = new BehaviorSubject<ThreadModel>(undefined);
    get selectedThread$(): Observable<ThreadModel> {
        return this._selectedThread$.asObservable();
    }
    get selectedThread(): ThreadModel {
        return this._selectedThread$.value;
    }
    set selectedThread(thread: ThreadModel) {
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
    set selectedCollection(thread: CollectionConfig) {
        this._selectedCollection$.next(thread);
    }
    isSelectedCollection(collectionName: string): boolean {
        if (!this._selectedCollection$.value) return false;
        return this._selectedCollection$.value.name === collectionName;
    }
}