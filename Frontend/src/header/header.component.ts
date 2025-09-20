import {Component, OnInit} from '@angular/core';
import {TranslateService, _} from '@ngx-translate/core';
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
  translation: TranslateService;
  title: Title;
  form!: FormGroup;
  constructor(private translate: TranslateService, private titleService: Title) {
    this.translation = this.translate;
    this.title = this.titleService;

    this.translate.stream('common.title').subscribe((res: string) => {
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
