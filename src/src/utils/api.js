  import {
    _getUsers,
    _getQuestions
  } from "./_DATA.js";


  export function getInitialData () {
    return Promise.all([
      getUsers(),
      getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }

  export function getUsers() {
    return _getUsers();    
  }

  export function getQuestions() {
    return _getQuestions();
  }


