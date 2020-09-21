import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Instance } from './instance.model';

export const loadInstances = createAction(
  '[Instance/API] Load Instances', 
  props<{ instances: Instance[] }>()
);

export const addInstance = createAction(
  '[Instance/API] Add Instance',
  props<{ instance: Instance }>()
);

export const upsertInstance = createAction(
  '[Instance/API] Upsert Instance',
  props<{ instance: Instance }>()
);

export const addInstances = createAction(
  '[Instance/API] Add Instances',
  props<{ instances: Instance[] }>()
);

export const upsertInstances = createAction(
  '[Instance/API] Upsert Instances',
  props<{ instances: Instance[] }>()
);

export const updateInstance = createAction(
  '[Instance/API] Update Instance',
  props<{ instance: Update<Instance> }>()
);

export const updateInstances = createAction(
  '[Instance/API] Update Instances',
  props<{ instances: Update<Instance>[] }>()
);

export const deleteInstance = createAction(
  '[Instance/API] Delete Instance',
  props<{ id: string }>()
);

export const deleteInstances = createAction(
  '[Instance/API] Delete Instances',
  props<{ ids: string[] }>()
);

export const clearInstances = createAction(
  '[Instance/API] Clear Instances'
);
