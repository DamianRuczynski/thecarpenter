import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { TProject } from './project.model';

export type TPagination = {
  projects: TProject[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
};
