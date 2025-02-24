import { Injectable } from '@angular/core';
import { Category, MenuConfig, Room, TProject } from '../models/project.model';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { db } from '../firebase/firebase.config';
import { getDocs, collection, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuConfigSubject = new BehaviorSubject<MenuConfig[]>([]);
  public menuConfig$ = this.menuConfigSubject.asObservable();

  constructor() {
    this.initializeMenuConfig();
  }

  private async initializeMenuConfig(): Promise<void> {
    const menuConfig = await this.buildMenuConfig();
    this.menuConfigSubject.next(menuConfig);
  }

  private async buildMenuConfig(): Promise<MenuConfig[]> {
    const collections = await this.getExistingCollections();
    const menuConfig: MenuConfig[] = [];

    for (const room of collections) {
      const categories = await this.getCategoriesForRoom(room as Room);
      if (categories.length > 0) {
        menuConfig.push({
          room: room as Room,
          categories,
        });
      }
    }

    return menuConfig;
  }

  private async getExistingCollections(): Promise<Room[]> {
    const existingRooms: Room[] = [];
    for (const room of Object.values(Room)) {
      const roomCollection = collection(db, room);
      const snapshot = await getDocs(query(roomCollection));
      if (!snapshot.empty) {
        existingRooms.push(room);
      }
    }
    return existingRooms;
  }

  private async getCategoriesForRoom(room: Room): Promise<Category[]> {
    const roomCollection = collection(db, room);
    const snapshot = await getDocs(query(roomCollection));
    const categories = new Set<Category>();
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data['category']) {
        categories.add(data['category'] as Category);
      }
    });

    return Array.from(categories);
  }

  public getProjects(room: Room, category?: Category): Observable<TProject[]> {
    const roomCollection = collection(db, room);

    let response;
    if (category) {
      response = query(roomCollection, where('category', '==', category));
    } else {
      response = query(roomCollection);
    }

    return from(getDocs(response)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TProject))
      )
    );
  }

  public async refreshMenuConfig(): Promise<void> {
    return this.initializeMenuConfig();
  }
}
