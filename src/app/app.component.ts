import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuComponent } from './shared/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './ui/dialog/dialog.component';
import { DialogData } from './ui/dialog/dialog.model';
import { MatIconModule } from '@angular/material/icon';
import { LanguageComponent } from './ui/language/language.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslateModule,
    RouterOutlet,
    RouterLink,
    MenuComponent,
    MatIconModule,
    LanguageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
// TODO create in node js admin for add new projects (to automatize process of adding new projects for client)
export class AppComponent {
  readonly dialog = inject(MatDialog);
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pl', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() === 'pl' ? 'pl' : 'en');
  }

  public openContactDialog(): void {
    const data: DialogData = {
      title: 'contact.title',
      content: ['contact.phone', 'contact.email'],
    };
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: data,
    });
  }
}
