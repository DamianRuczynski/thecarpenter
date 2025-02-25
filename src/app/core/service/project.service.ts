import { Injectable } from '@angular/core';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import {
  BehaviorSubject,
  combineLatest,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Category, Media, Room, TProject } from '../models/project.model';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProjects(room: Room, category?: Category): Observable<TProject[]> {
    const roomCollection = collection(db, room);

    let projectsQuery;
    if (category) {
      projectsQuery = query(roomCollection, where('category', '==', category));
    } else {
      projectsQuery = query(roomCollection);
    }

    return from(getDocs(projectsQuery)).pipe(
      switchMap((snapshot) => {
        const projects = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
              media: [] as Media[],
            } as TProject)
        );
        if (projects.length === 0) {
          return of([]);
        }
        const projectsWithMedia$ = projects.map((project) => {
          const mediaCollection = collection(db, `${room}/${project.id}/media`);
          return from(getDocs(mediaCollection)).pipe(
            map((mediaSnapshot) => {
              const media = mediaSnapshot.docs.map(
                (mediaDoc) => mediaDoc.data() as Media
              );

              return {
                ...project,
                media,
              };
            })
          );
        });
        return combineLatest(projectsWithMedia$);
      })
    );
  }
}
