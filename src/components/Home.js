import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import PollInfo from "./PollInfo";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

const Home = (props) => {
    return (
        <div >
            <h3 style={{ textAlign: "center" }} data-testid="home-card"> Employee Polls</h3>
            <div className="container">
                <Tabs className="Tabs">
                    <TabList>
                        <Tab><h6>Unanswered polls</h6></Tab>
                        <Tab><h6>Answered polls</h6></Tab>
                    </TabList>
                    <TabPanel>
                        <div className="border text-center">
                            {props.nonAnswered.map(id =>
                                <PollInfo id={id} voted={false} key={id} />)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="border text-center">
                            {props.answered.map(id =>
                                <PollInfo id={id} voted={true} key={id} />)
                            }
                        </div>
                    </TabPanel>
                </Tabs> 
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