import {Component, inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  translation: TranslateService = inject(TranslateService);
  title: Title = inject(Title);
  form!: FormGroup;
  constructor() {
    this.translation.stream('common.title').subscribe((res: string) => {
      this.title.setTitle(res)
    });
  }
  public ngOnInit() {
    this.form = new FormGroup({
      language: new FormControl('')
    });

    this.form.get('language')?.valueChanges.subscribe((lang: string) => {
      this.translation.use(lang)
    })
  }
}
