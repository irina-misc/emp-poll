import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared"
import Login from "./Login";
import { useEffect, Fragment } from "react";
import Nav from "./Nav";
import New from "./New";
import Home from "./Home";
import PollSummary from "./PollSummary";
import Leaderboard from "./Leaderboard";
import NotFound from "./NotFound"

const App = (props) => {

    useEffect(() => {
        props.dispatch(handleInitialData())
    }, []);
    
	if ( props.authedUser === null ) {      
        return (props.loading === true ? null : <Login />)
    }

    return (
        <div>
            <Fragment>
                <LoadingBar />
                {props.loading === true ? null :
                    <div className="container">
                        <Nav />
                        <Routes>
                            <Route path="/" exact element={<Home />} />
                            <Route path="/leaderboard" element={<Leaderboard />} />
                            <Route path="/add" element={<New />} />
                            <Route path="/question/:id" element={<PollSummary />} />
                            <Route path="*" exact element={<NotFound />} />
                        </Routes>
                    </div>
                }
            </Fragment>
        </div>
    );
};

const mapStateToProps = ({ authedUser, users }) => ({
    loading: !users,
    authedUser: authedUser
});

export default connect(mapStateToProps)(App);