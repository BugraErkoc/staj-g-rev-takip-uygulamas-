import type { Filter, Task } from "../interfaces/Task";
import { STATUS_LABEL } from "../utils/labels";

interface Props {
  value: Filter;
  tasks: Task[];
  onChange: (f: Filter) => void;
}

const OPTIONS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tümü" },
  { key: "todo", label: STATUS_LABEL.todo },
  { key: "doing", label: STATUS_LABEL.doing },
  { key: "done", label: STATUS_LABEL.done },
];

export default function FilterBar({ value, tasks, onChange }: Props) {
  return (
    <div role="group" aria-label="Görevleri filtrele" className="flex flex-wrap gap-2">
      {OPTIONS.map(({ key, label }) => {
        const count = key === "all" ? tasks.length : tasks.filter((t) => t.status === key).length;
        const active = value === key;
        return (
          <button
            key={key}
            aria-pressed={active}
            onClick={() => onChange(key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
              active ? "border-brand bg-brand text-white" : "border-line bg-white hover:bg-brand-soft"
            }`}
          >
            {label} <span className={active ? "text-white/80" : "text-slate-500"}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}
