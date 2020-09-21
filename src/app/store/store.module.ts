import { ModuleWithProviders, Optional, SkipSelf, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducer as threadReducer } from './threads/thread.reducer';
import { reducer as collectionReducer } from './collections/collection.reducer'
import { reducer as instanceReducer } from './instances/instance.reducer'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HubClientService } from './services/hub-client.service';
import { ThreadDataCollectionsService } from './threads/thread-data-collections.service';
import { EntityDataService, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CollectionDataCollectionsService } from './collections/collection-data-collections.service';
import { InstanceEntityDataCollectionsService } from './instances/instance-entity-data-collections.service';
@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot({
            'Threads': threadReducer,
            'Collections': collectionReducer,
            'Instances': instanceReducer
        }),
        EffectsModule.forRoot([
        ]),
        EntityDataModule.forRoot(entityConfig),
        StoreDevtoolsModule.instrument()
    ],
    providers: [
        HubClientService,
        ThreadDataCollectionsService,
        CollectionDataCollectionsService
    ]
})
export class AppStoreModule {
    static forRoot(): ModuleWithProviders<AppStoreModule> {
        return {
            ngModule: AppStoreModule
        };
    }

    constructor(
        private readonly entityDataService: EntityDataService,
        private readonly threadDataCollectionsService: ThreadDataCollectionsService,
        private readonly collectionDataCollectionsService: CollectionDataCollectionsService,
        private readonly instanceDataCollectionService: InstanceEntityDataCollectionsService,
        @Optional() @SkipSelf() parentModule?: AppStoreModule,
        ) {
        if (parentModule) {
            throw new Error('StoreModule already loaded. Import in root module only.');
        }
        this.entityDataService.registerService('Thread', this.threadDataCollectionsService);
        this.entityDataService.registerService('Collection', this.collectionDataCollectionsService);
        this.entityDataService.registerService('Instance', this.instanceDataCollectionService);
    }
}