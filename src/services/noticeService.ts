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
import { db } from "@/app/firebase";
import { Notice } from "@/types";

const COLLECTION_NAME = "notices";

// 공지사항 목록 조회 (페이지네이션)
export async function getNotices(
  pageSize = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>,
) {
  try {
    let noticesQuery;

    if (lastDoc) {
      noticesQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy("date", "desc"),
        startAfter(lastDoc),
        limit(pageSize),
      );
    } else {
      noticesQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy("date", "desc"),
        limit(pageSize),
      );
    }

    const snapshot = await getDocs(noticesQuery);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    const notices = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Notice, "id">),
    }));

    return { notices, lastVisible };
  } catch (error) {
    console.error("Error getting notices: ", error);
    throw error;
  }
}

// 공지사항 상세 조회
export async function getNoticeById(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<Notice, "id">),
    };
  } catch (error) {
    console.error("Error getting notice: ", error);
    throw error;
  }
}

// 공지사항 생성
export async function createNotice(notice: Omit<Notice, "id">) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...notice,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating notice: ", error);
    throw error;
  }
}

// 공지사항 수정
export async function updateNotice(
  id: string,
  notice: Partial<Omit<Notice, "id">>,
) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...notice,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating notice: ", error);
    throw error;
  }
}

// 공지사항 삭제
export async function deleteNotice(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.error("Error deleting notice: ", error);
    throw error;
  }
}

// 정적 데이터를 Firebase로 마이그레이션
export async function migrateNoticesToFirebase(notices: Notice[]) {
  try {
    const batch = [];

    for (const notice of notices) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...noticeData } = notice;
      batch.push(
        addDoc(collection(db, COLLECTION_NAME), {
          ...noticeData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }),
      );
    }

    await Promise.all(batch);
    return true;
  } catch (error) {
    console.error("Error migrating notices: ", error);
    throw error;
  }
}
