import React, { useState, useEffect } from "react";
import { getQuizzes, getMoreQuizzes } from "./data/quizzes";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("loading");
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        const questions = data[0].questions.map((q) => ({
          ...q,
          options: shuffleArray([q.correctAnswer, ...q.incorrectAnswers]),
        }));
        setQuizData(questions);
        setTitle(data[0].title);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    };
    fetchQuizzes();
  }, []);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswerClick = (option) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      if (option === quizData[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: quizData[currentQuestionIndex].text,
        userAnswer: selectedAnswer,
        correctAnswer: quizData[currentQuestionIndex].correctAnswer,
      },
    ]);

    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAttempts(attempts + 1);
    } else {
      setStatus("finished");
    }
  };

  const loadMoreQuizzes = async () => {
    setLoadingMore(true);
    try {
      const moreQuizzes = await getMoreQuizzes();
      const newQuestions = moreQuizzes[0].questions.map((q) => ({
        ...q,
        options: shuffleArray([q.correctAnswer, ...q.incorrectAnswers]),
      }));
      setQuizData((prevQuizData) => [...prevQuizData, ...newQuestions]);
      setStatus("active");
      setLoadingMore(false);
      setCurrentQuestionIndex(0);
    } catch {
      setStatus("error");
      setLoadingMore(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAttempts(0);
    setAnsweredQuestions([]);
    setStatus("ready");
  };

  if (status === "loading") return <div>Loading quiz...</div>;
  if (status === "error") return <div>Failed to load quiz. Try again later.</div>;

  return (
    <div className="app">
      <h1>Simple Quiz Game</h1>

      {status === "ready" && (
        <button onClick={() => setStatus("active")}>Start Quiz</button>
      )}

      {status === "active" && (
        <div>
          <h2>{title}</h2>
          <p>{quizData[currentQuestionIndex].text}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {quizData[currentQuestionIndex].options.map((option, index) => {
              const optionLabel = ["A", "B", "C", "D"][index];
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  style={{
                    display: "block",
                    width: "40%",
                    margin: "10px 0",
                    padding: "10px",
                    border: selectedAnswer === option
                      ? option === quizData[currentQuestionIndex].correctAnswer
                        ? "2px solid green"
                        : "2px solid red"
                      : "none",
                    textAlign: "left",
                    textDecoration:
                      selectedAnswer && option !== quizData[currentQuestionIndex].correctAnswer && option === selectedAnswer
                        ? "line-through"
                        : "none", 
                  }}
                  disabled={false}
                >
                  {}
                  {optionLabel}. {option}
                </button>
              );
            })}
          </div>
          
          {selectedAnswer && (
            <button onClick={handleNextQuestion}>
              {currentQuestionIndex + 1 < quizData.length ? "Next" : "Finish"}
            </button>
          
          )}
        </div>
      )}

      {loadingMore && <div>Loading more questions...</div>}

      {status === "finished" && (
        <div>
          <h2>Quiz Finished!</h2>
          <p>
            You got {score} out of {quizData.length} questions right.
          </p>
          <p>Number of attempts: {attempts}</p>
          <div>
            <h3>You had:</h3>
            {answeredQuestions.map((answer, index) => (
              <div key={index}>
                <div style={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                  <strong>{index + 1}</strong>
                  <span style={{ marginLeft: "10px" }}>{answer.question}</span>
                  <span
                    style={{
                      marginLeft: "10px",
                      color: answer.userAnswer === answer.correctAnswer ? "green" : "red",
                      textDecoration: answer.userAnswer !== answer.correctAnswer ? "line-through" : "none",
                    }}
                  >
                    {answer.userAnswer}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <button onClick={loadMoreQuizzes} disabled={loadingMore} style={{ margin: "10px" }}>
              NEXT
            </button>
            <button onClick={handleRestart}>Restart </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;