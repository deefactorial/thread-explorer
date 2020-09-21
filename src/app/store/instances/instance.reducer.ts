import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Instance } from './instance.model';
import * as InstanceActions from './instance.actions';

export const instancesFeatureKey = 'instances';

export interface State extends EntityState<Instance> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Instance> = createEntityAdapter<Instance>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(InstanceActions.addInstance,
    (state, action) => adapter.addOne(action.instance, state)
  ),
  on(InstanceActions.upsertInstance,
    (state, action) => adapter.upsertOne(action.instance, state)
  ),
  on(InstanceActions.addInstances,
    (state, action) => adapter.addMany(action.instances, state)
  ),
  on(InstanceActions.upsertInstances,
    (state, action) => adapter.upsertMany(action.instances, state)
  ),
  on(InstanceActions.updateInstance,
    (state, action) => adapter.updateOne(action.instance, state)
  ),
  on(InstanceActions.updateInstances,
    (state, action) => adapter.updateMany(action.instances, state)
  ),
  on(InstanceActions.deleteInstance,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(InstanceActions.deleteInstances,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(InstanceActions.loadInstances,
    (state, action) => adapter.setAll(action.instances, state)
  ),
  on(InstanceActions.clearInstances,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
