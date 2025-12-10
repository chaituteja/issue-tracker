interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  wasEditedInOpenPage?: boolean;
}

export default function IssueCard() {
  return (
    <>
      <div className="grid 2xl:grid-rows-subgrid 2xl:row-span-5 gap-4 items-start p-4 border border-gray-300 dark:border-gray-700 rounded">
        <div className="grid grid-cols-4 items-center">
          <p className="p-2 text-sm rounded text-center justify-self-end col-start-4 bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200">
            Open
          </p>
        </div>

        <h2 className="font-bold text-lg">1</h2>

        <p>1</p>

        <p className="text-sm text-gray-500 dark:text-gray-400"></p>

        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
