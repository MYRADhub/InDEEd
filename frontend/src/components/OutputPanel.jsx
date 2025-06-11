export default function OutputPanel() {
  return (
    <div className="bg-gray-900 text-sm font-mono text-gray-100 p-4 h-60 overflow-auto rounded-b-lg border-t border-gray-700 space-y-4">

      {/* Test Case Result */}
      <div className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded">
        <span>Test Case 1</span>
        <span className="text-green-400 font-bold">Passed</span>
      </div>

      {/* Expected vs Actual */}
      <div className="bg-gray-800 p-3 rounded">
        <div className="mb-1 text-gray-400">Expected Output:</div>
        <pre className="text-green-300">5</pre>
        <div className="mt-2 mb-1 text-gray-400">Your Output:</div>
        <pre className="text-green-300">5</pre>
      </div>

      {/* Execution Time */}
      <div className="flex justify-between text-gray-400 text-xs px-1">
        <span>Execution Time: 13ms</span>
        <span>Memory: 9.2MB</span>
      </div>

      {/* Error Section (hidden if passed) */}
      {/* 
      <div className="bg-red-800 p-3 rounded text-red-200">
        <strong>Error:</strong> TypeError: undefined is not a function
      </div> 
      */}
    </div>
  );
}