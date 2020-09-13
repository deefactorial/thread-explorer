import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Thread: {},
  Collection: {}
};

const pluralNames = { Thread: 'Threads', Collection: 'Collections' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
