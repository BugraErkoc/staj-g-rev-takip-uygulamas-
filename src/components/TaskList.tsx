import type { Filter, Task } from "../interfaces/Task";
import { STATUS_LABEL } from "../utils/labels";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  filter: Filter;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, filter, onUpdate, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
        <p className="font-semibold">
          {filter === "all" ? "Henüz görev eklemedin" : `“${STATUS_LABEL[filter]}” durumunda görev yok`}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {filter === "all" ? "Soldaki formdan ilk görevini ekle." : "Başka bir filtre seç ya da yeni görev ekle."}
        </p>
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
