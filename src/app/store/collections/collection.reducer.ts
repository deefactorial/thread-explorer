import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Collection } from './collection.model';
import * as CollectionActions from './collection.actions';

export const collectionsFeatureKey = 'collections';

export interface State extends EntityState<Collection> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Collection> = createEntityAdapter<Collection>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(CollectionActions.addCollection,
    (state, action) => adapter.addOne(action.collection, state)
  ),
  on(CollectionActions.upsertCollection,
    (state, action) => adapter.upsertOne(action.collection, state)
  ),
  on(CollectionActions.addCollections,
    (state, action) => adapter.addMany(action.collections, state)
  ),
  on(CollectionActions.upsertCollections,
    (state, action) => adapter.upsertMany(action.collections, state)
  ),
  on(CollectionActions.updateCollection,
    (state, action) => adapter.updateOne(action.collection, state)
  ),
  on(CollectionActions.updateCollections,
    (state, action) => adapter.updateMany(action.collections, state)
  ),
  on(CollectionActions.deleteCollection,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CollectionActions.deleteCollections,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CollectionActions.loadCollections,
    (state, action) => adapter.setAll(action.collections, state)
  ),
  on(CollectionActions.clearCollections,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
