
import { formatDate } from "../utils/helpers";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const PollSummary = (props) => {
    const navigate = useNavigate();
    const { author,
        timestamp,
        id
    } = props.question;

    if (props.user === undefined) {
        return null;
    }
    const handleClick = (e) => {
        navigate("/question/id=" + id);
    }

    return (
      <div  style={{paddingBottom: 20}}>
        <div className="card text-center">
            <div className="card-header">
                <img width="30" height="30" src={require('../images/' + props.user.id + '.ico')} alt={'Avatar of ${author}'} />
                <span>{props.user.name}</span></div>
            <div className="card-body">
                <h6 className="card-title">Created on : {formatDate(timestamp)}</h6>
            </div>

            <div className="card-footer border-success text-center">
                <button style={{ color: "white" }} className="btn btn-secondary" onClick={(e) => handleClick(e)} >
                    {props.voted ? "View" : "Vote for this poll"}
                </button>  
            </div>
        </div>
      </div>
    );
};

function mapStateToProps({ authedUser, users, questions }, { id }) {

    const question = questions[id];
    const user = question ? users[question.author] : null;
    return {
        question: question,
        user: user
    }
}

export default connect(mapStateToProps)(PollSummary);