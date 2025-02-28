import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuComponent } from './shared/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './ui/dialog/dialog.component';
import { DialogData } from './ui/dialog/dialog.model';
import { MatIconModule } from '@angular/material/icon';
import { LanguageComponent } from './ui/language/language.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MediaMatcher } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';

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
    NgClass,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
// TODO create in node js admin for add new projects (to automatize process of adding new projects for client)
export class AppComponent {
  readonly dialog = inject(MatDialog);
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pl', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() === 'pl' ? 'pl' : 'en');

    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  public openContactDialog(): void {
    const data: DialogData = {
      title: 'dialog.contact.title',
      content: ['contact.phone', 'contact.email'],
    };
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: data,
    });
  }
}
