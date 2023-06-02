import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MyUploadAdapter } from './saveImage';
import { baseURL } from 'src/app/utils/instance';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  Editor = ClassicEditor;
  selectedFile!: File;
  public editorConfig: any;
  constructor(private http: HttpClient) {}
  // onPost() {
  //   console.log(this.content.value);
  // }

  // onEditorReady(editor: any) {
  //   editor.plugins.get('FileRepository').createUploadAdapter = (
  //     loader: any
  //   ) => {
  //     return new MyUploadAdapter(loader, this.http);
  //   };
  // }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   // console.log(this.selectedFile);
  // }

  // onPostFile() {
  //   if (this.selectedFile) {
  //     const formData: FormData = new FormData();
  //     formData.append('images', this.selectedFile, this.selectedFile.name);

  //     this.http.post(`${baseURL}/images/upload`, formData).subscribe(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         // Handle the upload error
  //       }
  //     );
  //   }
  // }
}
