import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntityAction, EntityCollectionService, EntityServices } from '@ngrx/data';
import { Observable } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { Instance } from 'src/app/store/instances/instance.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstancesComponent {
  instanceService: EntityCollectionService<Instance>;
  instances$: Observable<Array<Instance>>;
  loading$: Observable<boolean>;
  errors$: Observable<EntityAction<any>>;

  constructor(
    private readonly entityServices: EntityServices,
    private readonly applicationService: ApplicationService
  ) { 
    this.instanceService = this.entityServices.getEntityCollectionService('Instance');
    this.instanceService.load();
    this.instances$ = this.instanceService.entities$;
    this.loading$ = this.instanceService.loading$;
    this.errors$ = this.instanceService.errors$;
  }

  deleteInstance(instance: Instance): void {
    this.instanceService.delete(instance._id);
  }

  getErrorMessage(error: any){
    if (!error) return;
    return error.data.error.error.message;
  }

  selectInstance(instance: Instance): void {
    if (this.applicationService.isSelectedInstance(instance._id)) {
      this.applicationService.selectedInstance = undefined;
    } else {
      this.applicationService.selectedInstance = instance;
    }
  }

  isSelected(instance: Instance): boolean {
    return this.applicationService.isSelectedInstance(instance._id);
  }
}
