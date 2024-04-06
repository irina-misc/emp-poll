import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import PollInfo from "./PollInfo";

const Home = (props) => {
    return (
        <div >
            <h3 style={{ textAlign: "center" }} data-testid="home-card"> Employee Polls</h3>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h4>Unanswered polls</h4>
                    </div>
                    <div className="col text-center">
                        <h4>Answered polls</h4>
                    </div>
                </div>
                <div className="row border">
                    <div className="col border text-center">
                        {props.nonAnswered.map(id =>
                            <PollInfo id={id} voted={false} key={id} />)
                        }
                    </div>

                    <div className="col border text-center">
                        {props.answered.map(id =>
                            <PollInfo id={id} voted={true} key={id} />
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = ({ questions, authedUser }) => {
    const answered = Object.keys(questions).filter(id => authedUser
        && questions[id].optionOne.votes.concat(
            questions[id].optionTwo.votes).includes(authedUser)
    );

    const nonAnswered = Object.keys(questions).filter(id => answered && !answered.includes(id));

    return {
        answered: answered.sort(
            (a, b) => questions[b].timestamp - questions[a].timestamp
        ),
        nonAnswered: nonAnswered.sort(
            (a, b) => questions[b].timestamp - questions[a].timestamp
        )
    };
};

export default connect(mapStateToProps)(Home);