import { db } from '@/firebase/config'
import {
  DocumentReference,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  CollectionReference,
  addDoc,
  Timestamp,
  Query,
  updateDoc,
} from 'firebase/firestore'

interface DocumentData {
  [key: string]: unknown
}

// 컬렉션 다루기
export function firebase_getCollection(colName: string) {
  const collectionRef = collection(db, colName)
  return collectionRef
}

export async function firebase_collection_addDoc(
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

export async function firebase_collection_getDoc(
  ref: CollectionReference | Query
) {
  const querySnapshot = await getDocs(ref)
  return querySnapshot
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

export async function firebase_updateDoc(ref: DocumentReference, data: any) {
  const docRef = ref
  try {
    await updateDoc(docRef, {
      ...data,
      updateAt: Timestamp.fromDate(new Date()),
    })

    return (await firebase_getDoc(docRef)).data()
  } catch (err) {
    console.error('Error updating document: ', err)
    return null
  }
}
