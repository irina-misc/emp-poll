import { getUsers, getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api';
import { _saveQuestionAnswer, _getUsers } from "../utils/_DATA";

describe('getInitialData from api returns users and questions', () => {
  it('will return list of all users', async () => {
    let data = await getInitialData();
    let users = data.users;

    expect(data.users).not.toEqual(null);
    expect(data.questions).not.toEqual(null);
  });
});

describe('getUsers from api returns users', () => {
  it('will return list of all users', async () => {
    let data = await getUsers();

    expect(data).not.toEqual(null);
  });
});

describe('test saveQuestionAnswer from api', () => {
  it('should return true -  correct data is passed', async () => {
    const data = {
      authedUser: 'sarahedo',
      qid: 'vthrdm985a262al8qx3do',
      answer: 'optionTwo'
    }
    const result = await saveQuestionAnswer(data)
    expect(result).toEqual(true)
  })
  
  it('should throw an error - wrong input is provided.', async () => {
    const data = {
      answer: ''
    }
    await expect(saveQuestionAnswer(data)).rejects.toEqual('Please provide authedUser, qid, and answer')
  })
});


describe('test saveQuestion from api', () => {

  it('should throw an error - wrong input is provided.', async () => {

    const questionIncomplete = {
      optionTwoText: "question 2",
      author: "sarahedo"
    };

    try {
      await saveQuestion(questionIncomplete)
    } catch (err) {
      expect(err).toEqual("Please provide optionOneText, optionTwoText, and author");
    }
  })

  it('should return true -  correct data is passed', async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "John Doe",
    };
    const result = await saveQuestion(question);

    expect(result).toEqual({
      author: question.author,
      id: expect.any(String),
      optionOne: { text: question.optionOneText, votes: [] },
      optionTwo: { text: question.optionTwoText, votes: [] },
      timestamp: expect.any(Number),
    });
  });
});


