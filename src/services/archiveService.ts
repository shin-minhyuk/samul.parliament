import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/app/firebase";
import { ArchiveItem } from "@/types";

const COLLECTION_NAME = "archives";

// 아카이브 항목 목록 조회 (페이지네이션)
export async function getArchiveItems(
  pageSize = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>,
) {
  try {
    let archiveQuery;

    if (lastDoc) {
      archiveQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy("date", "desc"),
        startAfter(lastDoc),
        limit(pageSize),
      );
    } else {
      archiveQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy("date", "desc"),
        limit(pageSize),
      );
    }

    const snapshot = await getDocs(archiveQuery);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    const archives = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ArchiveItem, "id">),
    }));

    return { archives, lastVisible };
  } catch (error) {
    console.error("Error getting archive items: ", error);
    throw error;
  }
}

// 아카이브 항목 상세 조회
export async function getArchiveItemById(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<ArchiveItem, "id">),
    };
  } catch (error) {
    console.error("Error getting archive item: ", error);
    throw error;
  }
}

// 이미지 업로드
export async function uploadArchiveImage(file: File) {
  try {
    const storageRef = ref(storage, `archives/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return { name: file.name, url: downloadURL };
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
}

// 아카이브 항목 생성
export async function createArchiveItem(archiveItem: Omit<ArchiveItem, "id">) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...archiveItem,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating archive item: ", error);
    throw error;
  }
}

// 아카이브 항목 수정
export async function updateArchiveItem(
  id: string,
  archiveItem: Partial<Omit<ArchiveItem, "id">>,
) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...archiveItem,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating archive item: ", error);
    throw error;
  }
}

// 아카이브 항목 삭제
export async function deleteArchiveItem(
  id: string,
  imageFileName?: string,
  isImageType?: boolean,
) {
  try {
    // Firestore에서 문서 삭제
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);

    // Storage에서 이미지 삭제(필요한 경우)
    if (imageFileName && isImageType) {
      const imageRef = ref(storage, `archives/${imageFileName}`);
      await deleteObject(imageRef);
    }

    return true;
  } catch (error) {
    console.error("Error deleting archive item: ", error);
    throw error;
  }
}
