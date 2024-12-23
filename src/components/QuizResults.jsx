import React from "react";
import ButtonGroup from "./ButtonGroup";

const QuizResults = ({
  score,
  totalQuestions,
  answeredQuestions,
  loadMoreQuizzes,
  handleRestart,
  loadingMore,
}) => {
  return (
    <div>
      <h2>Quiz Finished!</h2>
      <p>
        You got {score} out of {totalQuestions} questions right.
      </p>
      <h3>Your Answers:</h3>
      {answeredQuestions.map((answer, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <strong>{index + 1}. </strong>
          <span style={{ marginLeft: "10px" }}>{answer.question}</span>
          <span
            style={{
              marginLeft: "10px",
              color:
                answer.userAnswer === answer.correctAnswer ? "green" : "red",
              textDecoration:
                answer.userAnswer !== answer.correctAnswer
                  ? "line-through"
                  : "none",
            }}
          >
            {answer.userAnswer}
          </span>
        </div>
      ))}
      <ButtonGroup
        loadMoreQuizzes={loadMoreQuizzes}
        handleRestart={handleRestart}
        loadingMore={loadingMore}
      />
    </div>
  );
};

export default QuizResults;
