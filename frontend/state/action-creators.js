// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types';

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answerId) {
  return { type: SET_SELECTED_ANSWER, payload: answerId }
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(newQuiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: newQuiz }
}

export function inputChange({ inputId, value }) {
  return { type: INPUT_CHANGE, payload: { inputId, value } }
}

export function resetForm() {
  return { type: RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null))
    // On successful GET:
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data))
      })
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer( quizId, answerId ) {
  return function (dispatch) {
    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/answer',
      {
        quiz_id: quizId,
        answer_id: answerId
      })
      .then(res => {
        dispatch(selectAnswer(null));
        console.log(res.data);
        dispatch(setMessage(res.data.message))
        dispatch(fetchQuiz());
      })
      .catch(error => {
        console.error('Error adding quiz', error);
      })
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz({ newQuestion, newTrueAnswer, newFalseAnswer }) {
  return function (dispatch) {
    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/new',
      {
        question_text: newQuestion,
        true_answer_text: newTrueAnswer,
        false_answer_text: newFalseAnswer,
      })
      .then(res => {
        console.log(res.data);
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
        dispatch(resetForm());
      })
      .catch(error => {
        console.error('Error adding quiz', error);
      })
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
