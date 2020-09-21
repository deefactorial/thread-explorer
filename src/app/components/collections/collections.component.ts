import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Observable } from 'rxjs';
import { EntityServices, EntityCollectionService, EntityAction } from '@ngrx/data';
import { CollectionConfig } from 'src/app/store/collections/collection.model';
import { ThreadModel } from 'src/app/store/threads/thread.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionsComponent implements OnInit {

  addCollectionText: string;
  collectionsService: EntityCollectionService<CollectionConfig>;
  collections$: Observable<Array<CollectionConfig>>;
  selectedThread$: Observable<ThreadModel>;
  selectedCollection$: Observable<CollectionConfig>;
  loading$: Observable<boolean>;
  errors$: Observable<EntityAction<any>>;

  constructor(
    private readonly entityServices: EntityServices,
    private readonly applicationService: ApplicationService
  ) {
    this.collectionsService = this.entityServices.getEntityCollectionService('Collection');
    this.collections$ = this.collectionsService.entities$;
    this.collectionsService.load()
    this.selectedCollection$ = this.applicationService.selectedCollection$;
    this.errors$ = this.collectionsService.errors$;
    this.loading$ = this.collectionsService.loading$;
  }

  ngOnInit(): void {
  }

  addCollection(): void {
    // Note: Set a default schema of any to start with.
    this.collectionsService.add({name: this.addCollectionText, schema: {
      type: "object",
      properties:{
        _id: {
          type: "string"
        }
      }
    }});
    this.addCollectionText = undefined;
  }

  deleteCollection(collection: CollectionConfig): void {
    this.collectionsService.delete(collection);
  }

  getErrorMessage(error: any){
    if (!error) return;
    return error.data.error.error.message;
  }

  selectCollection(collection: CollectionConfig): void {
    if (this.applicationService.isSelectedCollection(collection.name)) {
      this.applicationService.selectedCollection = undefined;
    } else {
      this.applicationService.selectedCollection = collection;
    }
  }

  isSelected(collection: CollectionConfig): boolean {
    return this.applicationService.isSelectedCollection(collection.name);
  }

}
