import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions"

const New = ({ dispatch }) => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        optionOneText: "",
        optionTwoText: "",
    });

    const handleChangeOne = (e) => {
        setQuestion({ ...question, optionOneText: e.target.value });
    };
    const handleChangeTwo = (e) => {
        setQuestion({ ...question, optionTwoText: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(question));
        navigate("/")
        setQuestion({});
    };

    return (
        <div>
            <div className="card text-center">
                <div className="card-header">
                    <h5 className="card-title">Would You Rather?</h5>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="card-body">
                        <div className="form-group">
                            <label >Question One</label>
                            <input value={question["optionOneText"]} onChange={(e) => handleChangeOne(e)} type="text" className="form-control" id="a" placeholder="Enter first option " />

                        </div>
                        <div className="form-group">
                            <label >Question Two</label>
                            <input value={question.optionTwoText} onChange={(e) => handleChangeTwo(e)} type="text" className="form-control" id="b" placeholder="Enter second option" />
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <button disabled={question === {} || question["optionOneText"] === "" || question["optionTwoText"] === ""} className="btn btn-secondary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect()(New);