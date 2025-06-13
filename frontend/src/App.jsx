import { useState } from "react";
import { initialVFS as originalVFS } from "./state/vfs";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ExercisePanel from "./components/ExercisePanel";
import OutputPanel from "./components/OutputPanel";
import CodeEditor from "./components/CodeEditor";
import FileExplorer from "./components/FileExplorer";

export default function App() {
  const getFreshVFS = () => structuredClone(originalVFS);
  const [vfs, setVfs] = useState(getFreshVFS());
  const [selectedFile, setSelectedFile] = useState(null);
  const [activePanel, setActivePanel] = useState("exercise");

  const updateFileContent = (fileNode, newContent) => {
    fileNode.content = newContent;
    setVfs({ ...vfs }); // trigger re-render
  };

  // Handlers for file/folder creation, deletion, and reset
  const handleCreateFile = () => {
    const parent = selectedFile?.type === "folder" ? selectedFile : vfs;

    const newFile = {
      type: "file",
      name: "New File",
      content: "",
      isEditing: true,
    };

    parent.children.push(newFile);
    setSelectedFile(newFile);
    setVfs({ ...vfs });
  };

  const handleCreateFolder = () => {
    const parent = selectedFile?.type === "folder" ? selectedFile : vfs;

    const newFolder = {
      type: "folder",
      name: "New Folder",
      children: [],
      isEditing: true,
    };

    parent.children.push(newFolder);
    setSelectedFile(newFolder);
    setVfs({ ...vfs });
  };

  const handleDeleteFile = () => {
    if (!selectedFile) return alert("No file selected.");
    const deleteRecursively = (nodes) =>
      nodes.filter((node) => {
        if (node === selectedFile) return false;
        if (node.type === "folder") {
          node.children = deleteRecursively(node.children);
        }
        return true;
      });
    vfs.children = deleteRecursively(vfs.children);
    setSelectedFile(null);
    setVfs({ ...vfs });
  };

  const handleResetVFS = () => {
    setVfs(getFreshVFS());
    setSelectedFile(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <SideBar activePanel={activePanel} setActivePanel={setActivePanel} />

        <div className="w-1/3 p-4 border-r border-gray-300 overflow-y-auto bg-gray-900">
          {activePanel === "exercise" ? (
            <ExercisePanel />
          ) : (
            <FileExplorer
              vfs={vfs}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
              onCreateFile={handleCreateFile}
              onDeleteFile={handleDeleteFile}
              onCreateFolder={handleCreateFolder}
              onResetVFS={handleResetVFS}
              setVfs={setVfs}
            />
          )}
        </div>

        <div className="w-2/3 p-4 flex flex-col">
          <div className="flex-1 bg-gray-800 text-white rounded-lg overflow-hidden">
            <CodeEditor
              value={selectedFile?.content || ""}
              language="java"
              onChange={(newContent) => updateFileContent(selectedFile, newContent)}
            />
          </div>
        </div>
      </div>
      <OutputPanel />
    </div>
  );
}