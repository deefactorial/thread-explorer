import { Component, OnInit } from '@angular/core';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Instance } from 'src/app/store/instances/instance.model';
import { ApplicationService } from 'src/app/services/application.service';
import { map, tap } from 'rxjs/operators';
import { EditorComponent } from 'ngx-monaco-editor';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'json'};
  instanceService: EntityCollectionService<any>;
  selectedInstance$: Observable<string>;
  editor;
  constructor( 
    private readonly entityServices: EntityServices,
    private readonly applicationService: ApplicationService) {
    this.instanceService = this.entityServices.getEntityCollectionService('Instance');
    this.selectedInstance$ = this.applicationService.selectedInstance$.pipe(
      tap(instance => console.log('instance', instance)),
      map(instance => JSON.stringify(instance))
    );
  }
  ngOnInit(): void { 
    
  }
  editorInit(editor: EditorComponent) {
    console.log('editor', editor)
    this.editor = editor;
  }
  add(): void {
    this.instanceService.add(this.editor.getValue());
  }
}
