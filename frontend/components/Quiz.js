import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

export function Quiz(props) {
  const { quiz, fetchQuiz, selectAnswer, selectedAnswer, postAnswer } = props;
  useEffect(() => {
    if(quiz === null) {
      fetchQuiz();
    }
  }, [])

  const handleAnswerClick = (answerId) => {
    selectAnswer(answerId);
    console.log('test hello')
  }

  const handleSubmitClick = (quizId, answerId) => {
    postAnswer(quizId, answerId);
    console.log('is handle submit working?')
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div onClick={() => handleAnswerClick(quiz.answers[0].answer_id)} className={quiz.answers[0].answer_id === selectedAnswer ? 'answer selected' : 'answer'}>
                {quiz.answers[0].text}
                <button>
                  {quiz.answers[0].answer_id === selectedAnswer ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div onClick={() => handleAnswerClick(quiz.answers[1].answer_id)}className={quiz.answers[1].answer_id === selectedAnswer ? 'answer selected' : 'answer'}>
              {quiz.answers[1].text}
                <button >
                {quiz.answers[1].answer_id === selectedAnswer ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button disabled={!selectedAnswer} id="submitAnswerBtn" onClick={() => handleSubmitClick(quiz.quiz_id, selectedAnswer)}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return state;
}

export default (connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer }))(Quiz);