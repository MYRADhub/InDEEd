import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, language, onChange }) {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
}