import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appAvatar]',
})
export class AvatarDirective implements OnInit {
  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
    const avatar = this.document.querySelector('.avatar') as any;
    const file = this.document.querySelector('#files') as HTMLInputElement;

    avatar?.addEventListener('click', () => {
      file.click();
    });
    file.addEventListener('change', (e) => {
      const fileImg = e.target as any;
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(fileImg.files[0]);
        fileReader.onload = () => {
          avatar.src = fileReader.result;
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    });
  }
}
