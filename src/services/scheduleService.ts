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
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { ScheduleEvent } from "@/types";

const COLLECTION_NAME = "schedules";

// 일정 목록 조회 (페이지네이션)
export async function getScheduleEvents(
  pageSize = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>,
) {
  try {
    let eventsQuery;

    if (lastDoc) {
      eventsQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy("date", "asc"),
        startAfter(lastDoc),
        limit(pageSize),
      );
    } else {
      eventsQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy("date", "asc"),
        limit(pageSize),
      );
    }

    const snapshot = await getDocs(eventsQuery);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ScheduleEvent, "id">),
      date: doc.data().date.toDate().toISOString().split("T")[0],
    }));

    return { events, lastVisible };
  } catch (error) {
    console.error("Error getting schedule events: ", error);
    throw error;
  }
}

// 일정 상세 조회
export async function getScheduleEventById(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      date: data.date.toDate().toISOString().split("T")[0],
    } as ScheduleEvent;
  } catch (error) {
    console.error("Error getting schedule event: ", error);
    throw error;
  }
}

// 일정 생성
export async function createScheduleEvent(event: Omit<ScheduleEvent, "id">) {
  try {
    // 날짜를 Firestore Timestamp로 변환
    const eventData = {
      ...event,
      date: Timestamp.fromDate(new Date(event.date)),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), eventData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating schedule event: ", error);
    throw error;
  }
}

// 일정 수정
export async function updateScheduleEvent(
  id: string,
  event: Partial<Omit<ScheduleEvent, "id">>,
) {
  try {
    // Firestore 업데이트에 필요한 객체 생성
    const baseUpdateData = {
      ...event,
      updatedAt: serverTimestamp(),
    };

    // 날짜 필드 제외 (별도 처리)
    const { date, ...updateFields } = baseUpdateData;

    const docRef = doc(db, COLLECTION_NAME, id);

    // 기본 필드 업데이트
    await updateDoc(docRef, updateFields);

    // 날짜가 있는 경우 별도로 업데이트
    if (date) {
      await updateDoc(docRef, {
        date: Timestamp.fromDate(new Date(date)),
      });
    }

    return true;
  } catch (error) {
    console.error("Error updating schedule event: ", error);
    throw error;
  }
}

// 일정 삭제
export async function deleteScheduleEvent(id: string) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting schedule event: ", error);
    throw error;
  }
}

// 특정 기간의 일정 조회
export async function getScheduleEventsByDateRange(
  startDate: string,
  endDate: string,
) {
  try {
    const eventsQuery = query(
      collection(db, COLLECTION_NAME),
      where("date", ">=", Timestamp.fromDate(new Date(startDate))),
      where("date", "<=", Timestamp.fromDate(new Date(endDate))),
      orderBy("date", "asc"),
    );

    const snapshot = await getDocs(eventsQuery);

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ScheduleEvent, "id">),
      date: doc.data().date.toDate().toISOString().split("T")[0],
    }));

    return events;
  } catch (error) {
    console.error("Error getting schedule events by date range: ", error);
    throw error;
  }
}

// 특정 타입의 일정 조회
export async function getScheduleEventsByType(type: string) {
  try {
    const eventsQuery = query(
      collection(db, COLLECTION_NAME),
      where("type", "==", type),
      orderBy("date", "asc"),
    );

    const snapshot = await getDocs(eventsQuery);

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ScheduleEvent, "id">),
      date: doc.data().date.toDate().toISOString().split("T")[0],
    }));

    return events;
  } catch (error) {
    console.error("Error getting schedule events by type: ", error);
    throw error;
  }
}

// 중요 일정만 조회
export async function getImportantScheduleEvents() {
  try {
    const eventsQuery = query(
      collection(db, COLLECTION_NAME),
      where("important", "==", true),
      orderBy("date", "asc"),
    );

    const snapshot = await getDocs(eventsQuery);

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ScheduleEvent, "id">),
      date: doc.data().date.toDate().toISOString().split("T")[0],
    }));

    return events;
  } catch (error) {
    console.error("Error getting important schedule events: ", error);
    throw error;
  }
}
