import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityServices, EntityCollectionService, EntityAction } from '@ngrx/data';
import { ThreadModel } from 'src/app/store/threads/thread.model';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadsComponent {
  threads$: Observable<Array<ThreadModel>>;
  threadsService: EntityCollectionService<ThreadModel>;
  addThreadText: string;
  selectedThread$: Observable<ThreadModel>;
  loading$: Observable<boolean>;
  errors$: Observable<EntityAction<any>>;
  constructor(
    private readonly entityServices: EntityServices,
    private readonly applicationService: ApplicationService
  ) {
    this.threadsService = this.entityServices.getEntityCollectionService('Thread');
    this.threads$ = this.threadsService.entities$;
    this.threadsService.load()
    this.selectedThread$ = this.applicationService.selectedThread$;
    this.loading$ = this.threadsService.loading$;
    this.errors$ = this.threadsService.errors$
  }
  addThread(): void {
    this.threadsService.add({name: this.addThreadText} as ThreadModel);
    this.addThreadText = '';
  }
  deleteThread(thread: ThreadModel): void {
    this.threadsService.delete(thread);
    if (this.applicationService.isSelected(thread.id as string)) {
      this.applicationService.selectedThread = undefined;
    }
  }
  selectThread(thread: ThreadModel): void {
    if (this.applicationService.isSelected(thread.id as string)) {
      this.applicationService.selectedThread = undefined;
    } else {
      this.applicationService.selectedThread = thread;
    }
  }
  isSelected(threadId: string): boolean {
    return this.applicationService.isSelected(threadId);
  }
  getErrorMessage(error: any){
    if (!error) return;
    return error.data.error.error.message;
  }
}
