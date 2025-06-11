import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import exerciseData from "../data/sampleExercise.json";

/**
 * ExercisePanel Component
 * Loads and displays the current exercise (title + markdown description)
 */
export default function ExercisePanel() {
  const [exercise, setExercise] = useState(null);

  // Simulate loading from a data source
  useEffect(() => {
    setExercise(exerciseData); // you can swap this for an API later
  }, []);

  if (!exercise)
    return (
      <div className="p-6 bg-[var(--color-surface-1)] text-[var(--color-text-primary)] h-full">
        Loading exercise...
      </div>
    );

  return (
    <div className="bg-[var(--color-surface-1)] text-[var(--color-text-primary)] p-6 rounded-md h-full">
      <h2 className="text-xl font-semibold mb-4">{exercise.title}</h2>

      <div className="space-y-3 text-sm leading-relaxed">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-lg font-bold mt-4 mb-2" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-base font-semibold mt-3 mb-1" {...props} />,
            p: ({ node, ...props }) => <p className="text-sm mb-2" {...props} />,
            pre: ({ node, ...props }) => (
              <pre className="bg-[var(--color-surface-2)] text-green-300 p-3 rounded overflow-x-auto text-sm" {...props} />
            ),
            code: ({ node, ...props }) => <code className="font-mono" {...props} />,
            li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
          }}
        >
          {exercise.description}
        </ReactMarkdown>
      </div>
    </div>
  );
}