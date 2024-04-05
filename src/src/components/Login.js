
import { connect } from "react-redux";
import { useState } from "react";
import { handleSetAuthedUser } from "../actions/authedUser"

const Login = (props) => {
    const [selectedUser, setSelectedUser] = useState(null);

    if (props.authedUser || props.authedUser !== null) {
        return null;
    }

    const handleChange = (e) => {
        console.log("e.target.value=", e.target.value);
        setSelectedUser(e.target.value);
    };

    const handleLogon = (e) => {
        props.dispatch(handleSetAuthedUser(selectedUser));
    }

    return (<div className="card">
        <div className="card-header" data-testid="login-card">
            <h3>Log On to Employee Polls</h3>
        </div>
        <div className="card-body">
            <form onSubmit={(e) => handleLogon(e)}>
                <div>
                    <select style={{ width: "15.5em", marginBottom: 30 }} value={selectedUser !== null ? selectedUser : 'n/a'} onChange={handleChange}>
                        <option key="1" value="n/a" disabled >Select user...</option>
                        {props.users && Object.keys(props.users).map(id => {
                            return (<option key={id} value={id} >{props.users[id].name}</option>)
                        })}
                    </select>
                </div>
                <button className="btn btn-secondary" type="submit"
                    disabled={selectedUser === null}
                    data-testid="Logon">
                    Log On
                </button>
            </form>
        </div>
    </div>
    )
};

function mapStateToProps({ users, authedUser }) {
    return {
        users: users,
        authedUser: authedUser
    };
}

export default connect(mapStateToProps)(Login);
