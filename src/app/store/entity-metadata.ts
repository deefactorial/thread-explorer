import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { CollectionConfig } from './collections/collection.model';
import { Instance } from './instances/instance.model';
const entityMetadata: EntityMetadataMap = {
  Thread: {},
  Collection: {
    selectId: (collectionConfig: CollectionConfig) => collectionConfig.name
  },
  Instance: {
    selectId: (instance: Instance) => instance._id
  }
};

const pluralNames = { Thread: 'Threads', Collection: 'Collections', Instance: 'Instances' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
