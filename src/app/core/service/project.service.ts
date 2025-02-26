import { Injectable } from '@angular/core';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { combineLatest, from, map, Observable, of, switchMap } from 'rxjs';
import { Category, Media, Room, TProject } from '../models/project.model';
import { TPagination } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public getProjectsPage(
    room: Room,
    pageSize: number = 10,
    lastVisible?: QueryDocumentSnapshot<DocumentData> | null,
    category?: Category
  ): Observable<TPagination> {
    const roomCollection = collection(db, room);
    let projectsQuery;
    if (category) {
      projectsQuery = lastVisible
        ? query(
            roomCollection,
            where('category', '==', category),
            startAfter(lastVisible),
            limit(pageSize)
          )
        : query(
            roomCollection,
            where('category', '==', category),
            limit(pageSize)
          );
    } else {
      projectsQuery = lastVisible
        ? query(
            roomCollection,
            orderBy('title'),
            startAfter(lastVisible),
            limit(pageSize)
          )
        : query(roomCollection, orderBy('title'), limit(pageSize));
    }

    return from(getDocs(projectsQuery)).pipe(
      switchMap((snapshot) => {
        const newLastVisible =
          snapshot.docs.length > 0
            ? snapshot.docs[snapshot.docs.length - 1]
            : null;

        const projects = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
              media: [] as Media[],
            } as TProject)
        );

        if (projects.length === 0) {
          return of({
            projects: [],
            lastVisible: newLastVisible,
          });
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

        return combineLatest(projectsWithMedia$).pipe(
          map((projectsWithMedia) => ({
            projects: projectsWithMedia,
            lastVisible: newLastVisible,
          }))
        );
      })
    );
  }
  getTotalProjectCount(room: Room, category?: Category): Observable<number> {
    const roomCollection = collection(db, room);

    let projectsQuery;
    if (category) {
      projectsQuery = query(roomCollection, where('category', '==', category));
    } else {
      projectsQuery = query(roomCollection);
    }

    return from(getDocs(projectsQuery)).pipe(map((snapshot) => snapshot.size));
  }
}
