import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { CollectionConfig } from './collections/collection.model';
const entityMetadata: EntityMetadataMap = {
  Thread: {},
  Collection: {
    selectId: (collectionConfig: CollectionConfig) => collectionConfig.name
  }
};

const pluralNames = { Thread: 'Threads', Collection: 'Collections' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
