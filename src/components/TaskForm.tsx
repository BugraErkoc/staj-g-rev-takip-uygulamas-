import { useState } from "react";
import type { Priority, TaskDraft } from "../interfaces/Task";
import { PRIORITY_LABEL } from "../utils/labels";

interface Props {
  initial?: TaskDraft;
  submitLabel: string;
  onSubmit: (draft: TaskDraft) => void;
  onCancel?: () => void;
}

const EMPTY: TaskDraft = { title: "", note: "", priority: "medium", due: "" };

export default function TaskForm({ initial = EMPTY, submitLabel, onSubmit, onCancel }: Props) {
  const [draft, setDraft] = useState<TaskDraft>(initial);
  const [error, setError] = useState("");
  const editing = Boolean(onCancel);

  const set = <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (draft.title.trim().length < 3) {
      setError("Görev adı en az 3 karakter olmalı.");
      return;
    }
    onSubmit({ ...draft, title: draft.title.trim(), note: draft.note.trim() });
    if (!editing) {
      setDraft(EMPTY);
      setError("");
    }
  };

  const field = "w-full rounded-md border border-line bg-white px-3 py-2 text-sm placeholder:text-slate-400";
  const id = editing ? "edit" : "new";

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <label htmlFor={`${id}-title`} className="mb-1 block text-sm font-semibold">Görev adı</label>
        <input
          id={`${id}-title`}
          className={field}
          value={draft.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Örn. Müşteri raporunu hazırla"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-medium text-danger">
            {error}
          </p>
        )}
      </div>
      <div>
        <label htmlFor={`${id}-note`} className="mb-1 block text-sm font-semibold">Not</label>
        <textarea
          id={`${id}-note`}
          className={`${field} resize-none`}
          rows={2}
          value={draft.note}
          onChange={(e) => set("note", e.target.value)}
          placeholder="Ayrıntı ya da kime teslim edileceği"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${id}-priority`} className="mb-1 block text-sm font-semibold">Öncelik</label>
          <select
            id={`${id}-priority`}
            className={field}
            value={draft.priority}
            onChange={(e) => set("priority", e.target.value as Priority)}
          >
            {(Object.keys(PRIORITY_LABEL) as Priority[]).map((p) => (
              <option key={p} value={p}>{PRIORITY_LABEL[p]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-due`} className="mb-1 block text-sm font-semibold">Son tarih</label>
          <input id={`${id}-due`} type="date" className={field} value={draft.due} onChange={(e) => set("due", e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold hover:bg-mist">
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}
