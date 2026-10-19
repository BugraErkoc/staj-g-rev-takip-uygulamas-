import { useState } from "react";
import type { Task, TaskDraft } from "../interfaces/Task";
import { NEXT_STATUS, PRIORITY_LABEL, STATUS_LABEL, formatDate, isOverdue } from "../utils/labels";
import TaskForm from "./TaskForm";

interface Props {
  task: Task;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const STATUS_STYLE = {
  todo: "border-slate-400 bg-white text-slate-700",
  doing: "border-doing bg-amber-50 text-doing",
  done: "border-done bg-green-50 text-done",
} as const;

const BAR = { low: "bg-slate-300", medium: "bg-brand", high: "bg-danger" } as const;

export default function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const overdue = isOverdue(task.due, task.status);

  if (editing) {
    const initial: TaskDraft = { title: task.title, note: task.note, priority: task.priority, due: task.due };
    return (
      <li className="rounded-lg border border-brand bg-white p-4 shadow-sm">
        <TaskForm
          initial={initial}
          submitLabel="Değişiklikleri kaydet"
          onSubmit={(draft) => { onUpdate(task.id, draft); setEditing(false); }}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className="flex overflow-hidden rounded-lg border border-line bg-white">
      <span className={`w-1.5 shrink-0 ${BAR[task.priority]}`} aria-hidden="true" />
      <div className="flex-1 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className={`text-base font-semibold ${task.status === "done" ? "text-slate-500 line-through" : ""}`}>{task.title}</h3>
          <button
            onClick={() => onUpdate(task.id, { status: NEXT_STATUS[task.status] })}
            className={`rounded-full border px-3 py-1 text-xs font-bold ${STATUS_STYLE[task.status]}`}
            aria-label={`Durum: ${STATUS_LABEL[task.status]}. Sonraki duruma geçmek için tıkla`}
            title="Sonraki duruma geç"
          >
            {STATUS_LABEL[task.status]}
          </button>
        </div>
        {task.note && <p className="mt-1 text-sm text-slate-600">{task.note}</p>}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-slate-600">
            {PRIORITY_LABEL[task.priority]} öncelik
            {task.due && (
              <span className={overdue ? "ml-2 font-semibold text-danger" : "ml-2"}>
                · {overdue ? "Süresi geçti: " : "Son tarih: "}{formatDate(task.due)}
              </span>
            )}
          </p>
          <div className="flex gap-1">
            {confirming ? (
              <>
                <button onClick={() => onDelete(task.id)} className="rounded-md bg-danger px-3 py-1 font-semibold text-white">Evet, sil</button>
                <button onClick={() => setConfirming(false)} className="rounded-md border border-line px-3 py-1 font-semibold hover:bg-mist">Vazgeç</button>
              </>
            ) : (
              <>
                <button onClick={() => setEditing(true)} className="rounded-md border border-line px-3 py-1 font-semibold hover:bg-mist">Düzenle</button>
                <button onClick={() => setConfirming(true)} className="rounded-md border border-line px-3 py-1 font-semibold text-danger hover:bg-red-50">Sil</button>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
