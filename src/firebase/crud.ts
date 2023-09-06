import { db } from '@/firebase/config'
import {
  DocumentReference,
  doc,
  getDoc,
  setDoc,
  collection,
  CollectionReference,
  addDoc,
  Timestamp,
} from 'firebase/firestore'

interface DocumentData {
  [key: string]: unknown
}

// 컬렉션 다루기
export function firebase_getCollection(colName: string) {
  const collectionRef = collection(db, colName)
  return collectionRef
}

export async function firebase_addDoc(
  ref: CollectionReference,
  data: DocumentData
) {
  const collectionRef = ref
  const collectionSnap = await addDoc(collectionRef, {
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
    updateAt: Timestamp.fromDate(new Date()),
  })

  return collectionSnap.id
}

// 컬렉션 내에 문서까지 다루기
export function firebase_getDocRef(colName: string, docName: string) {
  const docRef = doc(db, colName, docName)
  return docRef
}

export async function firebase_getDoc(ref: DocumentReference) {
  const docRef = ref
  const docSnap = await getDoc(docRef)

  return docSnap
}

export async function firebase_setDoc(
  ref: DocumentReference,
  data: DocumentData
) {
  const docRef = ref
  await setDoc(docRef, {
    ...data,
    createdAt: Timestamp.fromDate(new Date()),
    updateAt: Timestamp.fromDate(new Date()),
  })
}
