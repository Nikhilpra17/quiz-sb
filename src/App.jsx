import React, { useState, useEffect } from "react";
import { getQuizzes, getMoreQuizzes } from "./data/quizzes";
import QuizQuestion from "./components/QuizQuestion";
import QuizResults from "./components/QuizResults";
import Loader from "./components/Loader";
import ButtonGroup from "./components/ButtonGroup";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
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
    setAnsweredQuestions([]);
    setStatus("ready");
  };

  if (status === "loading") return <Loader text="Loading quiz..." />;
  if (status === "error")
    return <Loader text="Failed to load quiz. Try again later." />;

  return (
    <div className="app">
      <h1>Simple Quiz Game</h1>

      {status === "ready" && (
        <button onClick={() => setStatus("active")}>Start Quiz</button>
      )}

      {status === "active" && (
        <QuizQuestion
          title={title}
          currentQuestion={quizData[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          handleAnswerClick={handleAnswerClick}
          handleNextQuestion={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizData.length}
        />
      )}

      {status === "finished" && (
        <QuizResults
          score={score}
          totalQuestions={quizData.length}
          answeredQuestions={answeredQuestions}
          loadMoreQuizzes={loadMoreQuizzes}
          handleRestart={handleRestart}
          loadingMore={loadingMore}
        />
      )}
    </div>
  );
};

export default App;
