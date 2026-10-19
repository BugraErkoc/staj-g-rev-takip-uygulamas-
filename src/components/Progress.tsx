import type { Task } from "../interfaces/Task";

export default function Progress({ tasks }: { tasks: Task[] }) {
  const done = tasks.filter((t) => t.status === "done").length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  return (
    <div>
      <p className="text-sm font-semibold">
        {tasks.length === 0 ? "Henüz görev yok" : `${done} / ${tasks.length} görev tamamlandı`}
      </p>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Tamamlanma oranı">
        <div className="h-full rounded-full bg-done transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
