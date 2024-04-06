import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { useState, useEffect } from "react";
import { handleAnswerQuestion } from "../actions/questions";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        const { id } = useParams();
        const q_id = id.split("=")[1]
        return <Component {...props} qid={{ q_id }} />;
    };
    return ComponentWithRouterProp;
};

const PollSummary = (props) => {
    const [selectedOption, setSelectedOption] = useState(
        props.userOption ? props.userOption : undefined);
    const [hideStats, setHideStats] = useState(
        props.userOption === null ? "hidden" : ""); 
  
    const navigate = useNavigate();
    useEffect(() => {
        if (props.question === undefined) { 
            navigate("/NotFound") ;
        }
    }, [props.question]);

    if (props.question === undefined) {
        return null;
    }
    const handleChange = option => {
        if (props.userOption === null) {
            setSelectedOption(option);
        }
    }
    const statCount = props.statCount;
    const statPerc = props.statPerc;

    const handleAnswer = (e) => {
      if (hideStats) {        
        e.preventDefault();
        props.dispatch(handleAnswerQuestion({
            authedUser: props.authedUser,
            qid: props.question.id,
            answer: selectedOption
        }));
      }
      navigate("/") ;
    }

    const { timestamp, optionOne, optionTwo } = props.question;
const user = props.user;
    return (
        <div className="card text-center">
            <div className="card-header">
      			<span style={{ paddingRight: 20 }}>Created by</span>
                <img  width="30" height="30" src={require('../images/' + user.id + '.ico')} alt={user.name} />
                <span style={{ paddingLeft: 20 }}>{user.name}</span>
                <div style={{ visibility: hideStats}}>
                    <p>This question was answered by {statCount.optOneVotesNo+statCount.optTwoVotesNo} voter(s).</p>
                </div>
            </div>

            <div className="card-body">
                <h5 className="card-title">Would You Rather ? </h5>
                <form onSubmit={(e) => handleAnswer(e)}>
                    <div className="custom-control custom-checkbox" style={{ padding: 15 }} key="2" >
                        <input className="form-check-input" type="checkbox"
                            style={{ padding: 10 }}
                            onChange={() => handleChange("optionOne")}
                            disabled={props.userOption !== null}
                            checked={selectedOption === "optionOne" ? true : false}
                        />
                        <label className="form-check-label"
                            style={{ paddingLeft: 10 }}
                            onClick={() => handleChange("optionOne")}>
                            {optionOne.text}
                        </label>
                        <div style={{ visibility: hideStats}}>
                            {"Answered by " +  statCount.optOneVotesNo + " voter(s) - " + Math.round(100 * statPerc.optOneVotesPerc) + " %."}
                        </div>
                    </div>
                    <h6>  OR </h6>
                    <div className="custom-control custom-checkbox" style={{ padding: 15 }} key="1" >
                        <input className="form-check-input" type="checkbox"
                            disabled={props.userOption !== null}
                            onChange={() => handleChange("optionTwo")}
                            style={{ padding: 10 }}
                            checked={selectedOption === "optionTwo" ? true : false}
                        />
                        <label className="form-check-label"
                            style={{ paddingLeft: 10 }}
                            onClick={() => handleChange("optionTwo")} >
                            {optionTwo.text}
                        </label>
                        <div style={{ visibility: hideStats}}>
                            {"Answered by " +  statCount.optTwoVotesNo + " voter(s) - " + Math.round(100 * statPerc.optTwoVotesPerc) + " %."}
                        </div>
                    </div>
                      {props.userOption === null &&
                       <div className = "centre">
                          <button className="btn btn-secondary"
                            type="submit"
                            disabled={props.userOption || !selectedOption} >
                            Submit your choice
                         </button> 
					   </div>
                      }
                      {props.userOption !== null &&
                        <div className = "centre">
                          <button className="btn btn-secondary"
                              type="submit">
                              Back
                          </button>  
					   </div>                       
                      }
                </form>

            </div>
            <div className="card-footer text-muted">
                Created on : {formatDate(timestamp)}
            </div>
        </div>
    )
};

function mapStateToProps({ users, questions, authedUser }, props) {
    const question = questions[props.qid.q_id];
    if (question) {
        const user = question ? users[question.author] : null;
        const statCount = {
            optOneVotesNo: question.optionOne.votes.length,
            optTwoVotesNo: question.optionTwo.votes.length,
        };
        let total_votes = statCount.optOneVotesNo + statCount.optTwoVotesNo;
        const statPerc = {
            optOneVotesPerc: total_votes === 0 ? 0 : statCount.optOneVotesNo / total_votes,
            optTwoVotesPerc: total_votes === 0 ? 0 : statCount.optTwoVotesNo / total_votes
        };
        let userOption = null;

        if (question.optionOne.votes.includes(authedUser)) {

            userOption = "optionOne";
        }
        else if (question.optionTwo.votes.includes(authedUser)) {

            userOption = "optionTwo";
        }


        return {
            authedUser: authedUser,
            question: question,
            user: user,
            statPerc,
            statCount,
            userOption: userOption
        }

    } else {
        return {
            authedUser: authedUser,
            question: undefined,
        }
    }
};

export default withRouter(connect(mapStateToProps)(PollSummary));