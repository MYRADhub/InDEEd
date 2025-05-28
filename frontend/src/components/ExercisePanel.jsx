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

  if (!exercise) return <p>Loading exercise...</p>;

  return (
    <div className="p-4 h-full overflow-auto bg-gray-100 text-black">
      <h2 className="text-xl font-bold mb-2">{exercise.title}</h2>
      <ReactMarkdown>{exercise.description}</ReactMarkdown>
    </div>
  );
}