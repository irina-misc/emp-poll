# Employee Polls Project

This is the starter code for the final assessment project for Udacity's React & Redux course.

The `_DATA.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the application. We recommend using the [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| password   | String           | The user’s password in order to log in the application |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database. If one of the parameters are missing, an error is thrown.
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database. If one of the parameters are missing, an error is thrown.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

# Structure of the aplication:
**actions** - plain JavaScript objects that have a type field. 
| Name | Description |
|-----------------|-------------------|
| authedUser.js | action for Authorised User|
| questions.js | action for Questions|
| shared.js | action for shared code|
| users.js | action for all Users|

   
**components**
| Name | Description |
|-----------------|-------------------|
| App.js | Starting point of the application, where routes are defined|
| Home.js | This component has sections with Answered and Unanswered questions|
| Leaderboard.js | This component displasy summary in the table format for all users|
| Login.js | This component is a starting point for the application, where user can be select from the list of all users|
| Nav.js | This component has all route options available for the application. It is presented on all pages except Login page|
| New.js | This component allows user to enter 2 "Would you Rather" type of questions|
| NotFound.js | Error page for the application|
| PollInfo.js | Component, which allows user to vote for the specipic option for the unanswered question|
| PollSummary.js | Component, which displays information about answered questions (with statistics)|

   
**images** - images for the users
  - mtsamis.ico
  - sarahedo.ico
  - tylermcginnis.ico
  - zoshikanlu.ico

**middleware** - series of functions that are executed in the order they are defined
| Name | Description |
|-----------------|-------------------|
| index.js | defines applyMiddleware|
| logger.js | defines logger|

  
**reducers** - functions that take the current state and an action as arguments, and return a new state result.
| Name | Description |
|-----------------|-------------------|
| authedUser.js | reducer for Authorised User|
| index.js| combine reducers|
| questions.js | reducer for Questions|
| users.js | reducer for all User|

   
**tests**
| Name | Description |
|-----------------|-------------------|
| Data_api.test.js | test for Data layer|
| Login.test.js | test for Login page|
| NotFound.test.js | test for Error (404) page|

    
**utils**
| Name | Description |
|-----------------|-------------------|
| api.js | API calls consuming data from _DATA file|
| helpers.js | helper functions|
| _DATA.js | all data for the application|
