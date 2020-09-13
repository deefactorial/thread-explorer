import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Collection } from './collection.model';

export const loadCollections = createAction(
  '[Collection/API] Load Collections', 
  props<{ collections: Collection[] }>()
);

export const addCollection = createAction(
  '[Collection/API] Add Collection',
  props<{ collection: Collection }>()
);

export const upsertCollection = createAction(
  '[Collection/API] Upsert Collection',
  props<{ collection: Collection }>()
);

export const addCollections = createAction(
  '[Collection/API] Add Collections',
  props<{ collections: Collection[] }>()
);

export const upsertCollections = createAction(
  '[Collection/API] Upsert Collections',
  props<{ collections: Collection[] }>()
);

export const updateCollection = createAction(
  '[Collection/API] Update Collection',
  props<{ collection: Update<Collection> }>()
);

export const updateCollections = createAction(
  '[Collection/API] Update Collections',
  props<{ collections: Update<Collection>[] }>()
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
