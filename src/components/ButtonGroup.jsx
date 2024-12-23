import React from "react";

const ButtonGroup = ({ loadMoreQuizzes, handleRestart, loadingMore }) => {
  return (
    <div>
      <button onClick={handleRestart} style={{ margin: "10px" }}>
        Restart
      </button>
      <button
        onClick={loadMoreQuizzes}
        disabled={loadingMore}
        style={{ margin: "10px" }}
      >
        {loadingMore ? "Loading..." : "Next"}
      </button>
    </div>
  );
};

export default ButtonGroup;
