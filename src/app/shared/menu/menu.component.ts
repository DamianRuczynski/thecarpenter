import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RoomCategories } from '../../core/models/project.model';
import { ScrollbarDirective } from '../directives/scrollbar.directive';
import { MenuService } from '../../core/service/menu.service';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
  constructor(public menu: MenuService) {}
}
