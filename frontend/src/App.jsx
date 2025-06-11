import { useState } from "react";
import { initialVFS } from "./state/vfs";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ExercisePanel from "./components/ExercisePanel";
import OutputPanel from "./components/OutputPanel";
import CodeEditor from "./components/CodeEditor";
import FileExplorer from "./components/FileExplorer";

export default function App() {
  const [files, setFiles] = useState(initialVFS);
  const [activeFile, setActiveFile] = useState("Main.java");
  const [activePanel, setActivePanel] = useState("exercise");

  const updateFileContent = (filename, newContent) => {
    setFiles((prev) => ({
      ...prev,
      [filename]: {
        ...prev[filename],
        content: newContent,
      },
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <SideBar activePanel={activePanel} setActivePanel={setActivePanel} />
        
        <div className="w-1/3 p-4 border-r border-gray-300 overflow-y-auto">
          {activePanel === "exercise" ? (
            <ExercisePanel />
          ) : (
            <FileExplorer
              files={files}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
            />
          )}
        </div>

        <div className="w-2/3 p-4 flex flex-col">
          <div className="flex-1 bg-gray-800 text-white rounded-lg overflow-hidden">
            <CodeEditor
              value={files[activeFile].content}
              language="java"
              onChange={(newContent) => updateFileContent(activeFile, newContent)}
            />
          </div>
        </div>
      </div>

      <OutputPanel />
    </div>
  );
}