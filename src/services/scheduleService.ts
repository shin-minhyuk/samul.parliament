import { supabase } from "@/lib/supabase";
import { ScheduleEvent } from "@/types";
import { isAdminEmail } from "@/constants/const";

// admin 권한 확인 함수 (이메일 기반)
async function checkAdminPermission() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  if (!user.email || !isAdminEmail(user.email)) {
    throw new Error("관리자 권한이 필요합니다.");
  }
}

// 일정 목록 조회 (페이지네이션)
export async function getScheduleEvents(
  page = 1,
  pageSize = 10,
): Promise<{ events: ScheduleEvent[]; total: number; hasMore: boolean }> {
  try {
    const offset = (page - 1) * pageSize;

    const {
      data: events,
      error,
      count,
    } = await supabase
      .from("schedules")
      .select("*", { count: "exact" })
      .order("date", { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error("Error fetching schedule events:", error);
      throw new Error("일정을 불러오는데 실패했습니다.");
    }

    // 날짜 형식 변환
    const formattedEvents =
      events?.map((event) => ({
        ...event,
        startTime: event.start_time,
        endTime: event.end_time,
      })) || [];

    return {
      events: formattedEvents,
      total: count || 0,
      hasMore: (count || 0) > offset + pageSize,
    };
  } catch (error) {
    console.error("getScheduleEvents 함수에서 예외 발생:", error);
    throw error;
  }
}

// 일정 상세 조회
export async function getScheduleEventById(
  id: string,
): Promise<ScheduleEvent | null> {
  const { data: event, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // 데이터를 찾을 수 없음
    }
    console.error("Error getting schedule event:", error);
    throw new Error("일정을 불러오는데 실패했습니다.");
  }

  return {
    ...event,
    startTime: event.start_time,
    endTime: event.end_time,
  };
}

// 일정 생성 (admin만 가능)
export async function createScheduleEvent(
  event: Omit<ScheduleEvent, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  await checkAdminPermission();

  const { data: newEvent, error } = await supabase
    .from("schedules")
    .insert({
      title: event.title,
      description: event.description,
      date: event.date,
      start_time: event.startTime,
      end_time: event.endTime,
      location: event.location,
      type: event.type,
      important: event.important || false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating schedule event:", error);
    throw new Error("일정 생성에 실패했습니다.");
  }

  return newEvent.id;
}

// 일정 수정 (admin만 가능)
export async function updateScheduleEvent(
  id: string,
  event: Partial<Omit<ScheduleEvent, "id" | "createdAt" | "updatedAt">>,
): Promise<boolean> {
  await checkAdminPermission();

  const updateData: Partial<{
    title: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    type: string;
    important: boolean;
  }> = {};

  if (event.title !== undefined) updateData.title = event.title;
  if (event.description !== undefined)
    updateData.description = event.description;
  if (event.date !== undefined) updateData.date = event.date;
  if (event.startTime !== undefined) updateData.start_time = event.startTime;
  if (event.endTime !== undefined) updateData.end_time = event.endTime;
  if (event.location !== undefined) updateData.location = event.location;
  if (event.type !== undefined) updateData.type = event.type;
  if (event.important !== undefined) updateData.important = event.important;

  const { error } = await supabase
    .from("schedules")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Error updating schedule event:", error);
    throw new Error("일정 수정에 실패했습니다.");
  }

  return true;
}

// 일정 삭제 (admin만 가능)
export async function deleteScheduleEvent(id: string): Promise<boolean> {
  await checkAdminPermission();

  const { error } = await supabase.from("schedules").delete().eq("id", id);

  if (error) {
    console.error("Error deleting schedule event:", error);
    throw new Error("일정 삭제에 실패했습니다.");
  }

  return true;
}

// 특정 기간의 일정 조회
export async function getScheduleEventsByDateRange(
  startDate: string,
  endDate: string,
): Promise<ScheduleEvent[]> {
  const { data: events, error } = await supabase
    .from("schedules")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error getting schedule events by date range:", error);
    throw new Error("일정을 불러오는데 실패했습니다.");
  }

  return (
    events?.map((event) => ({
      ...event,
      startTime: event.start_time,
      endTime: event.end_time,
    })) || []
  );
}

// 특정 타입의 일정 조회
export async function getScheduleEventsByType(
  type: string,
): Promise<ScheduleEvent[]> {
  const { data: events, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("type", type)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error getting schedule events by type:", error);
    throw new Error("일정을 불러오는데 실패했습니다.");
  }

  return (
    events?.map((event) => ({
      ...event,
      startTime: event.start_time,
      endTime: event.end_time,
    })) || []
  );
}

// 중요 일정만 조회
export async function getImportantScheduleEvents(): Promise<ScheduleEvent[]> {
  const { data: events, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("important", true)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error getting important schedule events:", error);
    throw new Error("중요 일정을 불러오는데 실패했습니다.");
  }

  return (
    events?.map((event) => ({
      ...event,
      startTime: event.start_time,
      endTime: event.end_time,
    })) || []
  );
}
