import React from "react";

const QuizQuestion = ({
  title,
  currentQuestion,
  selectedAnswer,
  handleAnswerClick,
  handleNextQuestion,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{currentQuestion.text}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {currentQuestion.options.map((option, index) => {
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
                border:
                  selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? "2px solid green"
                      : "2px solid red"
                    : "none",
                textAlign: "left",
                textDecoration:
                  selectedAnswer &&
                  option !== currentQuestion.correctAnswer &&
                  option === selectedAnswer
                    ? "line-through"
                    : "none",
              }}
            >
              {optionLabel}. {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div
          style={{
            margin: "20px 0",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          {isCorrect ? "Correct!..." : "Incorrect!..."}
        </div>
      )}

      {selectedAnswer && (
        <button onClick={handleNextQuestion}>
          {currentQuestionIndex + 1 < totalQuestions ? "Next" : "Finish"}
        </button>
      )}
    </div>
  );
};

export default QuizQuestion;
