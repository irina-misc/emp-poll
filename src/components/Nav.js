import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleSetAuthedUser } from "../actions/authedUser"

const Nav = (props) => {

    const handleLogOut = (e) => {
        props.dispatch(handleSetAuthedUser(null));
    }
    if (!props.user) {
        return null;
    }
    const user_name = props.user.name;
    const user_id = props.user.id;

    return (

        <nav className="navbar navbar-dark bg-secondary">
            <Link className="navbar-brand" to="/">Poll Results</Link>
            <Link className="navbar-brand" to="/add">New question</Link>
            <Link className="navbar-brand" to="/leaderboard">Leader Board</Link>
            <div>
                <img width="30" height="30" src={require('../images/' + user_id + '.ico')}
                    alt={'Avatar of ${user_id}'} />
                <span style={{ color: "white", paddingLeft: 20 }}><b>{user_name}</b></span>
            </div>
            <button style={{ color: "white" }} className="btn btn-secondary" onClick={(e) => handleLogOut(e)} >
                Logout
            </button>

        </nav>
    )
};

const mapStateToProps = ({ users, authedUser }) => {
    return {
        user: users[authedUser]
    };

};

export default connect(mapStateToProps)(Nav);