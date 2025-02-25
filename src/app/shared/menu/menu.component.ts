import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RoomCategories } from '../../core/models/project.model';
import { ScrollbarDirective } from '../directives/scrollbar.directive';
import { MenuService } from '../../core/service/menu.service';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../ui/dialog/dialog.component';
import { DialogData } from '../../ui/dialog/dialog.model';

@Component({
  selector: 'tcp-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ScrollbarDirective,
    AsyncPipe,
    TranslateModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  readonly dialog = inject(MatDialog);
  constructor(public menu: MenuService) {}

  public openCatalogDialog(): void {
    const data: DialogData = {
      title: 'catalogs.title',
      isContentLink: true,
      links: [
        {
          name: 'catalogs.drewmax',
          href: 'https://pacyga.pl/wp-content/uploads/2024/09/DREWMAX-KATALOG-DEBOWO-BUKOWY-1_2024_INTERNET.pdf',
        },
        {
          href: 'https://kronospan.com/pl_PL/decors',
          name: 'catalogs.kronospan',
        },
      ],
    };
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: data,
    });
  }
}
