import React from "react";

function QuestionItem({ question, setList }) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick(){
    fetch (`http://localhost:4000/questions/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(resp => {
        if (resp.ok){
          setList((prevList) => prevList.filter((question) => question.id !== id))
        } else{
          console.error("Failed to delete the question")
        }
      })
      .catch((error) => console.error('Error deleting question:', error))
  }

  function handleChange(event){
    const value = parseInt(event.target.value)
    fetch (`http://localhost:4000/questions/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "correctIndex": value
      })
    })
    
    setList( (prevList) => 
      prevList.map((question) =>
      question.id === id ? {...question, correctIndex: value} : question
    ))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
