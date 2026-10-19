import type { Priority, Status } from "../interfaces/Task";

export const STATUS_LABEL: Record<Status, string> = {
  todo: "Yapılacak",
  doing: "Sürüyor",
  done: "Bitti",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
};

export const NEXT_STATUS: Record<Status, Status> = { todo: "doing", doing: "done", done: "todo" };

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
}

export function isOverdue(iso: string, status: Status): boolean {
  if (!iso || status === "done") return false;
  const today = new Date();
  const t = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return iso < t;
}
