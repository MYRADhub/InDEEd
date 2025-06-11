import { FaBook, FaFolder } from "react-icons/fa";

export default function SideBar({ activePanel, setActivePanel }) {
  const iconStyle = (panel) =>
    `p-3 text-white text-lg cursor-pointer rounded hover:bg-gray-700 ${
      activePanel === panel ? "bg-gray-700" : ""
    }`;

  return (
    <div className="w-12 bg-gray-900 flex flex-col items-center py-4 space-y-4 border-r border-gray-800">
      <button
        title="Exercise"
        className={iconStyle("exercise")}
        onClick={() => setActivePanel("exercise")}
      >
        <FaBook />
      </button>
      <button
        title="File Explorer"
        className={iconStyle("files")}
        onClick={() => setActivePanel("files")}
      >
        <FaFolder />
      </button>
    </div>
  );
}