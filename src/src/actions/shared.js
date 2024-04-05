
import { getUsers, getQuestions }from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export  function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([getUsers(), getQuestions()]).then(
      ([users, question]) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(question));
        dispatch(hideLoading());
      }
    );
  };
}