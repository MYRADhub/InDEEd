export default function FileExplorer({ files, activeFile, setActiveFile }) {
  return (
    <div className="bg-gray-900 text-white px-3 py-2 text-sm h-full overflow-auto rounded-md">
      <ul className="space-y-1">
        {Object.keys(files).map((filename) => (
          <li
            key={filename}
            onClick={() => setActiveFile(filename)}
            className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-700 ${
              activeFile === filename ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {filename}
          </li>
        ))}
      </ul>
    </div>
  );
}