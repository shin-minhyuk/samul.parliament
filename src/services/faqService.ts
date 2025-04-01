import { db } from "@/app/firebase";
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
  serverTimestamp,
} from "firebase/firestore";
import { FAQ } from "@/types";

const COLLECTION_NAME = "faqs";

// FAQ 목록 조회 (생성일 순)
export async function getFaqs(): Promise<FAQ[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "asc"),
    );
    const snapshot = await getDocs(q);
    const faqs: FAQ[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        question: data.question,
        answer: data.answer,
        category: data.category || "uncategorized", // 카테고리가 없을 경우 기본값
        tags: data.tags || [],
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      };
    });
    return faqs;
  } catch (error) {
    console.error("Error getting FAQs: ", error);
    throw error;
  }
}

// FAQ 상세 조회
export async function getFaqById(id: string): Promise<FAQ | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      question: data.question,
      answer: data.answer,
      category: data.category || "uncategorized",
      tags: data.tags || [],
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as FAQ;
  } catch (error) {
    console.error(`Error getting FAQ with ID ${id}: `, error);
    throw error;
  }
}

// FAQ 생성
export async function createFaq(
  faq: Omit<FAQ, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...faq,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating FAQ: ", error);
    throw error;
  }
}

// FAQ 수정
export async function updateFaq(
  id: string,
  faq: Partial<Omit<FAQ, "id" | "createdAt" | "updatedAt">>,
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...faq,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating FAQ with ID ${id}: `, error);
    throw error;
  }
}

// FAQ 삭제
export async function deleteFaq(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting FAQ with ID ${id}: `, error);
    throw error;
  }
}
