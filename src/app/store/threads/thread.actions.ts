import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ThreadModel } from './thread.model';

export const loadThreads = createAction(
  '[Thread/API] Load Threads', 
  props<{ threads: ThreadModel[] }>()
);

export const addThread = createAction(
  '[Thread/API] Add Thread',
  props<{ thread: ThreadModel }>()
);

export const upsertThread = createAction(
  '[Thread/API] Upsert Thread',
  props<{ thread: ThreadModel }>()
);

export const addThreads = createAction(
  '[Thread/API] Add Threads',
  props<{ threads: ThreadModel[] }>()
);

export const upsertThreads = createAction(
  '[Thread/API] Upsert Threads',
  props<{ threads: ThreadModel[] }>()
);

export const updateThread = createAction(
  '[Thread/API] Update Thread',
  props<{ thread: Update<ThreadModel> }>()
);

export const updateThreads = createAction(
  '[Thread/API] Update Threads',
  props<{ threads: Update<ThreadModel>[] }>()
);

export const deleteThread = createAction(
  '[Thread/API] Delete Thread',
  props<{ id: string }>()
);

export const deleteThreads = createAction(
  '[Thread/API] Delete Threads',
  props<{ ids: string[] }>()
);

export const clearThreads = createAction(
  '[Thread/API] Clear Threads'
);
