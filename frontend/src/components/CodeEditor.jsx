import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      defaultValue="# Start typing your solution here..."
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
}