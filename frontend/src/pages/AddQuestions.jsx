import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function AddQuestions() {
  const { id } = useParams();

  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questions, setQuestions] = useState([]);

  const addToList = () => {
    if (!text) return;

    setQuestions([
      ...questions,
      {
        text,
        options,
        correctAnswer,
        marks: 1,
      },
    ]);

    setText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(0);
  };

  const saveAll = async () => {
    await api.post(`/admin/exams/${id}/questions/bulk`, {
      examId: id,
      questions,
    });

    alert("All questions saved!");
    setQuestions([]);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Question Form */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Add Question</h2>

          <input
            className="border p-2 w-full mb-3"
            placeholder="Question"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {options.map((o, i) => (
            <input
              key={i}
              className="border p-2 w-full mb-2"
              placeholder={`Option ${i + 1}`}
              value={o}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />
          ))}

          <select
            className="border p-2 w-full mb-3"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          >
            <option value={0}>Correct: Option 1</option>
            <option value={1}>Correct: Option 2</option>
            <option value={2}>Correct: Option 3</option>
            <option value={3}>Correct: Option 4</option>
          </select>

          <button
            onClick={addToList}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to List
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">
            Questions ({questions.length})
          </h2>

          {questions.map((q, i) => (
            <div key={i} className="border p-3 mb-3 bg-white rounded">
              <p className="font-medium">{q.text}</p>
              <ul className="ml-4 list-disc text-sm">
                {q.options.map((o, idx) => (
                  <li key={idx}>
                    {o} {idx === q.correctAnswer && "✅"}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {questions.length > 0 && (
            <button
              onClick={saveAll}
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Save All Questions
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
