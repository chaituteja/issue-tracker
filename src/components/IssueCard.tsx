import { useState } from "react";
import { useLocation } from "react-router";
import ViewModal from "./ViewModal";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  wasEditedInOpenPage?: boolean;
}

interface IssueCardProps {
  issue: Issue;
  onDelete: (id: string) => void;
}

export default function IssueCard({ issue, onDelete }: IssueCardProps) {
  const location = useLocation();
  const [showViewModal, setShowViewModal] = useState(false);
  const isAllIssuesPage = location.pathname === "/";

  function truncatedDescription(desc: string, maxLength = 50) {
    if (desc.length <= maxLength) return desc;
    return desc.slice(0, maxLength) + "...";
  }
  return (
    <>
      <div className="grid 2xl:grid-rows-subgrid 2xl:row-span-5 gap-4 items-start p-4 border border-gray-300 dark:border-gray-700 rounded">
        <div className="grid grid-cols-4 items-center">
          {issue.wasEditedInOpenPage && (
            <p className="text-sm text-blue-500 dark:text-blue-400 col-span-3">
              Last Edited: {new Date(issue.updatedAt).toLocaleString()}
            </p>
          )}

          {isAllIssuesPage && (
            <p className="p-2 text-sm rounded text-center justify-self-end col-start-4 bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200">
              Open
            </p>
          )}
        </div>

        <h2 className="font-bold text-lg">{issue.title}</h2>

        <p>
          {isAllIssuesPage
            ? truncatedDescription(issue.description)
            : issue.description}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created: {new Date(issue.createdAt).toLocaleString()}
        </p>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onDelete(issue.id)}
            className="cursor-pointer px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Delete
          </button>
          {isAllIssuesPage && issue.description.length > 50 && (
            <button
              onClick={() => setShowViewModal(true)}
              className="cursor-pointer px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              View
            </button>
          )}
        </div>
      </div>
      {showViewModal && (
        <ViewModal
          title={issue.title}
          desc={issue.description}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </>
  );
}
