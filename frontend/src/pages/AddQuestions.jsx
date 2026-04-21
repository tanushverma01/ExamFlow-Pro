import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function AddQuestions() {
  const { id } = useParams();

  // COMMON
  const [type, setType] = useState("mcq");
  const [questions, setQuestions] = useState([]);

  // MCQ
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  // CODING
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  // ADD QUESTION
  const addToList = () => {
    if (type === "mcq") {
      if (!text) return;

      setQuestions([
        ...questions,
        {
          type: "mcq",
          text,
          options,
          correctAnswer,
          marks: 1,
        },
      ]);

      setText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
    } else {
      if (!title || !description) return;

      setQuestions([
        ...questions,
        {
          type: "coding",
          title,
          description,
          testCases,
          marks: 5,
        },
      ]);

      setTitle("");
      setDescription("");
      setTestCases([{ input: "", output: "" }]);
    }
  };

  // SAVE ALL
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
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT FORM */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Add Question</h2>

          {/* TYPE SELECT */}
          <select
            className="border p-2 w-full mb-4"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="mcq">MCQ</option>
            <option value="coding">Coding</option>
          </select>

          {/* MCQ FORM */}
          {type === "mcq" && (
            <>
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
            </>
          )}

          {/* CODING FORM */}
          {type === "coding" && (
            <>
              <input
                className="border p-2 w-full mb-3"
                placeholder="Problem Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="border p-2 w-full mb-3"
                placeholder="Problem Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {testCases.map((tc, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    placeholder="Input"
                    className="border p-2 w-1/2"
                    value={tc.input}
                    onChange={(e) => {
                      const copy = [...testCases];
                      copy[i].input = e.target.value;
                      setTestCases(copy);
                    }}
                  />
                  <input
                    placeholder="Output"
                    className="border p-2 w-1/2"
                    value={tc.output}
                    onChange={(e) => {
                      const copy = [...testCases];
                      copy[i].output = e.target.value;
                      setTestCases(copy);
                    }}
                  />
                </div>
              ))}
            </>
          )}

          <button
            onClick={addToList}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
          >
            Add to List
          </button>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-gray-50 p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">
            Questions ({questions.length})
          </h2>

          {questions.map((q, i) => (
            <div key={i} className="border p-3 mb-3 bg-white rounded">

              {q.type === "mcq" && (
                <>
                  <p className="font-medium">{q.text}</p>
                  <ul className="ml-4 list-disc text-sm">
                    {q.options.map((o, idx) => (
                      <li key={idx}>
                        {o} {idx === q.correctAnswer && "✅"}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {q.type === "coding" && (
                <>
                  <p className="font-semibold">{q.title}</p>
                  <p className="text-sm text-gray-600">{q.description}</p>
                </>
              )}

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