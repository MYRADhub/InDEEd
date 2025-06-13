import { useState } from "react";

export default function FileExplorer({
  vfs,
  onSelectFile,
  selectedFile,
  onCreateFile,
  onDeleteFile,
  onCreateFolder,
  onResetVFS,
  setVfs,
}) {
  return (
    <div className="text-white text-sm overflow-y-auto h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex space-x-2 p-2 border-b border-gray-600 bg-gray-800">
        <button
          className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
          onClick={onCreateFile}
        >
          + File
        </button>
        <button
          className="bg-green-600 px-2 py-1 rounded hover:bg-green-700"
          onClick={onCreateFolder}
        >
          + Folder
        </button>
        <button
          className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
          onClick={onDeleteFile}
        >
          🗑️ Delete
        </button>
        <button
          className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-700"
          onClick={onResetVFS}
        >
          🔄 Reset
        </button>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <TreeNode
          node={vfs}
          onSelectFile={onSelectFile}
          selectedFile={selectedFile}
          setVfs={setVfs}
        />
      </div>
    </div>
  );
}

function TreeNode({ node, onSelectFile, selectedFile, setVfs, depth = 0 }) {
  const [expanded, setExpanded] = useState(true);
  const [tempName, setTempName] = useState(node.name);
  const isSelected = selectedFile === node;
  const isEditing = node.isEditing;
  const indent = { paddingLeft: `${depth * 16}px` };

  const finishRename = () => {
    if (tempName.trim()) {
      node.name = tempName.trim();
    }
    delete node.isEditing;
    setTempName(node.name); // sync with possibly changed name
    setVfs((prev) => ({ ...prev }));
  };

  const baseClasses = `cursor-pointer px-2 py-1 hover:bg-gray-700 ${isSelected ? "bg-gray-700 font-semibold" : ""}`;

  if (node.type === "file") {
    return isEditing ? (
      <input
        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
        style={indent}
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        onBlur={finishRename}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") {
            e.preventDefault();
            finishRename();
          }
        }}
        autoFocus
      />
    ) : (
      <div
        className={baseClasses}
        style={indent}
        onClick={() => onSelectFile(node)}
      >
        📄 {node.name}
      </div>
    );
  }

  // Folder
  return (
    <div>
      {isEditing ? (
        <input
          className="bg-gray-700 text-white px-2 py-1 rounded w-full"
          style={indent}
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onBlur={finishRename}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              e.preventDefault();
              finishRename();
            }
          }}
          autoFocus
        />
      ) : (
        <div
          className={baseClasses}
          style={indent}
          onClick={() => {
            setExpanded(!expanded);
            onSelectFile(node);
          }}
        >
          {expanded ? "📂" : "📁"} {node.name}
        </div>
      )}
      {expanded &&
        node.children.map((child, i) => (
          <TreeNode
            key={`${child.name || "unnamed"}-${i}`}
            node={child}
            onSelectFile={onSelectFile}
            selectedFile={selectedFile}
            setVfs={setVfs}
            depth={depth + 1}
          />
        ))}
    </div>
  );
}