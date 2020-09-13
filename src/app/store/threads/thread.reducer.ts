import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ThreadActions from './thread.actions';
import { ThreadModel } from './thread.model';

export const threadsFeatureKey = 'Threads';

export interface State extends EntityState<ThreadModel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<ThreadModel> = createEntityAdapter<ThreadModel>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(ThreadActions.addThread,
    (state, action) => adapter.addOne(action.thread, state)
  ),
  on(ThreadActions.upsertThread,
    (state, action) => adapter.upsertOne(action.thread, state)
  ),
  on(ThreadActions.addThreads,
    (state, action) => adapter.addMany(action.threads, state)
  ),
  on(ThreadActions.upsertThreads,
    (state, action) => adapter.upsertMany(action.threads, state)
  ),
  on(ThreadActions.updateThread,
    (state, action) => adapter.updateOne(action.thread, state)
  ),
  on(ThreadActions.updateThreads,
    (state, action) => adapter.updateMany(action.threads, state)
  ),
  on(ThreadActions.deleteThread,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ThreadActions.deleteThreads,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ThreadActions.loadThreads,
    (state, action) => adapter.setAll(action.threads, state)
  ),
  on(ThreadActions.clearThreads,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
