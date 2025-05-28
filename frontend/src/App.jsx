import NavBar from "./components/NavBar";
import ExercisePanel from "./components/ExercisePanel";
import OutputPanel from "./components/OutputPanel";
import CodeEditor from "./components/CodeEditor";

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1">
        <div className="w-1/2 p-4 border-r border-gray-300">
          <ExercisePanel />
        </div>
        <div className="w-1/2 p-4 flex flex-col">
          <div className="h-full bg-gray-800 text-white rounded-lg overflow-hidden">
            <CodeEditor />
          </div>
        </div>
      </div>
      <OutputPanel />
    </div>
  );
}