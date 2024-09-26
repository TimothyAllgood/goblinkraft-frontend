import React, { useEffect, useState } from "react";
import "./Question.css";

function Question({ type, className }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    if (className) {
      const data = await type.getByClass(className);
      setQuestions(
        data.map((item) => ({
          id: item.id,
          name: item.name,
          question: item.question,
          hint: item.hint,
          answers: item.answers,
        }))
      );
    } else {
      const data = await type.getAll();
      setQuestions(
        data.map((item) => ({
          id: item.id,
          name: item.name,
          question: item.question,
          hint: item.hint,
          answers: item.answers,
        }))
      );
    }
  };

  const handleInputChange = (id, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, [field]: value } : question
      )
    );
  };

  const handleAnswerChange = (id, index, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              answers: question.answers.map((answer, i) =>
                i === index ? value : answer
              ),
            }
          : question
      )
    );
  };

  const addAnswer = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, answers: [...question.answers, ""] }
          : question
      )
    );
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const updatedQuestion = questions.find((q) => q.id === id);
    type.update(updatedQuestion);
  };

  return (
    <div className="question-container">
      {questions.map((question) => (
        <form key={question.id} onSubmit={(e) => handleSubmit(e, question.id)}>
          <div>
            <label htmlFor={`question-${question.id}`}>Question:</label>
            <input
              type="text"
              id={`question-${question.id}`}
              value={question.question}
              onChange={(e) =>
                handleInputChange(question.id, "question", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor={`hint-${question.id}`}>Hint:</label>
            <input
              type="text"
              id={`hint-${question.id}`}
              value={question.hint}
              onChange={(e) =>
                handleInputChange(question.id, "hint", e.target.value)
              }
            />
          </div>
          <div className="answers-container">
            <label>Answers:</label>
            {question.answers.map((answer, index) => (
              <div key={index} className="answer-container">
                <input
                  key={index}
                  type="text"
                  value={answer}
                  onChange={(e) =>
                    handleAnswerChange(question.id, index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedAnswers = [...question.answers];
                    updatedAnswers.splice(index, 1);
                    handleInputChange(question.id, "answers", updatedAnswers);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addAnswer(question.id)}>
              Add Answer
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      ))}
    </div>
  );
}

export default Question;
