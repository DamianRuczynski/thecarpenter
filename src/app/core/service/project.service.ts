import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore';
import { db, storage } from '../firebase/firebase.config';
import { combineLatest, from, map, Observable, of, switchMap } from 'rxjs';
import {
  Catalog,
  Category,
  Media,
  MediaCategory,
  Room,
  TProject,
} from '../models/project.model';
import { TPagination } from '../models/common.model';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

  public getProject(room: Room, projectId: string): Observable<TProject> {
    const projectRef = doc(db, room, projectId);

    return from(getDoc(projectRef)).pipe(
      switchMap((docSnapshot) => {
        if (!docSnapshot.exists()) {
          throw new Error(`Project with ID ${projectId} not found`);
        }

        const project = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
          media: [] as Media[],
          catalogs: [] as Catalog[],
        } as TProject;

        const mediaCollection = collection(db, `${room}/${project.id}/media`);
        const mediaQuery$ = from(getDocs(mediaCollection)).pipe(
          map((mediaSnapshot) => {
            return mediaSnapshot.docs.map(
              (mediaDoc) => mediaDoc.data() as Media
            );
          })
        );

        const catalogsCollection = collection(
          db,
          `${room}/${project.id}/catalogs`
        );
        const catalogsQuery$ = from(getDocs(catalogsCollection)).pipe(
          map((catalogsSnapshot) => {
            return catalogsSnapshot.docs.map(
              (catalogDoc) => catalogDoc.data() as Catalog
            );
          })
        );

        return combineLatest([mediaQuery$, catalogsQuery$]).pipe(
          map(([media, catalogs]) => {
            return {
              ...project,
              media,
              catalogs,
            };
          })
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

  // DODAJ PROJEKT

  async addProject(
    title: string,
    room: Room,
    category: Category | null,
    description: string,
    files: File[]
  ): Promise<void> {
    // Najpierw zapisujemy dokument projektu bez pola media
    const projectData: Omit<TProject, 'id' | 'media'> = {
      title,
      description,
      category: category,
      catalogs: [],
    };

    // Dodajemy dokument projektu do kolekcji room
    const projectRef = await addDoc(collection(db, room), projectData);

    // Upload zdjęć i zapis do subkolekcji media
    const mediaCollection = collection(db, room, projectRef.id, 'media');
    const mediaPromises = files.map(async (file) => {
      const storageRef = ref(
        storage,
        `projects/${room}/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const mediaData: Media = { category: MediaCategory.IMAGE as const, url };
      await addDoc(mediaCollection, mediaData);
    });

    await Promise.all(mediaPromises);
  }
}
