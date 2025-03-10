import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tcp-language',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
})
export class LanguageComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pl', 'en']);
    const savedLang = localStorage.getItem('userLang');
    const browserLang = translate.getBrowserLang();
    const langToUse = savedLang || (browserLang === 'pl' ? 'pl' : 'en');
    translate.setDefaultLang(langToUse);
    translate.use(langToUse);
  }
  changeLanguageFn(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('userLang', lang);
  }
}
