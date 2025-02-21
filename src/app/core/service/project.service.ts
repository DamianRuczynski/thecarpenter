import { Injectable } from '@angular/core';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { BehaviorSubject } from 'rxjs';
import { Category, Room, TProject } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  async getProjects(room: Room, category?: Category): Promise<TProject[]> {
    const roomCollection = collection(db, room);

    let response;
    if (category) {
      response = query(roomCollection, where('category', '==', category));
    } else {
      response = query(roomCollection);
    }

    const snapshot = await getDocs(response);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as TProject)
    );
  }
}
