import { HttpClient } from '@angular/common/http';
import { MyUploadAdapter } from './myuploadAdapter';

export const onEditorReady = (editor: any, http: HttpClient) => {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader, http);
  };
};
