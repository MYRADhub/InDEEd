import { useState, useRef } from "react";

export default function FileExplorer({
  vfs,
  onSelectFile,
  selectedFile,
  onCreateFile,
  onDeleteFile,
  onCreateFolder,
  onResetVFS,
  setVfs
}) {
  const draggedNodeRef = useRef(null);

  return (
    <div className="text-white text-sm overflow-y-auto h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex space-x-2 p-2 border-b border-gray-600 bg-gray-800">
        <button className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700" onClick={onCreateFile}>+ File</button>
        <button className="bg-green-600 px-2 py-1 rounded hover:bg-green-700" onClick={onCreateFolder}>+ Folder</button>
        <button className="bg-red-600 px-2 py-1 rounded hover:bg-red-700" onClick={onDeleteFile}>🗑️ Delete</button>
        <button className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-700" onClick={onResetVFS}>🔄 Reset</button>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <TreeNode
          node={vfs}
          vfs={vfs}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
          setVfs={setVfs}
          draggedNodeRef={draggedNodeRef}
        />
      </div>
    </div>
  );
}

function TreeNode({
  node,
  vfs,
  onSelectFile,
  selectedFile,
  setVfs,
  draggedNodeRef,
  depth = 0,
}) {
  const [expanded, setExpanded] = useState(true);
  const [tempName, setTempName] = useState(node.name);
  const [isDragOver, setIsDragOver] = useState(false);
  const indent = { paddingLeft: `${depth * 16}px` };
  const isSelected = selectedFile === node;

  const finishRename = () => {
    if (tempName.trim()) node.name = tempName.trim();
    delete node.isEditing;
    setVfs((prev) => ({ ...prev }));
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const dragged = draggedNodeRef.current;
    if (!dragged || dragged === node || node.type !== "folder") return;

    // Prevent drop into self or descendants
    const isDescendant = (parent, target) => {
        if (!parent.children) return false;
        return parent.children.some(child => {
        return child === target || (child.type === "folder" && isDescendant(child, target));
        });
    };
    if (isDescendant(dragged, node)) return;

    // ✅ Recursively remove the dragged node from the tree
    const removeNode = (current) => {
        if (!current.children || !Array.isArray(current.children)) return;

        current.children = current.children.filter(child => {
        if (child === dragged) return false;
        if (child.type === "folder") removeNode(child);
        return true;
        });
    };

    removeNode(vfs);

    // ✅ Add to new parent folder
    if (!Array.isArray(node.children)) node.children = [];
    node.children.push(dragged);
    draggedNodeRef.current = null;
    setVfs({ ...vfs }); // trigger re-render
    };

  const baseClasses = `px-2 py-1 rounded cursor-pointer ${
    isSelected ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
  } ${isDragOver ? "bg-blue-600" : ""}`;

  // File
  if (node.type === "file") {
    return node.isEditing ? (
      <input
        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
        style={indent}
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        onBlur={finishRename}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") finishRename();
        }}
        autoFocus
      />
    ) : (
      <div
        className={baseClasses}
        style={indent}
        draggable
        onDragStart={() => (draggedNodeRef.current = node)}
        onClick={() => onSelectFile(node)}
      >
        📄 {node.name}
      </div>
    );
  }

  // Folder
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => {
        if (node.type !== "folder") return;
        const dragged = draggedNodeRef.current;

        if (!dragged || dragged === node || node.children?.includes(dragged)) return;

        setIsDragOver(true);
        }}
        onDragLeave={(e) => {
        if (node.type === "folder") setIsDragOver(false);
        }}
      onDrop={(e) => {
        if (node.type === "folder") {
          handleDrop(e);
        }
        setIsDragOver(false);
      }}
    >
      {node.isEditing ? (
        <input
          className="bg-gray-700 text-white px-2 py-1 rounded w-full"
          style={indent}
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onBlur={finishRename}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") finishRename();
          }}
          autoFocus
        />
      ) : (
        <div
          className={baseClasses}
          style={indent}
          draggable
          onDragStart={() => (draggedNodeRef.current = node)}
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
            key={`${node.name}-${node.type}-${i}`}
            node={child}
            vfs={vfs}
            onSelectFile={onSelectFile}
            selectedFile={selectedFile}
            setVfs={setVfs}
            draggedNodeRef={draggedNodeRef}
            depth={depth + 1}
          />
        ))}
    </div>
  );
}