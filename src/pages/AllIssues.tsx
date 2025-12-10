import { useEffect, useState } from "react";
import IssueCard from "../components/IssueCard";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  wasEditedInOpenPage?: boolean;
}

function saveIssues(issues: Issue[]): void {
  localStorage.setItem("issues", JSON.stringify(issues));
}

function loadIssues(): Issue[] {
  const data = localStorage.getItem("issues");
  return data ? JSON.parse(data) : [];
}

function sortIssues(issues: Issue[]) {
  return issues.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export default function AllIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const loadedIssues = loadIssues();
    setIssues(sortIssues(loadedIssues));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (title.trim() && desc.trim()) {
      addIssue(title.trim(), desc.trim());
      setTitle("");
      setDesc("");
    }
  }

  function addIssue(title: string, desc: string) {
    const now = new Date().toISOString();
    const newIssue: Issue = {
      id: crypto.randomUUID(),
      title,
      description: desc,
      status: "open",
      createdAt: now,
      updatedAt: now,
    };
    const updatedIssues = [...issues, newIssue];
    saveIssues(updatedIssues);
    setIssues(sortIssues(updatedIssues));
  }

  function deleteIssue(id: string) {
    const updatedIssues = issues.filter((issue) => issue.id !== id);
    saveIssues(updatedIssues);
    setIssues(sortIssues(updatedIssues));
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Create a New Issue</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4 lg:max-w-xl">
        <div className="space-y-2">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="w-full px-3 py-2 border border-slate-400 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-bold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border border-slate-400 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
            rows={3}
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Issue
        </button>
      </form>

      <section
        id="issues-list"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onDelete={deleteIssue} />
        ))}
      </section>
    </>
  );
}
