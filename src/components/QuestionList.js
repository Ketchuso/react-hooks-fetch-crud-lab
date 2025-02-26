import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ list, setList }) {

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then(data => setList(data))
  }, [list])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{list.map((items) => {
        return (
        <QuestionItem 
        key={items.id} 
        question={items}
        setList={setList}
        />
      );
      })}</ul>
    </section>
  );
}

export default QuestionList;
