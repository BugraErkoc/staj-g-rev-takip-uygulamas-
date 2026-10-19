import { useMemo, useState } from "react";
import type { Filter, Task, TaskDraft } from "../interfaces/Task";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import Progress from "../components/Progress";

const today = new Date();
const inDays = (n: number) => {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const SEED: Task[] = [
  { id: "s1", title: "Haftalık staj raporunu yaz", note: "Mentora cuma gününe kadar gönderilecek.", status: "doing", priority: "high", due: inDays(2), createdAt: 1 },
  { id: "s2", title: "Git ve GitHub komutlarını tekrar et", note: "commit, push, branch.", status: "todo", priority: "medium", due: inDays(5), createdAt: 2 },
  { id: "s3", title: "Geliştirme ortamını kur", note: "VS Code ve Node.js hazır.", status: "done", priority: "low", due: "", createdAt: 3 },
];

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("staj-gorevleri", SEED);
  const [filter, setFilter] = useState<Filter>("all");

  // EKLE
  const addTask = (draft: TaskDraft) =>
    setTasks((prev) => [{ ...draft, id: crypto.randomUUID(), status: "todo", createdAt: Date.now() }, ...prev]);

  // GÜNCELLE
  const updateTask = (id: string, patch: Partial<Task>) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  // SİL
  const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  // LİSTELE (filtreli)
  const visible = useMemo(
    () => (filter === "all" ? tasks : tasks.filter((t) => t.status === filter)),
    [tasks, filter]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Staj görev takibi</h1>
          <p className="mt-1 text-slate-600">Staj sürecindeki işlerini ekle, düzenle, bitir.</p>
        </div>
        <div className="sm:w-64"><Progress tasks={tasks} /></div>
      </header>

      <div className="grid gap-8 md:grid-cols-[320px_1fr]">
        <section aria-labelledby="yeni-gorev" className="h-fit rounded-lg border border-line bg-white p-5 md:sticky md:top-6">
          <h2 id="yeni-gorev" className="mb-4 text-lg font-bold">Yeni görev</h2>
          <TaskForm submitLabel="Görevi ekle" onSubmit={addTask} />
        </section>

        <section aria-labelledby="gorevler" className="space-y-4">
          <h2 id="gorevler" className="sr-only">Görevler</h2>
          <FilterBar value={filter} tasks={tasks} onChange={setFilter} />
          <TaskList tasks={visible} filter={filter} onUpdate={updateTask} onDelete={deleteTask} />
        </section>
      </div>
    </div>
  );
}
