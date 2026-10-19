export type Status = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";
export type Filter = "all" | Status;

export interface Task {
  id: string;
  title: string;
  note: string;
  status: Status;
  priority: Priority;
  due: string; // YYYY-MM-DD ya da boş
  createdAt: number;
}

/** Form alanları: yeni görev eklerken ve görevi güncellerken kullanılır */
export interface TaskDraft {
  title: string;
  note: string;
  priority: Priority;
  due: string;
}
