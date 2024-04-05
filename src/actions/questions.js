import { showLoading, hideLoading } from "react-redux-loading-bar";
import {_saveQuestion ,_saveQuestionAnswer} from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  };
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
     question["author"] = authedUser;
    dispatch(showLoading());
    return _saveQuestion(
      question,
    )
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(answerQuestion({ authedUser, qid, answer }))
    dispatch(showLoading());
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(
      dispatch(hideLoading())
    )
     .catch((e) => {
       console.warn("Error in handleAnswerQuestion: ", e);
       alert("The was an error liking the answer. Try again.");
     }).then;
  };
}
