import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CollectionConfig } from './collection.model';

export const loadCollections = createAction(
  '[Collection/API] Load Collections', 
  props<{ collections: CollectionConfig[] }>()
);

export const addCollection = createAction(
  '[Collection/API] Add Collection',
  props<{ collection: CollectionConfig }>()
);

export const upsertCollection = createAction(
  '[Collection/API] Upsert Collection',
  props<{ collection: CollectionConfig }>()
);

export const addCollections = createAction(
  '[Collection/API] Add Collections',
  props<{ collections: CollectionConfig[] }>()
);

export const upsertCollections = createAction(
  '[Collection/API] Upsert Collections',
  props<{ collections: CollectionConfig[] }>()
);

export const updateCollection = createAction(
  '[Collection/API] Update Collection',
  props<{ collection: Update<CollectionConfig> }>()
);

export const updateCollections = createAction(
  '[Collection/API] Update Collections',
  props<{ collections: Update<CollectionConfig>[] }>()
);

export const deleteCollection = createAction(
  '[Collection/API] Delete Collection',
  props<{ id: string }>()
);

export const deleteCollections = createAction(
  '[Collection/API] Delete Collections',
  props<{ ids: string[] }>()
);

export const clearCollections = createAction(
  '[Collection/API] Clear Collections'
);
