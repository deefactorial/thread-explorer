import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';
import { Observable } from 'rxjs';
import { EntityServices, EntityCollectionService, EntityAction } from '@ngrx/data';
import { CollectionConfig } from 'src/app/store/collections/collection.model';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  addCollectionText: string;
  collectionsService: EntityCollectionService<CollectionConfig>;
  collections$: Observable<Array<CollectionConfig>>;
  selectedCollection$: Observable<CollectionConfig>;
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
  }

  ngOnInit(): void {
  }

  addCollection(): void {
    // Note: Set a default schema of any to start with.
    this.collectionsService.add({name: this.addCollectionText, schema: '{"type":"object"}'});
  }

  deleteCollection(collection: CollectionConfig): void {
    this.collectionsService.delete(collection);
  }

  getErrorMessage(error: any){
    if (!error) return;
    return error.data.error.error.message;
  }

}
